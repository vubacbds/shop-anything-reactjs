import { Form, Popconfirm, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import getbill, {
  delete_bill,
  get_bill_user_status,
  update_bill,
} from "../action/bill";
import ProductUpdate from "./productupdate";
import { GetCookie } from "../util/cookie";
import { DeleteOutlined } from "@ant-design/icons";
import BillAPI from "../services/billAPI";

const BillList = ({ numbertab }) => {
  const dataBill = useSelector((state) => state.bill.data); //Chú ý state.product là khi gộp các reducer lại
  const dispatch = useDispatch();

  //Lấy User
  const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";

  //Thông báo
  const DeleteBillSuccess = () => {
    toast.success("Xóa thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //Thông báo
  const UpdateBillSuccess = () => {
    toast.success("Xác nhận thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //Hàm xóa một sản phẩm trong ProductList
  const deleteBill = (id) => {
    BillAPI.deletebill(id)
      .then(() => {
        DeleteBillSuccess();
        dispatch(delete_bill(id));
      })
      .catch((err) => console.log(err));
  };

  //Hàm update bill thành đang giao
  const updateBillDelivering = (record) => {
    const BillUpdated = { ...record, status: 1 };
    BillAPI.updatebill(BillUpdated._id, BillUpdated).then(() => {
      UpdateBillSuccess();

      dispatch(update_bill(BillUpdated._id, BillUpdated));
      dispatch(get_bill_user_status(numbertab - 1));
    });
  };

  //Hàm update bill thành đã giao
  const updateBillDelivered = (record) => {
    const BillUpdated = { ...record, status: 2 };
    BillAPI.updatebill(BillUpdated._id, BillUpdated).then(() => {
      UpdateBillSuccess();
      dispatch(update_bill(BillUpdated._id, BillUpdated));
      dispatch(get_bill_user_status(numbertab - 1));
    });
  };

  //Định nghĩa các cột trong table
  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render: (_, record) => {
        return (
          <img
            src={record.products.image}
            style={{ width: 100, height: 100 }}
          />
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: ["products", "title"],
      key: "title",
    },
    Table.EXPAND_COLUMN,
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Thành tiền",
      dataIndex: "total_price",
      key: "total_price",
      render: (_, record) => {
        return (
          <p>
            {record.total_price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}{" "}
          </p>
        );
      },
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
      key: "operation",
      render: (_, record) => {
        return numbertab == 1 && userData.email == "bac" ? (
          <>
            <span>
              <Popconfirm
                title="Xác nhận xóa?"
                onConfirm={() => deleteBill(record._id)}
              >
                <a href="#">
                  <DeleteOutlined />
                </a>
              </Popconfirm>
            </span>
            &emsp;
            <span>
              <Popconfirm
                title="Xác nhận duyệt?"
                onConfirm={() => updateBillDelivering(record)}
              >
                <a href="#">Duyệt</a>
              </Popconfirm>
            </span>
          </>
        ) : numbertab == 1 ? (
          <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => deleteBill(record._id)}
          >
            <a href="#">
              <DeleteOutlined />
            </a>
          </Popconfirm>
        ) : numbertab == 2 && userData.email == "bac" ? (
          <>
            <span>
              <Popconfirm
                title="Xác nhận xóa?"
                onConfirm={() => deleteBill(record._id)}
              >
                <a href="#">
                  <DeleteOutlined />
                </a>
              </Popconfirm>
            </span>
            &emsp;
            <span>
              <Popconfirm
                title="Xác nhận duyệt?"
                onConfirm={() => updateBillDelivered(record)}
              >
                <a href="#">Đã giao</a>
              </Popconfirm>
            </span>
          </>
        ) : (
          <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => deleteBill(record._id)}
          >
            <a href="#">
              <DeleteOutlined />
            </a>
          </Popconfirm>
        );

        // <Popconfirm
        //   title="Xác nhận?"
        //   onConfirm={() => deleteBill(record._id)}
        // >
        //   {numbertab == 1 && userData.email == "bac" ? (
        //     <a href="#">Duyệt</a>
        //   ) : numbertab == 1 ? (
        //     <a href="#">
        //       <DeleteOutlined />
        //     </a>
        //   ) : numbertab == 2 && userData.email == "bac" ? (
        //     <a href="#">Đã giao</a>
        //   ) : (
        //     <p></p>
        //   )}
        // </Popconfirm>
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.products.description}
            </p>
          ),
        }}
        rowKey={(record) => record._id}
        pagination={{
          pageSizeOptions: [2, 10, 20, 40],
          showSizeChanger: true,
        }}
        dataSource={dataBill}
      />
    </>
  );
};

export default BillList;
