import { useDispatch, useSelector } from "react-redux";
import {
  DisconnectOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Modal, Pagination } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Row } from "antd";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import ProductOrder from "./productorder";
import moment from "moment"; //Định dạng thời gian
import An3gach from "../util/an3gach";
import ProductRandom from "./productrandom";
import { UseViewport } from "../util/customhook";
import { DataContext } from "../util/datacontext";
import { getproductid } from "../action/product";
import ProductAPI from "../services/productAPI";
import { updateproduct } from "../action/product";

const { Meta } = Card;

const Product = (props) => {
  const dispatch = useDispatch();
  //Lấy data sản phẩm từ redux
  const product = useSelector((state) => state.product);

  //Lấy các thông tin của web
  const dataOther = useSelector((state) => state.other);

  //Hiện model đặt hàng
  // const [visibleOrderProduct, setVisibleOrderProduct] = useState(false);

  //Set ẩn hiện modal đặt hàng
  const visibleOrderProduct = useContext(DataContext).visibleOrderProduct;
  const setVisibleOrderProduct = useContext(DataContext).setVisibleOrderProduct;

  //Phân trang
  const objPage = {
    totalPage: product.data?.length,
    current: 1, //Trang hiện tại
    minIndex: 0, //Số min index trong mảng data có thể hiển thị
    maxIndex: 12,
    size: 12, //Số item hiển thị
  };
  const [pages, setPages] = useState(objPage);
  //Xử lý khi chọn trang
  const handleChange = (page, size) => {
    document.body.scrollTop = 0; //Khi phân trang thì scroll lên top
    document.documentElement.scrollTop = 0;
    setPages(() => {
      return {
        ...pages,
        current: page,
        minIndex: (page - 1) * size,
        maxIndex: page * size,
        size: size,
      };
    });
    An3gach();
  };

  //Sử dụng CostumHook kiểm tra kích thước màn hình để hiển thị cho đúng reponsive
  const viewPort = UseViewport();
  const isMobile = viewPort.width <= 976;

  //Sản phẩm nào có ngày hết khuyến mãi thì cập nhật lại khuyến mãi
  useEffect(() => {
    let today = new Date();
    let todayTime = new Date(moment(today).format("yyyy-MM-DD"));

    product?.data?.map((item, index) => {
      let promotionTime = new Date(
        moment(item.promotion_date).format("yyyy-MM-DD")
      );
      if (todayTime.getTime() > promotionTime.getTime()) {
        ProductAPI.updateproduct(item._id, {
          promotion: 0,
          promotion_date: "",
        }).then(function (response) {
          dispatch(
            updateproduct({ promotion: 0, promotion_date: "", _id: item._id })
          );
        });
      }
    });
  }, []);

  return (
    product && (
      <>
        <Row>
          <Col xs={0} sm={0} lg={6}>
            {!isMobile && (
              <div
                style={{
                  position: "fixed",
                  top: 100,
                  height: 420,
                  margin: "0px 20px",
                }}
              >
                {product.data && <ProductRandom data={product.data} />}{" "}
              </div>
            )}
          </Col>
          <Col xs={24} sm={16} lg={12}>
            {product?.data?.map((item, index) => {
              return (
                <div key={item._id}>
                  {index >= pages.minIndex && index < pages.maxIndex && (
                    <div>
                      <a
                        style={{ textAlign: "left" }}
                        onClick={(e) => {
                          setVisibleOrderProduct(true);
                          dispatch(getproductid(item._id));

                          e.preventDefault();
                          if (!isMobile) An3gach();
                        }}
                      >
                        <Row style={{}} className="product-hover">
                          <Col xs={7} lg={6} sm={6} md={6}>
                            <img
                              className="card-img-left"
                              src={item.images[0]}
                              style={{ width: "100%", height: 130 }}
                            />
                          </Col>
                          <Col xs={17} lg={18} sm={18} md={18}>
                            <div className="card " style={{ height: 130 }}>
                              <div
                                className="card-body"
                                style={{ padding: 10, position: "relative" }}
                              >
                                <span
                                  className="card-title"
                                  style={{
                                    size: 20,
                                    fontWeight: "bold",
                                  }}
                                >
                                  {item.title}
                                </span>
                                <div
                                  className="card-text"
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                    fontSize: 14,
                                  }}
                                >
                                  {item.promotion == 0
                                    ? item.price.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      })
                                    : (
                                        item.price -
                                        (item.price * item.promotion) / 100
                                      ).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
                                  &ensp;
                                  {item.promotion != 0 && (
                                    <span
                                      style={{
                                        textDecoration: "line-through",
                                        color: "gray",
                                      }}
                                    >
                                      {item.price.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
                                    </span>
                                  )}
                                </div>
                                {item.promotion != 0 && (
                                  <p className="tieu-de-km">
                                    {`Giảm ${item.promotion}% đến hết ${moment(
                                      item.promotion_date
                                    ).format("DD-MM-yyyy")}`}
                                  </p>
                                )}

                                <span
                                  style={{
                                    fontSize: 14,
                                    marginTop: 10,
                                    color: "#a4b4b4",
                                    position: "absolute",
                                    left: 10,
                                    top: 96,
                                  }}
                                >
                                  Còn lại: {item.amount} &ensp;
                                  {item.ghim == 1 ? (
                                    <span>
                                      <DisconnectOutlined /> Đã ghim{" "}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </span>
                                <span
                                  style={{
                                    position: "absolute",
                                    top: 94,
                                    left: "80%",
                                  }}
                                >
                                  <Button>
                                    <ShoppingCartOutlined />
                                  </Button>
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </Col>
          <Col xs={0} sm={8} lg={6}>
            <div
              style={{
                height: 420,
                margin: "50px 20px 0px 20px",
              }}
            >
              {dataOther?.web_imageads?.split(" ").join("") != "" && (
                <a href={dataOther.web_linkads} target="_blank">
                  <img
                    style={{ height: 420, width: "100%" }}
                    src={dataOther.web_imageads}
                  />
                </a>
              )}
            </div>
          </Col>
        </Row>
        {/* //Phân trang// */}

        <hr style={{ border: 2, color: "#BCADB0" }} />
        {product.data?.length == 0 ? (
          <h3 style={{ position: "absolute", top: 100, left: 460 }}>
            (Không có dữ liệu)
          </h3>
        ) : (
          product && (
            <Pagination
              pageSize={pages.size}
              current={pages.current}
              total={product.data?.length}
              onChange={handleChange}
              style={{
                textAlign: "center",
                marginBottom: 30,
                // margin: "20px 0px 20px 350px ",
              }}
              showSizeChanger={true}
              pageSizeOptions={[3, 12, 24, 48]}

              // onShowSizeChange={handleShowSizeChange}
            />
          )
        )}
        {/* //Phân trang// */}
        <ModalOrderProduct
          visible={visibleOrderProduct}
          setVisible={setVisibleOrderProduct}
        />
        {/* <Link to="/products/631b1a98ba348d830455df28">Chi tiet</Link> */}
      </>
    )
  );
};

//Modal đặt hàng
const ModalOrderProduct = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  //Sử dụng CostumHook kiểm tra kích thước màn hình để hiển thị cho đúng reponsive
  const viewPort = UseViewport();
  const isMobile = viewPort.width <= 976;

  //set on top modal đặt hàng khi nhấn vào tên web và dấu x
  const useRefModalOder = useContext(DataContext).useRefModalOder;

  //set on top modal comment khi nhấn vào tên web và dấu x
  const useRefComment = useContext(DataContext).useRefComment;

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      props.setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    props.setVisible(false);
    if (!isMobile) setBigImage(); //khi đóng trang chi tiết thì set lại trang lớn bằng null

    if (useRefComment.current) useRefComment.current.scrollTop = 0;
    if (useRefModalOder.current) useRefModalOder.current.scrollTop = 0;
  };

  //Set ảnh lớn khi click vào ảnh nhỏ trong trang chi tiết (productOrder) truyền bigImage cho comonent
  const [bigImage, setBigImage] = useState();

  //Lấy thông tin sản phẩm chi tiết
  const dataProductOrder = useSelector((state) => state.product.dataproductid);

  return (
    <Modal
      title={dataProductOrder?.title}
      visible={props.visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
      width={1100}
      // zIndex={2000} //Để model Login đè lên
    >
      <ProductOrder bigImage={bigImage} setBigImage={setBigImage} />
    </Modal>
  );
};

export default Product;

//_______________Redux ko dùng Hook__________
// import getproduct from "../action/product";
// import { connect } from "react-redux";
// import {
//   EditOutlined,
//   EllipsisOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
// import { Avatar, Card } from "antd";
// import React, { useEffect } from "react";
// import { Col, Row } from "antd";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const { Meta } = Card;

// const Product = (props) => {
//   const { product, getProductList } = props;

//   useEffect(() => {
//     getProductList();
//   }, []);

//   return (
//     <>
//       <Row gutter={{}}>
//         {product?.data?.map((item, index) => (
//           <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
//             <Link to={`/products/${item._id}`}>
//               <Card
//                 style={{ margin: 20 }}
//                 cover={
//                   <img alt="example" src={item.image} style={{ height: 250 }} />
//                 }
//                 actions={[
//                   <SettingOutlined key="setting" />,
//                   <EditOutlined key="edit" />,
//                   <EllipsisOutlined key="ellipsis" />,
//                 ]}
//               >
//                 <Meta
//                   avatar={<Avatar src={item.image} />}
//                   title={item.title}
//                   description={item.description}
//                 />
//               </Card>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// };

// const mapState = (state) => {
//   return {
//     product: state.product,
//     //   todo: state.todo,
//   };
// };
// const mapDispatch = (dispatch) => {
//   return {
//     getProductList: () => dispatch(getproduct()),
//     //   getListTodo: () => dispatch(getTodo()),
//   };
// };

// export default connect(mapState, mapDispatch)(Product);
