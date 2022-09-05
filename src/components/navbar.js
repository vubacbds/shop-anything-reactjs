import { Input } from "antd";
import { Link, NavLink } from "react-router-dom";
import getDataUser from "../action/user";
import Login from "./login";
import ProductAdd from "./productadd";

import { Button, Modal } from "antd";
import React, { useState } from "react";
import { SetCookie, GetCookie } from "../util/cookie";

const Navbar = () => {
  const [loadPage, setLoadPage] = useState(false);
  const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";

  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleProductAdd, setVisibleProductAdd] = useState(false);

  const logout = () => {
    document.getElementById("an").classList.remove("show"); //Sửa lỗi đăng xuất nhưng dropdown vẫn hiện
    SetCookie("user", "", -1);
    SetCookie("accessToken", "", -1);
    setLoadPage(!loadPage);
    // setTimeout("location.reload(true)", 50);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top sticky-top">
      <NavLink className="navbar-brand" to="/">
        <h2 className="font-home">SHOP</h2>
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {/* Để mấy cái trong 3 gạch khi thu nhỏ */}
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Danh mục
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Thời trang nam
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Thời trang nữ
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Đồ thể thao
              </a>
            </div>
          </li>
          {userData?.isadmin && (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Quản lý
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setVisibleProductAdd(true)}
                >
                  Thêm sản phẩm
                </a>
                <div className="dropdown-divider"></div>
                <Link
                  className="dropdown-item"
                  to="/products/admin-product-list"
                >
                  Sản phẩm của tôi
                </Link>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Danh mục
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Tài khoản người dùng
                </a>
              </div>
            </li>
          )}
        </ul>
        <form className="form-inline my-2 my-lg-0 mr-5">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <ul className="navbar-nav ml-auto ">
        <li className="nav-item dropdown">
          {userData ? (
            <a
              className="nav-link dropdown-toggle mr-5"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <img className="avt-user" src={userData?.image} />
              {userData?.email}
            </a>
          ) : (
            <Button type="primary" onClick={() => setVisibleLogin(true)}>
              Đăng nhập
            </Button>
          )}
          <div
            className="dropdown-menu user-dropdown dropdown-menu-right"
            id="an"
          >
            <a className="dropdown-item" href="/course/create">
              Giỏ hàng
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="/course/create">
              Đơn hàng
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="/me/store/course">
              Tài khoản
            </a>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                logout();
              }}
            >
              Đăng xuất
            </a>
          </div>
        </li>
      </ul>
      <ModalLogin visible={visibleLogin} setVisible={setVisibleLogin} />
      <ModalProductAdd
        visible={visibleProductAdd}
        setVisible={setVisibleProductAdd}
      />
    </nav>
  );
};

//Modal Login
const ModalLogin = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      props.setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    props.setVisible(false);
  };

  return (
    <>
      <Modal
        title="Đăng nhập"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Login setVisible={props.setVisible} />
      </Modal>
    </>
  );
};

//Modal Product Add
const ModalProductAdd = (props) => {
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
        title="Thêm sản phẩm"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <ProductAdd setVisible={props.setVisible} />
      </Modal>
    </>
  );
};

export default Navbar;
