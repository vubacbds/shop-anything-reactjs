import { Button, Checkbox, Col, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import OtherAPI from "../services/otherAPI";
import { update_other } from "../action/other";
import OtherContextUpdate from "./othercontextupdate";

const Other = () => {
  const dispatch = useDispatch();
  const dataOther = useSelector((state) => state.other);

  //Hiện modal update
  const [visibleOtherContext, setVisibleOtherContext] = useState(false);

  //Nhận biết chọn vào đâu
  const [cat, setCat] = useState();

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
    OtherAPI.updateother(dataOther._id, values)
      .then(function (response) {
        dispatch(update_other(values));
        ProductAddSuccess();
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        ProductAddFail(error.response.data.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row>
        <Col lg={18} xs={24}>
          <h5 style={{ margin: "20px 0px" }}>
            Thay đổi các thông tin chung trên website của bạn
          </h5>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            initialValues={{
              web_title: dataOther?.web_title,
              web_hotline: dataOther?.web_hotline,
              web_mail: dataOther?.web_mail,
              web_facebook: dataOther?.web_facebook,
              web_youtube: dataOther?.web_youtube,
              web_finish: dataOther?.web_finish,
              web_imageads: dataOther?.web_imageads,
              web_linkads: dataOther?.web_linkads,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ margin: "0px 40px" }}
          >
            <Form.Item
              label="Tên website"
              name="web_title"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập tên website!",
                },
              ]}
            >
              <Input maxLength={15} />
            </Form.Item>

            <Form.Item
              label="Số hotline"
              name="web_hotline"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập số Hotline!",
                },
              ]}
            >
              <Input maxLength={20} />
            </Form.Item>

            <Form.Item
              label="Mail website"
              name="web_mail"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập mail website!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Link facebook"
              name="web_facebook"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập link facebook!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Link yotube"
              name="web_youtube"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập link youtube!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Dòng cuối website"
              name="web_finish"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập dòng chữ cuối website!",
                },
              ]}
            >
              <Input maxLength={200} />
            </Form.Item>

            <Form.Item label="Link ảnh quảng cáo (ảnh dọc)" name="web_imageads">
              <Input />
            </Form.Item>

            <Form.Item label="Link quảng cáo" name="web_linkads">
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col lg={6} xs={24}>
          <div style={{ margin: "40px 0px 40px 0px" }}>
            <Button
              onClick={() => {
                setCat("cs");
                setVisibleOtherContext(true);
              }}
            >
              Chỉnh chính sách mua hàng
            </Button>
            <Button
              onClick={() => {
                setCat("bh");
                setVisibleOtherContext(true);
              }}
            >
              Chỉnh bảo hành
            </Button>
            <Button
              onClick={() => {
                setCat("hd");
                setVisibleOtherContext(true);
              }}
            >
              Chỉnh hướng dẫn
            </Button>
          </div>
        </Col>
      </Row>
      <ModalOtherContext
        visible={visibleOtherContext}
        setVisible={setVisibleOtherContext}
        cat={cat}
      />
    </div>
  );
};

//Modal other context
const ModalOtherContext = ({ cat, setVisible, visible }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Modal
        title={
          cat == "cs"
            ? "Cập nhật chính sách mua hàng"
            : cat == "bh"
            ? "Cập nhật chính sách bảo hành"
            : "Cập nhật hướng dẫn"
        }
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        width={800}
        zIndex={1998} //Để model Login đè lên
      >
        <OtherContextUpdate cat={cat} />
      </Modal>
    </>
  );
};

export default Other;
