import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryAPI from "../services/categorytAPI";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addcategory } from "../action/category";

const CategorytAdd = (props) => {
  //Chuyển trang
  const navigate = useNavigate();

  //Dispatch action
  const dispatch = useDispatch();

  //Thông báo
  const CategoryAddSuccess = () => {
    toast.success("Thêm danh mục thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const CategorytAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFinish = (values) => {
    CategoryAPI.addcategory(values)
      .then(function (response) {
        CategoryAddSuccess();
        dispatch(addcategory(response));
        props.setVisible(false);
        navigate("/category/admin-category-list");
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        CategorytAddFail(error.response.data.message);
      });
  };

  return (
    <>
      <Form
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
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập tên danh mục!!",
            },
          ]}
        >
          <Input />
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

export default CategorytAdd;
