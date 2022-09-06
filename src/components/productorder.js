import { Button, Form, Input, InputNumber } from "antd";

const ProductOrder = ({ dataProductOrder }) => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
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
            { required: true, message: "Vui lòng nhập số điện thoại của bạn" },
            {
              pattern: /^[\d]{10,10}$/,
              message: "Số điện thoại phải 10 số !",
            },
          ]}
        >
          <InputNumber style={{ width: "70%" }} />
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
  );
};

export default ProductOrder;
