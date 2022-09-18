import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import getproduct from "./action/product";
import getcategory from "./action/category";
import getbill from "./action/bill";
import getuser, { add_user } from "./action/user";
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
import ProductProperties from "./components/productproperties";
import LoginGmail from "./components/logingmail";
import VerifyEmail from "./components/verifyemail";

import { BackTop } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetCookie, SetCookie } from "./util/cookie";
import Demo from "./components/demo";
import getsize from "./action/size";
import getcolor from "./action/color";

// Configure Firebase.
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyDbdEkMG0zt5YBRQlpPdT_gctip3pYfLpM",
  authDomain: "product-anything.firebaseapp.com",
  projectId: "product-anything",
  storageBucket: "product-anything.appspot.com",
  messagingSenderId: "553146405137",
  appId: "1:553146405137:web:f234bde8921a619e31fcb0",
  measurementId: "G-J7HK4D02SN",
};
firebase.initializeApp(config);
//Close Configure Firebase.

const LazyTestLazy = React.lazy(() => import("./components/testlazy"));

function App() {
  //Khi load lại trang lấy dữ liệu từ Redux luôn
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getproduct());
    dispatch(getcategory());
    dispatch(getsize());
    dispatch(getcolor());
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
          <Route path="/loginmail" element={<LoginGmail />} />
          <Route path="/user/verify/:userid" element={<VerifyEmail />} />

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
            path="/admin/properties"
            element={
              userAdmin ? <ProductProperties /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/admin/categories"
            element={
              userAdmin ? <CategorytList /> : <Navigate to="/" replace />
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
