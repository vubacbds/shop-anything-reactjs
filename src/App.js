import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import getproduct from "./action/product";
import getcategory from "./action/category";
import getbill from "./action/bill";
import getuser from "./action/user";
import getother from "./action/other";

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
import Other from "./components/other";
import OtherContext from "./components/othercontext";
import Evaluation from "./components/evaluation";

import { BackTop } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetCookie } from "./util/cookie";
import Demo from "./components/demo";

const LazyTestLazy = React.lazy(() => import("./components/testlazy"));

function App() {
  //Khi load lại trang lấy dữ liệu từ Redux luôn
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getproduct());
    dispatch(getcategory());
    dispatch(getbill());
    dispatch(getuser());
    dispatch(getother());
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
          <Route path="/other/:cat" element={<OtherContext />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/demo" element={<Demo />} />

          <Route
            path="/bill"
            element={userFormal ? <Bill /> : <Navigate to="/" replace />}
          />

          <Route
            path="/admin/products"
            element={userAdmin ? <ProductList /> : <Navigate to="/" replace />} //Ko phải admin ko dc vào link này
          />
          <Route
            path="/admin/users"
            element={userAdmin ? <UsertList /> : <Navigate to="/" replace />}
          />
          <Route
            path="/admin/categories"
            element={
              <Notfound /> ? <CategorytList /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/admin/others"
            element={userFormal ? <Other /> : <Navigate to="/" replace />}
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
          <Route path="*" element={<Navigate to="/" replace />} />
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
