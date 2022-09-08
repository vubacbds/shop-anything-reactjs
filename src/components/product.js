import { useSelector } from "react-redux";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import ProductOrder from "./productorder";

const { Meta } = Card;

const Product = (props) => {
  //Lấy data sản phẩm từ redux
  const product = useSelector((state) => state.product);

  //Lấy 1 product khi đặt hàng
  const [dataProductOrder, setDataProductOrder] = useState();

  //Hiện model đặt hàng
  const [visibleOrderProduct, setVisibleOrderProduct] = useState(false);

  return (
    <>
      <div className="comtainer" style={{ margin: "20px 20px" }}>
        {product?.data?.map((item, index) => (
          <div className="row" key={item._id}>
            <div className="col-sm-2 col-lg-2 "> </div>
            <NavLink
              to={`/products/${item._id}`}
              className="col-sm-8 col-lg-8 product-hover"
              style={{ textAlign: "left", display: "flex" }}
            >
              <img
                className="card-img-left"
                src={item.image}
                style={{ flexGrow: 1, width: 80, height: 134 }}
              />
              <div className="card w-50" style={{ flexGrow: 2, height: 134 }}>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p
                    className="card-text"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    {item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <div style={{ textAlign: "left", display: "flex" }}>
                    <div style={{ flexGrow: 8 }}>Sản phẩm có khuyến mãi</div>
                    <div style={{ flexGrow: 1 }}>
                      <button
                        className="btn btn-primary "
                        style={{ width: 40, height: 32, marginBottom: 20 }}
                        onClick={(e) => {
                          e.preventDefault();
                          setDataProductOrder(item);
                          setVisibleOrderProduct(true);
                        }}
                      >
                        <ShoppingCartOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
            <div className="col-sm-2 col-lg-2 "> </div>
          </div>
        ))}
      </div>
      <ModalOrderProduct
        visible={visibleOrderProduct}
        setVisible={setVisibleOrderProduct}
        dataProductOrder={dataProductOrder}
      />
    </>
  );
};

//Modal đặt hàng
const ModalOrderProduct = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      props.setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    props.setVisible(false);
  };

  return (
    <>
      <Modal
        title={props.dataProductOrder?.title}
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <ProductOrder dataProductOrder={props.dataProductOrder} />
      </Modal>
    </>
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
