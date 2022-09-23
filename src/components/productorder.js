import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import BillAPI from "../services/billAPI";
import { GetCookie } from "../util/cookie";
import { add_bill } from "../action/bill";
import { toast } from "react-toastify";
import ProductAPI from "../services/productAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseViewport } from "../util/customhook";
import moment from "moment"; //Định dạng thời gian
import { CopyOutlined } from "@ant-design/icons";
import Evaluation from "./evaluation";
import Address from "./address";

const ProductOrder = ({
  dataProductOrder,
  bigImage,
  setBigImage,
  listInnerRef,
}) => {
  const dispatch = useDispatch();

  //Lấy thông tin user đang đăng nhập
  const dataUserRedux = useSelector((state) => state.user.dataOne);

  //Lấy thuộc tính size
  const dataSize = useSelector((state) => state.size.data);

  //Lấy thuộc tính màu
  const dataColor = useSelector((state) => state.color.data);

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

  //Thông báo đã copy
  const [copy, setCopy] = useState();

  //Chuyển tới trang hóa đơn khi nhấn vào Mua
  const navigate = useNavigate();

  const onFinish = (values) => {
    const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";
    if (!isAddressDefault) {
      values.address = `${values.numhome}, ${values.ward}, ${values.district}, ${values.province} `;
    }
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

  //Để reset form,
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    setIsAddressDefault(true);
  }, [dataUserRedux?._id, dataProductOrder._id]);

  //Sử dụng CostumHook kiểm tra kích thước màn hình để hiển thị cho đúng reponsive
  const viewPort = UseViewport();
  const isMobile = viewPort.width <= 562;

  //Hàm kiểm tra nếu thuộc tính có các phần tử bị ẩn hết thì không hiện trường input đó
  // const handleCheckShow = (data) => {
  //   const dataFilter = data.filter((item) => {
  //     return item.status == 1;
  //   });
  //   if (data.length == dataFilter.length) return false;
  //   return true;
  // };

  //Cài đặt địa chỉ default
  const [isAddressDefault, setIsAddressDefault] = useState(true);

  return (
    <div id="cuon">
      <Row>
        <Col sm={24} xs={24} lg={14} md={24} xl={12}>
          {!isMobile ? (
            <div style={{ display: "flex" }}>
              <img
                src={bigImage ?? dataProductOrder.images[0]}
                style={{
                  height: 300,
                  width: 300,
                  // margin: "0px 0px 10px 20px",
                  flexGrow: 2,
                }}
              />
              <div style={{ flexGrow: 1 }}>
                {dataProductOrder.images.map((item, index) => {
                  return (
                    <a key={index}>
                      <img
                        src={item}
                        style={{
                          height: 90,
                          width: 90,
                          margin: "0px 0px 10px 10px",
                        }}
                        onClick={() => setBigImage(item)}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active" key="0">
                    <img
                      src={dataProductOrder.images[0]}
                      alt="First slide"
                      style={{
                        height: 260,
                      }}
                    />
                  </div>
                  {dataProductOrder.images.map((item, index) => {
                    return (
                      index > 0 && (
                        <div key={index} className="carousel-item">
                          <img
                            src={item}
                            style={{
                              height: 260,
                            }}
                          />
                        </div>
                      )
                    );
                  })}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only"> Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>

              {dataProductOrder.images.map((item, index) => {
                return (
                  <span key={index}>
                    <a
                      href="#carouselExampleControls"
                      data-slide-to={parseInt(index)}
                    >
                      <img
                        src={item}
                        style={{
                          width: 44,
                          height: 44,
                          margin: "4px 4px 4px 0px",
                        }}
                      />
                    </a>
                  </span>
                );
              })}
            </>
          )}

          <div className="description-border">
            <div
              style={{
                fontSize: 14,
                color: "#a4b4b4",
              }}
            >
              <span>Còn lại: {dataProductOrder.amount}</span> &ensp; | &ensp;
              <span>
                {moment(dataProductOrder.createdAt).format("DD/MM/yyyy")}{" "}
              </span>
              &ensp;
              <span>
                <Button
                  onClick={() => {
                    const cb = navigator.clipboard;
                    cb.writeText(
                      `${
                        process.env.REACT_APP_DOMAIN || "http://localhost:3000"
                      }/products/${dataProductOrder._id}`
                    ).then(() => setCopy("Đã copy"));
                  }}
                  onMouseOut={() => {
                    setCopy();
                  }}
                >
                  <CopyOutlined />
                </Button>
              </span>
              &ensp;
              <span style={{ fontSize: 12 }}>{copy ?? ""}</span>
            </div>
            <div
              className="card-text"
              style={{ color: "red", fontWeight: "bold" }}
            >
              {dataProductOrder.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
            <p>*Mô tả: {dataProductOrder.description} </p>
          </div>
        </Col>
        <Col sm={24} xs={24} lg={10} md={24} xl={12}>
          <div className="form-oder">
            <h3 className="title-form-oder">Thông tin đặt hàng</h3>
            <Form
              form={form}
              name="basic"
              labelCol={{
                xs: 24,
                md: 8,
                lg: 8,
                xl: 8,
              }}
              wrapperCol={{
                xs: 24,
                md: 16,
                lg: 16,
                xl: 16,
              }}
              initialValues={{
                amount: 1,
                phone: dataUserRedux?.phone,
                address: dataUserRedux?.address,
                name: dataUserRedux?.name,
                color: dataProductOrder?.colors[0],
                size: dataProductOrder?.sizes[0],
              }}
              onFinish={onFinish}
              autoComplete="off"
              style={{
                // width: "90%",
                // height: "90%",
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
                <Input
                  min={1}
                  max={dataProductOrder?.amount}
                  style={{ width: "50%" }}
                  className="input-oder"
                />
              </Form.Item>

              {dataProductOrder.sizes.length > 0 && (
                <Form.Item
                  label="Size "
                  name="size"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa chọn size!",
                    },
                  ]}
                >
                  <Select className="input-oder">
                    {dataProductOrder.sizes.map((item, index) => {
                      return (
                        <Select.Option
                          value={item}
                          key={index}
                          // disabled={item.status == 1}
                        >
                          {item}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              )}

              {dataProductOrder.colors.length > 0 && (
                <Form.Item
                  label="Màu sắc "
                  name="color"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa chọn màu!",
                    },
                  ]}
                >
                  <Select className="input-oder">
                    {dataProductOrder.colors.map((item) => {
                      return (
                        <Select.Option
                          value={item}
                          key={item._id}
                          // disabled={item.status == 1}
                        >
                          {item}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              )}

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
                <Input style={{}} className="input-oder" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập số điện thoại!",
                  },
                  {
                    pattern: /^[\d]{10,10}$/,
                    message: "Số điện thoại phải 10 số !",
                  },
                ]}
              >
                <Input style={{}} className="input-oder" />
              </Form.Item>

              {isAddressDefault ? (
                <div>
                  <Popconfirm
                    title="Bạn có muốn thay đổi địa chỉ không?"
                    onConfirm={() => setIsAddressDefault(false)}
                  >
                    <Form.Item
                      label="Địa chỉ"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập địa chỉ! ",
                        },
                      ]}
                    >
                      <Input.TextArea
                        style={{ height: 100 }}
                        className="input-oder"
                        disabled
                      />
                    </Form.Item>
                  </Popconfirm>
                </div>
              ) : (
                <Address />
              )}

              <Form.Item
                wrapperCol={
                  {
                    // offset: 8,
                    // span: 16,
                  }
                }
              >
                <button
                  htmlType="submit"
                  disabled={!dataUserRedux?._id}
                  className="button-order"
                >
                  Đặt mua
                </button>
                {!dataUserRedux?._id ? (
                  <span
                    style={{ color: "red", top: "-15px", position: "relative" }}
                  >
                    * Bạn cần đăng nhập mới có thể đặt mua nhé{" "}
                  </span>
                ) : (
                  ""
                )}
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
      <Evaluation
        product_id={dataProductOrder._id}
        listInnerRef={listInnerRef}
      />
    </div>
  );
};

export default ProductOrder;
