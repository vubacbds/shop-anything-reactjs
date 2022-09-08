import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import axios from "axios";
import getDataUser from "../action/user";
import UserAPI from "../services/userAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = (props) => {
  //Thông báo
  const signupSuccess = () => {
    toast.success("Đăng ký thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const signupFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFinish = (values) => {
    const dataUser = {
      ...values,
      image:
        "https://haycafe.vn/wp-content/uploads/2021/12/hinh-anh-avatar-dep-cho-con-gai-dai-dien-Facebook-Zalo-Tiktok.jpg",
      isadmin: false,
    };
    UserAPI.signup(dataUser)
      .then(function (response) {
        signupSuccess();
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        signupFail(error.response.data.message);
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "E-mail không được để trống!",
            },
            {
              type: "email",
              message: "E-mail chưa đúng định dạng!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password không được để trống!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="PasswordConfirm"
          name="passwordconfirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Mật khẩu xác nhận không được để trống!",
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
        '
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </>
  );
};

export default Signup;
