import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { update_other } from "../action/other";
import OtherAPI from "../services/otherAPI";

const OtherContextUpdate = ({ cat }) => {
  const dispatch = useDispatch();
  //Lấy các thông tin của web
  const dataOther = useSelector((state) => state.other);

  //Thông báo
  const ProductAddSuccess = () => {
    toast.success("Cập nhật thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const ProductAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFinish = (values) => {
    let noidung;
    cat == "cs"
      ? (noidung = { web_cs: values.desc })
      : cat == "bh"
      ? (noidung = { web_bh: values.desc })
      : (noidung = { web_hd: values.desc });
    OtherAPI.updateother(dataOther._id, noidung)
      .then(function (response) {
        dispatch(update_other(noidung));
        ProductAddSuccess();
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        ProductAddFail(error.response.data.message);
      });
  };

  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
  }, [cat]);
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 0,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        desc:
          cat == "cs"
            ? dataOther.web_cs
            : cat == "bh"
            ? dataOther.web_bh
            : dataOther.web_hd,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label=""
        name="desc"
        rules={[
          {
            required: true,
            message: "Bạn chưa nhập nội dung!",
          },
        ]}
      >
        <Input.TextArea showCount maxLength={5000} style={{ height: 360 }} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OtherContextUpdate;
