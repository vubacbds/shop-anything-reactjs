import { Button, Form, Input, InputNumber, Modal, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetCookie, SetCookie } from "../util/cookie";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import UserAPI from "../services/userAPI";
import { get_user_one, update_user } from "../action/user";
import { storage } from "./firebase";
import { PlusOutlined } from "@ant-design/icons";

const Account = () => {
  const dispatch = useDispatch();
  // Lấy user từ redux //Khi dispatch nó sẽ tự cập nhật lại , nhưng form thì ko tự reset
  const accountData = useSelector((state) => state.user.dataOne);

  //Để reset form,
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
  }, [accountData?._id]);

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

  //Xử lý upload 1 ảnh
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  // const [url, setUrl] = useState([1]);

  function getBase64(file) {
    //Sửa lỗi Xem trước phóng to
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => setPreviewVisible(false);

  const handleChange = (e) => {
    setFile(e.file);
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
    const uploadTask = storage
      .ref(`images/${file.originFileObj.name}`)
      .put(file.originFileObj);
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
          .child(file.originFileObj.name)
          .getDownloadURL()
          .then((url) => {
            UserAPI.update(accountData._id, { image: url })
              .then(() => {
                UpdateSuccess();
                dispatch(update_user({ image: url }));
                setProgress(0);

                SetCookie(
                  "user",
                  JSON.stringify({ ...accountData, image: url })
                ); //Thay đổi lại cookie vì cookie lưu ảnh chỉ có login lại ảnh mới hiện
              })
              .catch((error) => UpdateFail(error.response.data.message));
          })
          .catch((e) => {
            console.log(e);
          });
      }
    );
  };

  //Đóng xử lý upload 1 ảnh

  //Khi submit Form Up ảnh
  const onFinishFormUpload = () => {
    // if (file || file.status != "removed")   //Khi nào tồn tại
    handleUpload(); //upload ảnh lên firebase chạy luôn update user
  };

  return (
    accountData && (
      <>
        <div style={{ display: "flex" }}>
          <Form onFinish={onFinishFormUpload}>
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
                  // fileList={file}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  // multiple={true}
                >
                  {(!file || file?.status == "removed") && (
                    // <div>
                    //   <PlusOutlined />
                    //   <div style={{ marginTop: 8 }}>Upload</div>
                    // </div>
                    <img
                      src={accountData.image}
                      style={{ width: 80, height: 80 }}
                    />
                  )}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
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
              <Button
                type="primary"
                htmlType="submit"
                disabled={!(file && file?.status != "removed")} //Khi chưa chọn ảnh thì ẩn button đổi ảnh đi
              >
                Đổi ảnh
              </Button>
            </Form.Item>
          </Form>
          {/* <img
            src="https://khoinguonsangtao.vn/wp-content/uploads/2022/05/anh-avatar-dep-ngau-hinh-dai-dien.jpg"
            style={{
              height: 160,
              width: 160,
              margin: "0px 0px 10px 0px",
              flexGrow: 1,
            }}
          /> */}
          {/*_____ Form 2 thay đổi thông tin cá nhân _-_______  */}
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
          {/*_____ Form 3 thay đổi mật khẩu _-_______  */}
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
