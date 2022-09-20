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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addproduct, updateproduct } from "../action/product";
import { useEffect, useState } from "react";

const ProductUpdate = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataProductId = useSelector((state) => state.product); //Lấy product id từ redux
  //Lấy danh sách danh mục
  const category = useSelector((state) => state.category.data);

  //Thông báo
  const ProductAddSuccess = () => {
    toast.success("Cập nhật sản phẩm thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const ProductAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const [form] = Form.useForm();
  useEffect(() => {
    //Khi chọn vào ID product thay đổi thì UseEffect chạy reset lại form
    form.resetFields();
  }, [dataProductId.productid]);

  const onFinish = (values) => {
    ProductAPI.updateproduct(dataProductId.productid, values)
      .then(function (response) {
        ProductAddSuccess();
        dispatch(updateproduct({ ...values, _id: dataProductId.productid })); //Để truyền _Id vào reducer, thay đổi trên giao diện

        props.setVisible(false);
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
    console.log(value);
  };
  //Lấy thuộc tính size
  const dataSize = useSelector((state) => state.size.data);

  //Hàm xử lí chọn nhiều color
  const [color, setColor] = useState("middle");
  const handleChangeColor = (value) => {
    // console.log(`Selected: ${value}`);
    console.log(value);
  };
  //Lấy thuộc tính color
  const dataColor = useSelector((state) => state.color.data);

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
        onFinish={onFinish}
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

        <Form.Item
          label="Các size"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn các size!",
            },
          ]}
        >
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

        <Form.Item
          label="Các màu"
          name="colors"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn các màu!",
            },
          ]}
        >
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
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Sửa
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={() => form.resetFields()}>Reset</Button>
    </>
  );
};

export default ProductUpdate;
