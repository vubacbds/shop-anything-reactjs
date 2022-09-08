import { Button, Form, Input, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetCookie } from "../util/cookie";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import UserAPI from "../services/userAPI";
import { get_user_one, update_user } from "../action/user";

const Account = () => {
  const dispatch = useDispatch();
  // Lấy user từ redux //Khi dispatch nó sẽ tự cập nhật lại , nhưng form thì ko tự reset
  const accountData = useSelector((state) => state.user.dataOne);

  //Để reset form,
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
  }, [accountData._id]);

  //Thông báo
  const UpdateSuccess = () => {
    toast.success("Lưu thông tin thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const UpdateFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFinish = (values) => {
    UserAPI.update(accountData._id, values)
      .then(() => {
        UpdateSuccess();
        dispatch(update_user(values));
      })
      .catch((error) => UpdateFail(error.response.data.message));
  };

  //Submit form đổi mật khẩu
  const onFinish_Pass = (values) => {
    const newPass = { password: values.password };
    UserAPI.update_pass(accountData._id, newPass)
      .then(() => {
        UpdateSuccess();
      })
      .catch((error) => UpdateFail(error.response.data.message));
  };

  return (
    accountData && (
      <>
        <div style={{ display: "flex" }}>
          <img
            src="https://khoinguonsangtao.vn/wp-content/uploads/2022/05/anh-avatar-dep-ngau-hinh-dai-dien.jpg"
            style={{
              height: 160,
              width: 160,
              margin: "0px 0px 10px 0px",
              flexGrow: 1,
            }}
          />
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
              email: accountData?.email,
              name: accountData?.name,
              phone: accountData?.phone,
              address: accountData?.address,
            }}
            onFinish={onFinish}
            autoComplete="off"
            style={{ flexGrow: 2 }}
          >
            <Form.Item label="Họ và tên" name="name" rules={[]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                {
                  pattern: /^[\d]{10,10}$/,
                  message: "Số điện thoại phải 10 số !",
                },
              ]}
            >
              <Input style={{ width: "70%" }} />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[]}>
              <Input />
            </Form.Item>

            <Form.Item label="Địa chỉ" name="address" rules={[]}>
              <Input.TextArea style={{ width: 400 }} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Lưu thông tin
              </Button>
            </Form.Item>
          </Form>
          {/*_____ Form 2 thay đổi mật khẩu _-_______  */}
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
            initialValues={{ amount: 1 }}
            onFinish={onFinish_Pass}
            autoComplete="off"
            style={{ flexGrow: 2 }}
          >
            <Form.Item
              label="Mật khẩu mới"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập mật khẩu mới!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Xác nhận"
              name="repassword"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập mật khẩu xác nhận!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Button onClick={() => form.resetFields()}>Reset</Button>
      </>
    )
  );
};

export default Account;
