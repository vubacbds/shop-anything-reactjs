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

import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route
            path="/products/admin-product-list"
            element={<ProductList />}
          />
          <Route path="/bill" element={<Bill />} />
          <Route path="/user" element={<UsertList />} />
          {/* <Route path="/upload-image" element={<UploadImage />} /> */}
          <Route
            path="/category/admin-category-list"
            element={<CategorytList />}
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
