import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import axios from "axios";
import getDataUser, { add_user } from "../action/user";
import UserAPI from "../services/userAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

const Signup = (props) => {
  //Khi đăng ký là ditpatch thêm user mới vào state trong redux luôn để ko phải load laị trang
  const dispatch = useDispatch();

  //Thông báo
  const signupSuccess = () => {
    toast.success(
      "Đăng ký thành công! Bạn cần vào email xác minh để đăng nhập",
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
  };
  const signupFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //Lấy danh sách user kiemr tra email đã tồn tại chưa
  const dataUserRedux = useSelector((state) => state.user.data);

  const onFinish = (values) => {
    // console.log(dataUserRedux);
    const isUser = dataUserRedux.find((item) => {
      return item.email === values.email;
    });
    if (isUser) {
      signupFail("Email đã tồn tại");
      return;
    }
    const dataUser = {
      ...values,
      image:
        "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg",
      isadmin: false,
    };
    UserAPI.signup(dataUser)
      .then(function (response) {
        signupSuccess();
        dispatch(add_user(response));
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
          label="Mật khẩu"
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
          label="Xác nhận mật khẩu"
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
