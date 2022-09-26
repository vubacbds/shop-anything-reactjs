import { Form, Popconfirm, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment"; //Định dạng thời gian

import getbill, {
  delete_bill,
  get_bill_user_status,
  update_bill,
} from "../action/bill";
import ProductUpdate from "./productupdate";
import { GetCookie } from "../util/cookie";
import { DeleteOutlined } from "@ant-design/icons";
import BillAPI from "../services/billAPI";
import ProductAPI from "../services/productAPI";

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
  const deleteBill = (record) => {
    BillAPI.deletebill(record._id)
      .then(() => {
        DeleteBillSuccess();
        dispatch(delete_bill(record._id));
      })
      .catch((err) => console.log(err));

    //Vì khi xóa bill trong đang giao thì số lượng về vị trí cũ
    if (record.status == 1)
      ProductAPI.updateproduct(record.products._id, {
        amount: record.products.amount + record.amount,
      })
        .then(() => {
          console.log("Sửa amount thành công");
        })
        .catch((e) => {
          console.log(e);
        });
  };

  //Hàm update bill thành đang giao/ đã giao
  const updateBill = (record, status) => {
    delete record.updatedAt;
    const BillUpdated = { ...record, status };
    BillAPI.updatebill(BillUpdated._id, BillUpdated).then(() => {
      UpdateBillSuccess();

      dispatch(update_bill(BillUpdated._id, BillUpdated));
      dispatch(get_bill_user_status(numbertab - 1));
    });
    //Vì khi nó thành đang giao thì số lượng giảm đi số lượng đã mua
    if (status == 1)
      ProductAPI.updateproduct(record.products._id, {
        amount: record.products.amount - record.amount,
      })
        .then(() => {
          console.log("Sửa amount thành công");
        })
        .catch((e) => {
          console.log(e);
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
          <a
            href={`${
              process.env.REACT_APP_DOMAIN || "http://localhost:3000"
            }/products/${record.products?._id}`}
            target="_blank"
          >
            <img
              src={record.products?.images[0]}
              style={{ width: 100, height: 100 }}
            />
          </a>
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
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
    },
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
      title: "Tên khách hàng",
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
      title: "Thời gian",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_, record) => {
        return (
          <p>{moment(record.updatedAt).format("DD/MM/yyyy hh:mm:ss  A")}</p>
        );
      },
    },
    {
      title: "",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        return numbertab == 1 && userData?.isadmin ? (
          <>
            <span>
              <Popconfirm
                title="Xác nhận xóa?"
                onConfirm={() => deleteBill(record)}
              >
                <Button type="link">
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </span>
            &emsp;
            <span>
              <Popconfirm
                title="Xác nhận duyệt?"
                onConfirm={() => updateBill(record, 1)}
              >
                <Button type="link">Duyệt</Button>
              </Popconfirm>
            </span>
          </>
        ) : numbertab == 1 ? (
          <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => deleteBill(record)}
          >
            <Button type="link">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        ) : numbertab == 2 && userData?.isadmin ? (
          <>
            <span>
              <Popconfirm
                title="Xác nhận xóa?"
                onConfirm={() => deleteBill(record)}
              >
                <Button type="link">
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </span>
            &emsp;
            <span>
              <Popconfirm
                title="Xác nhận duyệt?"
                onConfirm={() => updateBill(record, 2)}
              >
                <Button type="link">Đã giao</Button>
              </Popconfirm>
            </span>
          </>
        ) : numbertab == 3 && userData?.isadmin ? (
          <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => deleteBill(record)}
          >
            <Button type="link">
              <DeleteOutlined />
            </Button>
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
        scroll={{ x: true }}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <div
              style={{
                margin: 0,
              }}
            >
              <p>Chi tiết: </p>
              <p>- Tên sản phẩm: {record.products.title}</p>
              {record.size && <p>- Kích thước: {record.size}</p>}
              {record.color && <p>- Màu sắc: {record.color}</p>}
              <p>
                - Giá:{" "}
                {record.products.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p>- Số lượng: {record.amount}</p>
              {record.products.promotion != 0 && (
                <p style={{ color: "red" }}>
                  - Khuyến mãi: {record.products.promotion}%
                </p>
              )}
              <p>
                - Thành tiền:{" "}
                {record.total_price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p>- Tên khách: {record.name}</p>
              <p>- SĐT: {record.phone}</p>
              <p>- Địa chỉ: {record.address}</p>
              <p>
                - Thời gian:{" "}
                {moment(record.updatedAt).format("DD/MM/yyyy hh:mm:ss  A")}
              </p>
            </div>
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
