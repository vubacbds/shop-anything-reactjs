import { Button, Checkbox, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getDataUser, { add_user, get_user_one } from "../action/user";
import UserAPI from "../services/userAPI";
import { toast } from "react-toastify";
import Signup from "./signup";
import { SetCookie, GetCookie } from "../util/cookie";
import { useDispatch, useSelector } from "react-redux";
import getbill from "../action/bill";
import getuser from "../action/user";

// Configure FirebaseUI.
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useForm } from "rc-field-form";
import LoginGmail from "./logingmail";
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [visibleResetPassword, setVisibleResetPassword] = useState(false);
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

  //Lấy thông tin user Cookie
  // const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";

  //Lấy tất cả user ở Redux
  const dataUserRedux = useSelector((state) => state.user.data);

  //Hàm kiểm tra xem tài khoản đăng nhập bằng gmail có tồn tại trong DB chưa, nếu chưa thì đăng ký luôn
  const checkEmail = async (data, accessToken) => {
    const isUser = dataUserRedux.find((item) => {
      return item.email === data.email;
    });
    if (!isUser) {
      UserAPI.signup(data)
        .then(function (response) {
          dispatch(add_user(response));
          SetCookie("user", JSON.stringify(response));
          SetCookie("accessToken", accessToken);
          dispatch(getbill());
          setTimeout("location.reload(true)", 12);
          alert("Signup success");
        })
        .catch(function (error) {
          alert("Error on Authentication", error);
        });
    } else {
      dispatch(getbill());
      const dd = {
        email: data.multiFactor.user.email,
        _id: `${data._delegate.providerData[0].uid}666`,
        name: data.multiFactor.user.displayName.str.split(" ").join(""),

        image: data.multiFactor.user.photoURL,
        // password: Math.floor(Math.random() * 1000),
        // isverify: true,
      };
      await SetCookie("user", JSON.stringify(dd));
      await SetCookie("accessToken", accessToken);
      dispatch(get_user_one(dd._id));
      alert("Đăng nhập thành công nhé bạn!!");
      loginFail(`Thành công !! - ${JSON.stringify(dd)} `);
    }

    //Khi thông tin gmail thay đổi thì dùng cái ẩn này/ tuy nhiên dùng lại ko hiện nút login gmail

    // else {
    //const userUpdate ={name: data.name, email: data: email, image: data.image}
    // UserAPI.update(data._id, userUpdate)
    // .then(() => {
    //   // dispatch(update_user(userUpdate));
    //   dispatch(getbill());
    //   SetCookie("user", JSON.stringify(data));
    //   SetCookie("accessToken", accessToken);
    //   dispatch(get_user_one(data._id));
    //   console.log("Update success");
    // })
    // .catch((error) => console.log(error.response.data.message));}
  };

  //Đăng nhập gmail
  const [isUserLoginMail, setIsUserLoginMail] = useState();
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (user) {
          setIsUserLoginMail(user);
          const accessToken = await user.getIdToken();
          const dataUser = {
            _id: user._delegate.providerData[0].uid.toLowerCase() + "888",
            name: user.multiFactor.user.displayName,
            email: user.multiFactor.user.email,
            image: user.multiFactor.user.photoURL,
            password: Math.floor(Math.random() * 100000),
            isverify: true,
          };
          checkEmail(user, accessToken);

          props.setVisible(false);
        }
      });
    return () => unregisterAuthObserver();
  }, []);

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
          remember: false,
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
              message: "Vui lòng nhập email của bạn!!",
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
              message: "Vui lòng nhập mật khẩu!!",
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
            Ghi nhớ
          </Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
          &ensp;
          <a href="#" onClick={() => setVisibleResetPassword(true)}>
            Quên mật khẩu
          </a>
        </Form.Item>
      </Form>
      {!isUserLoginMail && (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
      <Button type="link" onClick={() => setVisible(true)}>
        Chưa có tài khoản đăng ký tại đây
      </Button>
      <ModalSignup visible={visible} setVisible={setVisible} />
      <ModalResetPassword
        visible={visibleResetPassword}
        setVisible={setVisibleResetPassword}
      />
    </>
  );
};

//Modal đăng ký
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
        zIndex={1997}
      >
        <Signup setVisible={props.setVisible} />
      </Modal>
    </>
  );
};

//Modal reset mật khẩu
const ModalResetPassword = (props) => {
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
    form.resetFields();
    setMessageReset(false);
  };

  const [messageReset, setMessageReset] = useState(false);

  const handleResetPassword = ({ email }) => {
    UserAPI.reset_password({ email: email });
    setMessageReset(true);
  };

  const [form] = Form.useForm();
  return (
    <>
      <Modal
        title="Lấy lại mật khẩu"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        zIndex={1997}
      >
        <Form onFinish={handleResetPassword} form={form}>
          <Form.Item
            label="Email lấy lại mật khẩu"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email của bạn!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Gửi
            </Button>
            &ensp;{" "}
            {messageReset && (
              <span style={{ color: "green" }}>
                * Thành công! Bạn vào email để lấy lại mật khẩu mới nhé!
              </span>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Login;
