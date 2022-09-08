import { Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import UserAPI from "../services/userAPI";
import { delete_user } from "../action/user";

const UsertList = () => {
  const dataUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  //Thông báo
  const UserDeleteSuccess = () => {
    toast.success("Xóa thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //Hàm xóa một user
  const deleteUser = (id) => {
    UserAPI.delete(id).then(() => {
      UserDeleteSuccess();
      dispatch(delete_user(id));
    });
  };

  //Định nghĩa các cột trong table
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        return record.email !== "bac" ? (
          <Popconfirm
            title="Bạn chắc chắn xóa?"
            onConfirm={() => deleteUser(record._id)}
          >
            <a href="#">
              <DeleteOutlined />
            </a>
          </Popconfirm>
        ) : (
          ""
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={dataUser}
        style={{ margin: "20px 20px" }}
      />
    </>
  );
};

export default UsertList;
