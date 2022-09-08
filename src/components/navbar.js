import { Input } from "antd";
import { Link, NavLink } from "react-router-dom";
import getDataUser, { get_user_one } from "../action/user";
import Login from "./login";
import ProductAdd from "./productadd";
import Account from "./account";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { SetCookie, GetCookie } from "../util/cookie";
import getproduct, { getproductcategory } from "../action/product";
import { useDispatch, useSelector } from "react-redux";
import { set_null } from "../action/bill";

const Navbar = () => {
  //Thủ thuật cập nhật lại narbar khi login/logout
  const [loadPage, setLoadPage] = useState(false);

  //Lấy dữ liệu user khi login từ cookie
  const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";
  // console.log(userData);

  //Hiển thị Modal login và add product và tài khoản
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleProductAdd, setVisibleProductAdd] = useState(false);
  const [visibleAccount, setVisibleAccount] = useState(false);

  //Dispath acction khi chọn vào danh mục
  const dispatch = useDispatch();

  //Lấy danh sách danh mục
  const category = useSelector((state) => state.category.data);

  //Hàm xử lý đăng xuất
  const logout = () => {
    dispatch(set_null()); //Cho null đơn hàng
    document.getElementById("an").classList.remove("show"); //Sửa lỗi đăng xuất nhưng dropdown vẫn hiện
    SetCookie("user", "", -1);
    SetCookie("accessToken", "", -1);
    setLoadPage(!loadPage);

    // setTimeout("location.reload(true)", 50);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top sticky-top">
      <NavLink
        className="navbar-brand"
        to="/"
        onClick={() => {
          dispatch(getproductcategory());
        }}
      >
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
              {category?.map((item) => {
                return (
                  <div key={item._id}>
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={() => dispatch(getproductcategory(item._id))}
                    >
                      {item.name}
                    </Link>
                    <div className="dropdown-divider"></div>
                  </div>
                );
              })}

              <Link
                className="dropdown-item"
                to="/"
                onClick={() => {
                  dispatch(getproductcategory());
                }}
              >
                Tất cả
              </Link>
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
                <Link
                  className="dropdown-item"
                  to="/category/admin-category-list"
                >
                  Danh mục
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/user">
                  Tài khoản người dùng
                </Link>
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
            <Link className="dropdown-item" to="/bill">
              Đơn hàng
            </Link>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
              onClick={() => setVisibleAccount(true)}
            >
              Tài khoản
            </a>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
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
      <ModalAccount visible={visibleAccount} setVisible={setVisibleAccount} />
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

//Modal tài khoản
const ModalAccount = (props) => {
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
        title="Tài khoản của bạn"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <Account />
      </Modal>
    </>
  );
};

export default Navbar;
