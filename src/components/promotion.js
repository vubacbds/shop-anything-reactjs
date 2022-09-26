import { toast } from "react-toastify";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import ProductAPI from "../services/productAPI";
import { updateproduct } from "../action/product";
import moment from "moment"; //Định dạng thời gian

const Promotion = (props) => {
  //Lấy product id từ redux
  const dataProductId = useSelector((state) => state.product);
  console.log(dataProductId);

  //Dispatch action
  const dispatch = useDispatch();

  //Thông báo
  const ProductUpdateSuccess = () => {
    toast.success("Thêm khuyến mãi thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const ProductUpdateAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFinish = (values) => {
    // values.promotion_date = moment(values.promotion_date).format("DD/MM/yyyy");
    // console.log(values);
    ProductAPI.updateproduct(dataProductId.productid, values)
      .then(function (response) {
        dispatch(updateproduct({ ...values, _id: dataProductId.productid }));
        ProductUpdateSuccess();
        props.setVisible(false);
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        ProductUpdateAddFail(error.response.data.message);
      });
  };

  //Xử lý lấy dữ liệu cũ điền vào form
  const [form] = Form.useForm();
  useEffect(() => {
    //Khi chọn vào ID product thay đổi thì UseEffect chạy reset lại form
    form.resetFields();
  }, [dataProductId.productid]);

  return (
    <>
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
          remember: true,
          promotion: dataProductId?.dataproductid?.promotion,
          promotion_date:
            dataProductId?.dataproductid?.promotion_date &&
            moment(
              moment(dataProductId?.dataproductid?.promotion_date).format(
                "DD-MM-yyyy"
              ),
              "DD-MM-yyyy"
            ),
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="% khuyến mãi"
          name="promotion"
          rules={[
            {
              required: true,
              message: "Chưa có % khuyến mãi!!",
            },
            {
              pattern: /^(?:\d*)$/,
              message: "Phải là số",
            },
          ]}
        >
          <Input max={100} maxLength={2} />
        </Form.Item>

        <Form.Item
          label="Thời hạn khuyến mãi"
          name="promotion_date"
          rules={[
            {
              required: true,
              message: "Chưa có thời hạn khuyến mãi!!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={() => form.resetFields()}>Reset</Button>
    </>
  );
};

export default Promotion;
