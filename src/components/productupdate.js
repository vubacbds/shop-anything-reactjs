import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductAPI from "../services/productAPI";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Upload,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addproduct, updateproduct } from "../action/product";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const ProductUpdate = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataProductId = useSelector((state) => state.product); //Lấy product id từ redux

  //Lấy danh sách danh mục
  const category = useSelector((state) => state.category.data);

  //Set giá trị lấy từ form
  const [valuesForm, setValuesForm] = useState();

  //Thông báo
  const ProductAddSuccess = () => {
    toast.success("Cập nhật sản phẩm thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setSubmitting(false);
  };
  const ProductAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setSubmitting(false);
  };

  const [form] = Form.useForm();
  useEffect(() => {
    //Khi chọn vào ID product thay đổi thì UseEffect chạy reset lại form
    form.resetFields();

    //url ảnh set lại
    setUrl([...dataProductId?.dataproductid?.images]);

    //Danh sách ảnh cũ set lại
    setArrayImageOld([...dataProductId?.dataproductid?.images]);
  }, [dataProductId.productid]);

  const handleUpdate = () => {
    const values = { ...valuesForm, images: url };

    ProductAPI.updateproduct(dataProductId.productid, values)
      .then(function (response) {
        ProductAddSuccess();
        dispatch(updateproduct({ ...values, _id: dataProductId.productid })); //Để truyền _Id vào reducer, thay đổi trên giao diện

        props.setVisible(false);
        setFileList([]);
        setArrayImageOld(url); //set lại danh sách ảnh cũ
        setProgress(0);
        setUrlUpload([1]);
        // navigate("/products/admin-product-list");
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        ProductAddFail(error.response.data.message);
      });
  };

  //Định dạng giá bán
  const { Option } = Select;
  const prefixSelectorPrice = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 30 }} defaultValue={"vnd"}>
        <Option value="vnd">đ</Option>
      </Select>
    </Form.Item>
  );

  //Hàm xử lí chọn nhiều size
  const [size, setSize] = useState("middle");
  const handleChangeSize = (value) => {
    // console.log(`Selected: ${value}`);
    // console.log(value);
  };
  //Lấy thuộc tính size
  const dataSize = useSelector((state) => state.size.data);

  //Hàm xử lí chọn nhiều color
  const [color, setColor] = useState("middle");
  const handleChangeColor = (value) => {
    // console.log(`Selected: ${value}`);
    // console.log(value);
  };
  //Lấy thuộc tính color
  const dataColor = useSelector((state) => state.color.data);

  //Xử lý upload ảnh
  const [arrayImageOld, setArrayImageOld] = useState([
    ...dataProductId?.dataproductid?.images,
  ]);
  const [submitting, setSubmitting] = useState(false); //Loading khi submit
  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [url, setUrl] = useState([...dataProductId?.dataproductid?.images]); //Để lưu url cũ và mới
  const [urlUpload, setUrlUpload] = useState([1]); //Để kiểm tra cho update

  //Sửa lỗi Xem trước phóng to
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => setPreviewVisible(false);

  const handleChange = (e) => {
    //Xử lý file quá 6 ảnh
    if (e.fileList.length + arrayImageOld.length > 6) {
      alert("Chỉ được đăng 6 ảnh!");
      e.preventDefault();
    }

    //Xử lý lỗi trùng ảnh
    const nameImage = e.fileList[e.fileList.length - 1]?.name;
    const fileListLength = e.fileList.filter((item) => {
      return item.name == nameImage;
    }).length;

    if (fileListLength == 1 || fileListLength == 0) setFileList(e.fileList);
    else {
      alert("Lỗi trùng ảnh");
      e.preventDefault();
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(() => file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      () => file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleUpload = (values) => {
    setValuesForm(values);
    setSubmitting(true);
    //Up thêm ảnh mới chạy
    if (fileList?.length > 0) {
      fileList.forEach((e, index) => {
        const uploadTask = firebase
          .storage()
          .ref(`images/${e.originFileObj.name}`)
          .put(e.originFileObj);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            firebase
              .storage()
              .ref("images")
              .child(e.originFileObj.name)
              .getDownloadURL()
              .then((url) => {
                setUrl((pre) => [...pre, url]);
                setUrlUpload((pre) => {
                  if (pre[0] == 1) {
                    pre.shift();
                    return [url];
                  }
                  return [...pre, url];
                });
              })
              .catch((e) => {
                console.log(e);
              });
          }
        );
      });
    } else {
      setUrlUpload((pre) => {
        pre.shift();
        return [...pre];
      });
    }
  };

  //Thủ thuật Khi số lượng url phải bằng số lượng ảnh upload lên  thì mới chạy update
  useEffect(() => {
    //Phải có ít nhất 1 ảnh mới update
    if (fileList?.length == 0 && arrayImageOld.length == 0) {
      alert("Cần ít nhất 1 ảnh");
      setSubmitting(false);
      return;
    }

    if (urlUpload.length == fileList?.length) {
      handleUpdate();
    }
  }, [urlUpload]);
  //Đóng xử lý upload ảnh

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          xs: 4,
          md: 4,
        }}
        wrapperCol={{
          xs: 20,
          md: 20,
        }}
        initialValues={{
          remember: true,
          category: dataProductId.dataproductid?.category,
          title: dataProductId.dataproductid?.title,
          description: dataProductId.dataproductid?.description,
          price: dataProductId.dataproductid?.price,
          amount: dataProductId.dataproductid?.amount,
          sizes: dataProductId.dataproductid?.sizes,
          colors: dataProductId.dataproductid?.colors,
        }}
        onFinish={handleUpload}
        autoComplete="off"
      >
        <Form.Item
          label="Danh mục"
          name="category"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn danh mục!",
            },
          ]}
        >
          <Select style={{ width: "50%" }}>
            {category.map((item) => {
              return (
                <Select.Option value={item._id} key={item._id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập tiêu đề!",
            },
          ]}
        >
          <Input.TextArea showCount maxLength={50} />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập mô tả!",
            },
          ]}
        >
          <Input.TextArea showCount maxLength={500} style={{ height: 100 }} />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập giá bán!",
            },
          ]}
        >
          <InputNumber
            addonAfter={prefixSelectorPrice}
            min={0}
            style={{ width: "50%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>

        <Form.Item
          label="Số lượng"
          name="amount"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập số lượng!",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "50%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>

        <Form.Item label="Các size" name="sizes">
          <Select
            mode="multiple"
            size={size}
            placeholder="Please select"
            // defaultValue={dataProductId.dataproductid?.sizes}
            onChange={handleChangeSize}
            style={{
              width: "100%",
            }}
          >
            {dataSize.map((item) => {
              return (
                <Select.Option
                  value={item.name}
                  key={item._id}
                  // disabled={item.status == 1}
                >
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Các màu" name="colors">
          <Select
            mode="multiple"
            size={color}
            placeholder="Please select"
            // defaultValue={dataProductId.dataproductid?.colors}
            onChange={handleChangeColor}
            style={{
              width: "100%",
            }}
          >
            {dataColor.map((item) => {
              return (
                <Select.Option
                  value={item.name}
                  key={item._id}
                  // disabled={item.status == 1}
                >
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Chọn ảnh"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn ảnh!",
            },
          ]}
        >
          <div>
            {arrayImageOld?.map((item, index) => {
              return (
                <Popconfirm
                  title="Bạn có muốn xóa ảnh này không?"
                  onConfirm={() => {
                    setUrl((pre) => {
                      const newList = pre.filter((i) => i != item);
                      return newList;
                    });

                    setArrayImageOld((pre) => {
                      const newList = pre.filter((i) => i != item);
                      return newList;
                    });
                  }}
                  key={index}
                >
                  <a>
                    <img
                      src={item}
                      style={{ width: 50, height: 50, margin: 4 }}
                    />
                  </a>
                </Popconfirm>
              );
            })}
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              accept=".jpg, .png, .jpeg"
              multiple={true}
              beforeUpload={() => {
                return false;
              }}
            >
              {fileList.length + arrayImageOld.length >= 6 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
            {/* <button onClick={handleUpload}>Upload</button> */}
            <br />
            <progress value={progress} max="100" style={{ width: 104 }} />
            <br />
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={submitting}>
            Sửa
          </Button>
        </Form.Item>
      </Form>

      <Button
        onClick={() => {
          setArrayImageOld([...dataProductId?.dataproductid?.images]);
          form.resetFields();
        }}
      >
        Reset
      </Button>
    </>
  );
};

export default ProductUpdate;
