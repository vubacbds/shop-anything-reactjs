import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryAPI from "../services/categorytAPI";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updatecategory } from "../action/category";
import { useEffect } from "react";

const CategorytUpdate = (props) => {
  //Lấy category id từ redux
  const categorytId = useSelector((state) => state.category);

  //Chuyển trang
  const navigate = useNavigate();

  //Dispatch action
  const dispatch = useDispatch();

  //Thông báo
  const CategoryUpdateSuccess = () => {
    toast.success("Sửa danh mục thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const CategorytAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFinish = (values) => {
    CategoryAPI.updatecategory(categorytId.catid, values)
      .then(function (response) {
        CategoryUpdateSuccess();
        dispatch(
          updatecategory({ ...values, _id: categorytId.catid, slug: "" })
        );
        props.setVisible(false);
        navigate("/category/admin-category-list");
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        CategorytAddFail(error.response.data.message);
      });
  };

  //Xử lý lấy dữ liệu cũ điền vào form
  const [form] = Form.useForm();
  useEffect(() => {
    //Khi chọn vào ID product thay đổi thì UseEffect chạy reset lại form
    form.resetFields();
  }, [categorytId.catid]);

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
          name: categorytId.datacategoryid.name,
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
            Sửa
          </Button>
        </Form.Item>
      </Form>
      <button onClick={() => form.resetFields()}>Reset</button>
    </>
  );
};

export default CategorytUpdate;
