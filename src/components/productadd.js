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
  Select,
  Upload,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addproduct } from "../action/product";
import { useEffect, useState } from "react";
import { storage } from "./firebase";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const ProductAdd = (props) => {
  //Set state sản phẩm mới
  const [newProduct, setNewProduct] = useState({});

  //Chuyển trang
  const navigate = useNavigate();

  //Dispatch action
  const dispatch = useDispatch();

  //Lấy danh sách danh mục
  const category = useSelector((state) => state.category.data);

  //Thông báo
  const ProductAddSuccess = () => {
    toast.success("Thêm sản phẩm thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const ProductAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //Reset Form
  const [form] = Form.useForm();

  //Xử lý upload ảnh
  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [url, setUrl] = useState([1]);

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
    console.log("đã change ảnh");
    const nameImage = e.fileList[e.fileList.length - 1]?.name;
    const fileListLength = e.fileList.filter((item) => {
      return item.name == nameImage;
    }).length;

    if (fileListLength == 1 || fileListLength == 0) setFileList(e.fileList);
    else alert("Lỗi trùng ảnh");
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
  const handleUpload = () => {
    fileList.forEach((e) => {
      const uploadTask = storage
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
          storage
            .ref("images")
            .child(e.originFileObj.name)
            .getDownloadURL()
            .then((url) => {
              // posdocument({...newDocument, "nameUrl": urlimg})
              // setUrl(pre => [...pre, urlimg])
              setUrl((old) => {
                if (old[0] == 1) {
                  old.shift();
                  return [...old, url];
                }
                return [...old, url];
              });
            })
            .catch((e) => {
              console.log(e);
            });
        }
      );
    });
  };
  //Đóng xử lý upload ảnh

  //Khi submit Form
  const onFinish = (values) => {
    setNewProduct(values);
    handleUpload(); //upload ảnh lên firebase trước
  };

  //Định dạng giá bán
  const { Option } = Select;
  const prefixSelectorPrice = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 30 }} value={"vnd"}>
        <Option value="vnd">đ</Option>
      </Select>
    </Form.Item>
  );

  //Khi số lượng url bằng số lượng ảnh upload lên thì sẽ chạy API - AddProduct

  useEffect(() => {
    if (url.length === fileList.length) {
      newProduct.images = url;
      ProductAPI.addproduct(newProduct)
        .then(function (response) {
          dispatch(addproduct(response));
          ProductAddSuccess();
          // props.setVisible(false);
          // navigate("/products/admin-product-list");
          setFileList([]);
          setUrl([1]);
          setProgress(0);
          form.resetFields();
        })
        .catch(function (error) {
          console.log("Error on Authentication", error);
          ProductAddFail(error.response.data.message);
        });
    }
  }, [url]);

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
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Danh mục "
          name="category"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn danh mục!",
            },
          ]}
        >
          <Select style={{ width: "60%" }}>
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
          <Input.TextArea showCount maxLength={100} />
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
            style={{ width: "60%" }}
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
            style={{ width: "30%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>

        <Form.Item
          label="Chọn ảnh"
          name="images"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn ảnh!",
            },
          ]}
        >
          <div>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              accept=".jpg, .png"
              // multiple={true}
            >
              {fileList.length >= 4 ? null : (
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
            <progress value={progress} max="100" />
            <br />
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductAdd;
