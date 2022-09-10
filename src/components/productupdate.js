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
import { useEffect } from "react";

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
      <Select style={{ width: 30 }} value={"vnd"}>
        <Option value="vnd">đ</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          xs: 8,
          md: 8,
        }}
        wrapperCol={{
          xs: 12,
          md: 12,
        }}
        initialValues={{
          remember: true,
          category: dataProductId.dataproductid?.category,
          title: dataProductId.dataproductid?.title,
          description: dataProductId.dataproductid?.description,
          price: dataProductId.dataproductid?.price,
          amount: dataProductId.dataproductid?.amount,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn danh mục!",
            },
          ]}
        >
          <Select>
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
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập tiêu đề!",
            },
          ]}
        >
          <Input name="title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập mô tả!",
            },
          ]}
        >
          <Input />
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
            style={{ width: "80%" }}
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
            style={{ width: "40%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
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
