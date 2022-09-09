import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import BillAPI from "../services/billAPI";
import { GetCookie } from "../util/cookie";
import { add_bill } from "../action/bill";
import { toast } from "react-toastify";
import ProductAPI from "../services/productAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductOrder = ({ dataProductOrder }) => {
  const dispatch = useDispatch();

  //Lấy thông tin user đang đăng nhập
  const dataUserRedux = useSelector((state) => state.user.dataOne);

  //Thông báo
  const BillAddSuccess = () => {
    toast.success("Thêm hóa đơn thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const BillAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //Chuyển tới trang hóa đơn khi nhấn vào Mua
  const navigate = useNavigate();

  const onFinish = (values) => {
    const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";
    const newBill = {
      ...values,
      total_price: dataProductOrder.price * values.amount,
      products: dataProductOrder._id,
      users: userData._id,
      status: 0,
    };
    // ProductAPI

    Promise.all([
      //Để lấy hình ảnh sản phẩm khi dispatch
      ProductAPI.getproductId(dataProductOrder._id),
      BillAPI.addbill(newBill),
    ]).then((item) => {
      BillAddSuccess();
      const newBill2 = {
        ...newBill,
        products: item[0],
        _id: item[1]._id,
        users: {
          _id: userData._id,
          name: values.name,
        },
      };
      dispatch(add_bill(newBill2));
      navigate("/bill");
    });
  };

  return (
    <>
      <Row>
        <Col sm={12} xs={24} lg={12}>
          <div style={{ display: "flex" }}>
            <img
              src={dataProductOrder.image}
              style={{
                height: 300,
                width: 270,
                margin: "0px 0px 10px 20px",
                flexGrow: 1,
              }}
            />
            <div style={{ flexGrow: 1 }}>
              {dataProductOrder.images.map((item) => {
                return (
                  <img
                    src={item}
                    style={{
                      height: 80,
                      width: 80,
                      margin: "0px 0px 10px 20px",
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="borderText">
            *Mô tả: {dataProductOrder.description}{" "}
          </div>
        </Col>
        <Col sm={12} xs={24} lg={12}>
          <div className="Form-Add-Product">
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
                amount: 1,
                phone: dataUserRedux.phone,
                address: dataUserRedux.address,
                name: dataUserRedux.name,
              }}
              onFinish={onFinish}
              autoComplete="off"
              style={{
                width: "90%",
                height: "90%",
                paddingTop: 10,
                paddingBottom: "0.5px",
              }}
            >
              <Form.Item
                label="Số lượng"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa chọn số lượng!",
                  },
                  {
                    pattern: /^(?:\d*)$/,
                    message: "Giá trị phải là số",
                  },
                ]}
              >
                <InputNumber min={1} max={dataProductOrder?.amount} />
              </Form.Item>

              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập tên!",
                  },
                ]}
              >
                <Input style={{ width: "70%" }} />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại của bạn",
                  },
                  {
                    pattern: /^[\d]{10,10}$/,
                    message: "Số điện thoại phải 10 số !",
                  },
                ]}
              >
                <Input style={{ width: "70%" }} />
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập địa ch!",
                  },
                ]}
              >
                <Input.TextArea style={{ width: 400, height: 70 }} />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Đặt mua
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductOrder;
