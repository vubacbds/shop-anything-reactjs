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
    <>
      <Row>
        <Col lg={14} xs={24}>
          <h5 style={{ margin: 20 }}>
            Thay đổi các thông tin chung trên website của bạn
          </h5>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 12,
            }}
            initialValues={{
              web_title: dataOther?.web_title,
              web_hotline: dataOther?.web_hotline,
              web_mail: dataOther?.web_mail,
              web_facebook: dataOther?.web_facebook,
              web_youtube: dataOther?.web_youtube,
              web_finish: dataOther?.web_finish,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
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
              <Input />
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
              <Input />
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
        <Col lg={10} xs={24}>
          <div style={{ margin: "40px 0px" }}>
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
    </>
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
        width={1000}
        zIndex={48} //Để model Login đè lên
      >
        <OtherContextUpdate cat={cat} />
      </Modal>
    </>
  );
};

export default Other;
