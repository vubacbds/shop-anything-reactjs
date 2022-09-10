import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import getproduct from "./action/product";
import getcategory from "./action/category";
import getbill from "./action/bill";
import getuser from "./action/user";

import Product from "./components/product";
import Navbar from "./components/navbar";
import Notfound from "./components/notfound";
import ProductDetail from "./components/productdetail";
import Login from "./components/login";
import ProductList from "./components/productlist";
import CategorytList from "./components/categorylist";
import Bill from "./components/bill";
import UsertList from "./components/userlist";
import Footer from "./components/footer";
import { BackTop } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetCookie } from "./util/cookie";

const LazyTestLazy = React.lazy(() => import("./components/testlazy"));

function App() {
  //Khi load lại trang lấy dữ liệu từ Redux luôn
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getproduct());
    dispatch(getcategory());
    dispatch(getbill());
    dispatch(getuser());
  }, []);

  //Để ràng buộc router ko cho phép vào
  const userAdmin = useSelector((state) => state.user.dataOne)?.email == "bac";
  const userFormal = useSelector((state) => state.user.dataOne);

  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/products/:productId" element={<ProductDetail />} /> */}

          <Route path="/bill" element={userFormal ? <Bill /> : <Notfound />} />

          <Route
            path="/products/admin-product-list"
            element={userAdmin ? <ProductList /> : <Notfound />} //Ko phải admin ko dc vào link này
          />
          <Route
            path="/user"
            element={userAdmin ? <UsertList /> : <Notfound />}
          />
          <Route
            path="/category/admin-category-list"
            element={<Notfound /> ? <CategorytList /> : <Notfound />}
          />

          <Route
            path="/test-lazy"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <LazyTestLazy />
              </React.Suspense>
            }
          />
          {/* Để cuối */}
          <Route path="*" element={<Notfound />} />
        </Routes>

        <ToastContainer />
      </div>
      <Footer />
      <BackTop>
        <div className="back-top">
          <UpCircleOutlined />
        </div>
      </BackTop>
    </>
  );
}

export default App;
