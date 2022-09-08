import { Button, Checkbox, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getDataUser, { get_user_one } from "../action/user";
import UserAPI from "../services/userAPI";
import { toast } from "react-toastify";
import Signup from "./signup";
import { SetCookie, GetCookie } from "../util/cookie";
import { useDispatch } from "react-redux";
import getbill from "../action/bill";
import getuser from "../action/user";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [checkPassword, setCheckPassword] = useState(true);

  //Thông báo
  const loginSuccess = () => {
    toast.success("Đăng nhập thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const loginFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFinish = (values) => {
    UserAPI.login(values)
      .then(function (response) {
        dispatch(getbill());
        if (checkPassword) {
          SetCookie(
            "userRemember",
            JSON.stringify({ ...response.user, password: values.password }),
            30
          );
        } else {
          SetCookie("userRemember", "", -1);
        }
        SetCookie("user", JSON.stringify(response.user));
        SetCookie("accessToken", response.token);
        props.setVisible(false);

        // navigate("/");
        dispatch(get_user_one(response.user._id)); //Khi login cũng cần dispatch lại dữ liệu, nhưng được cái ko phải gọi lại API từ DB nên nhẹ
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        loginFail(error.response.data.message);
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
          email: GetCookie("userRemember")
            ? JSON.parse(GetCookie("userRemember")).email
            : "",
          password: GetCookie("userRemember")
            ? JSON.parse(GetCookie("userRemember")).password
            : "",
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
              message: "Please input your username!",
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
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox onChange={(e) => setCheckPassword(e.target.checked)}>
            Nhớ mật khẩu
          </Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={() => setVisible(true)}>
        Chưa có tài khoản (đăng ký tại đây)
      </Button>
      <ModalSignup visible={visible} setVisible={setVisible} />
    </>
  );
};

const ModalSignup = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      props.setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    props.setVisible(false);
  };

  return (
    <>
      <Modal
        title="Đăng ký"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Signup setVisible={props.setVisible} />
      </Modal>
    </>
  );
};

export default Login;
