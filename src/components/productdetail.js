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
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseViewport } from "../util/customhook";
import moment from "moment"; //Định dạng thời gian
import { getproductid } from "../action/product";
import { CopyOutlined } from "@ant-design/icons";
import Evaluation from "./evaluation";
import Address from "./address";
//Trang này dùng cả data từ redux và lấy trực tiếp từ DB lên luôn, cái nào ko null thì chơi cái đó

const ProductDetail = () => {
  //Set ảnh lớn khi click vào ảnh nhỏ trong trang chi tiết (productOrder) truyền bigImage cho comonent
  const [bigImage, setBigImage] = useState();

  //Dùng lấy id product trên đường link
  const params = useParams();

  const dispatch = useDispatch();

  //Lấy thông tin sản phẩm chi tiết
  const dataProductOrder = useSelector((state) => state.product.dataproductid);

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
      //Để lấy hình ảnh sản phẩm khi dispatch || vì nối mảng thì được nhưng mà cần phải dispatch cho ko phải load lại trang
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

  //Để khi cập nhật lại trang data Product từ redux null thì lấy data từ DB luôn
  const [productItem, setProductItem] = useState();
  useEffect(() => {
    ProductAPI.getproductId(params.productId)
      .then((item) => {
        setProductItem(item);
      })
      .catch((e) => console.log(e));
  }, []);

  //Để reset form,
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getproductid(params.productId));
    form.resetFields();
  }, [dataUserRedux?._id]);

  //Sử dụng CostumHook kiểm tra kích thước màn hình để hiển thị cho đúng reponsive
  const viewPort = UseViewport();
  const isMobile = viewPort.width <= 512;

  const listInnerRef = useRef(); //Cái này là truyền tời component evaluation.js luôn, mục đích khi đóng modal set lại scroll ko thì nó tự load data

  //Cài đặt địa chỉ default
  const [isAddressDefault, setIsAddressDefault] = useState(true);

  return (
    <div style={{ marginBottom: 100, textAlign: "left" }}>
      <Row>
        <Col sm={24} xs={24} lg={12}>
          {!isMobile ? (
            <div style={{ display: "flex", margin: 10 }}>
              <img
                src={bigImage ?? (dataProductOrder ?? productItem)?.images[0]}
                style={{
                  height: 300,
                  width: 300,
                  // margin: "0px 0px 10px 20px",
                  flexGrow: 2,
                }}
              />
              <div style={{ flexGrow: 1 }}>
                {(dataProductOrder ?? productItem)?.images.map(
                  (item, index) => {
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
                  }
                )}
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
                  <div
                    className="carousel-item active"
                    key="0"
                    style={{ marginLeft: 10 }}
                  >
                    <img
                      src={(dataProductOrder ?? productItem)?.images[0]}
                      alt="First slide"
                      style={{
                        height: 260,
                      }}
                    />
                  </div>
                  {(dataProductOrder ?? productItem)?.images.map(
                    (item, index) => {
                      return (
                        index > 0 && (
                          <div
                            key={index}
                            className="carousel-item"
                            style={{ marginLeft: 10 }}
                          >
                            <img
                              src={item}
                              style={{
                                height: 260,
                              }}
                            />
                          </div>
                        )
                      );
                    }
                  )}
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

              <div style={{ marginLeft: 5 }}>
                {(dataProductOrder ?? productItem)?.images.map(
                  (item, index) => {
                    return (
                      <span key={index}>
                        <a
                          href="#carouselExampleControls"
                          data-slide-to={parseInt(index)}
                        >
                          <img
                            src={item}
                            style={{
                              width: 48,
                              height: 48,
                              margin: "5px 0px 5px 5px",
                            }}
                          />
                        </a>
                      </span>
                    );
                  }
                )}
              </div>
            </>
          )}

          <div
            className="description-border"
            style={{
              marginLeft: 10,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: "#a4b4b4",
              }}
            >
              <span>Còn lại: {(dataProductOrder ?? productItem)?.amount}</span>{" "}
              &ensp; | &ensp;
              <span>
                {moment((dataProductOrder ?? productItem)?.createdAt).format(
                  "DD/MM/yyyy"
                )}{" "}
              </span>
              &ensp;
              <span>
                <Button
                  onClick={() => {
                    const cb = navigator.clipboard;
                    cb.writeText(
                      `${
                        process.env.REACT_APP_DOMAIN || "http://localhost:3000"
                      }/products/${(dataProductOrder ?? productItem)?._id}`
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
              {(dataProductOrder ?? productItem)?.price.toLocaleString(
                "vi-VN",
                {
                  style: "currency",
                  currency: "VND",
                }
              )}
            </div>
            <p>*Mô tả: {(dataProductOrder ?? productItem)?.description} </p>
          </div>
        </Col>
        <Col sm={24} xs={24} lg={12}>
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
                color: (dataProductOrder ?? productItem)?.colors[0],
                size: (dataProductOrder ?? productItem)?.sizes[0],
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
                  style={{ width: "50%" }}
                  min={1}
                  max={(dataProductOrder ?? productItem)?.amount}
                  className="input-oder"
                />
              </Form.Item>

              {(dataProductOrder ?? productItem)?.sizes.length > 0 && (
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
                    {(dataProductOrder ?? productItem)?.sizes.map(
                      (item, index) => {
                        return (
                          <Select.Option
                            value={item}
                            key={index}
                            // disabled={item.status == 1}
                          >
                            {item}
                          </Select.Option>
                        );
                      }
                    )}
                  </Select>
                </Form.Item>
              )}

              {(dataProductOrder ?? productItem)?.colors.length > 0 && (
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
                    {(dataProductOrder ?? productItem)?.colors.map((item) => {
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

              <Form.Item wrapperCol={{}}>
                <button
                  htmlType="submit"
                  disabled={!dataUserRedux?._id}
                  className="button-order"
                >
                  Đặt mua
                </button>
                {!dataUserRedux?._id ? (
                  <span
                    style={{ color: "red", top: "-17px", position: "relative" }}
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
      {dataProductOrder ? (
        <Evaluation
          product_id={dataProductOrder._id}
          listInnerRef={listInnerRef}
        />
      ) : productItem ? (
        <Evaluation product_id={productItem._id} listInnerRef={listInnerRef} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductDetail;

// import { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import ProductAPI from "../services/productAPI";

// const ProductDetail = () => {
//   // const product = useSelector((state) => state.product);
//   const params = useParams();
//   // const dataproduct = JSON.parse(localStorage.getItem("product"));
//   // const productitem = dataproduct.data.data.find((item, index) => {
//   //   return item["_id"] === params.productId;
//   // });

//   const [productItem, setProductItem] = useState();
//   useEffect(() => {
//     ProductAPI.getproductId(params.productId)
//       .then((item) => {
//         setProductItem(item);
//       })
//       .catch((e) => console.log(e));
//   }, []);

//   return (
//     <>
//       <div className="mt-4">
//         <div className="row">
//           <div className="col-lg-3">
//             <h2> Những khóa học lập trình cho người mới </h2>
//           </div>
//           <div className="col-lg-9">
//             <p>{productItem?.title}</p>
//             <iframe
//               width="560"
//               height="315"
//               src="https://www.youtube.com/embed/LnTPJcUQdNU"
//               title="YouTube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//             <p>{productItem?.description}</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetail;
