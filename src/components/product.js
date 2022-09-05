import { useSelector } from "react-redux";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const { Meta } = Card;

const Product = (props) => {
  const product = useSelector((state) => state.product);

  return (
    <>
      <Row gutter={{}}>
        {product?.data?.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
            <Link to={`/products/${item._id}`}>
              <Card
                style={{ margin: 20 }}
                cover={
                  <img alt="example" src={item.image} style={{ height: 250 }} />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src={item.image} />}
                  title={item.title}
                  description={item.description}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
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
