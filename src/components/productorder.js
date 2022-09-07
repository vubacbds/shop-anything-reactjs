import { Button, Form, Input, InputNumber } from "antd";
import { useDispatch } from "react-redux";
import BillAPI from "../services/billAPI";
import { GetCookie } from "../util/cookie";
import { add_bill } from "../action/bill";
import { toast } from "react-toastify";
import ProductAPI from "../services/productAPI";
import { useState } from "react";

const ProductOrder = ({ dataProductOrder }) => {
  const dispatch = useDispatch();
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
        },
      };
      dispatch(add_bill(newBill2));
    });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <img
          src={dataProductOrder.image}
          style={{
            height: 320,
            width: 300,
            margin: "0px 0px 10px 20px",
            flexGrow: 1,
          }}
        />
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
          onFinish={onFinish}
          autoComplete="off"
          style={{ flexGrow: 1 }}
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
            <Input.TextArea style={{ width: 400 }} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Mua
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="borderText">{dataProductOrder.description} </div>
    </>
  );
};

export default ProductOrder;
