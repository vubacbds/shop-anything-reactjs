import { Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import getproduct from "../action/product";
import ProductAPI from "../services/productAPI";
import { deleteproduct, getproductid } from "../action/product";
import ProductUpdate from "./productupdate";

const ProductList = () => {
  const dataProduct = useSelector((state) => state.product.data); //Chú ý state.product là khi gộp các reducer lại
  const dispatch = useDispatch();

  //Xuất hiện Modal sửa sản phẩm
  const [visibleProductUpdate, setVisibleProductUpdate] = useState(false);

  //Thông báo
  const ProductAddSuccess = () => {
    toast.success("Xóa thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //Hàm xóa một sản phẩm trong ProductList
  const deleteProductList = (id) => {
    ProductAPI.deleteproduct(id).then(() => {
      ProductAddSuccess();
      dispatch(deleteproduct(id));
    });
  };

  //Định nghĩa các cột trong table
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    Table.EXPAND_COLUMN,
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    Table.SELECTION_COLUMN,
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Bạn chắc chắn xóa?"
            onConfirm={() => deleteProductList(record._id)}
          >
            <a>Xóa</a>
          </Popconfirm>
        );
      },
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              dispatch(getproductid(record._id));
              setVisibleProductUpdate(true);
            }}
            href="#"
          >
            Sửa
          </a>
        );
      },
    },
  ];

  //Xử lý Checkbox chọn tất cả
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); //state chứa các ID cần xóa
  const [isCheckedAll, setIsCheckedAll] = useState({
    //state để biết checkbox checkall hay chưa all
    all: false,
    part: false,
    amount: 0,
  });
  const [pageSize, setPageSize] = useState(10); //để lấy pagesize hiện tại , kiểm tra checkall

  //Hàm truyền vào table trả về 2 tham số các key chọn và hàng chọn
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      if (
        pageSize == selectedRowKeys.length ||
        dataProduct.data.length == selectedRowKeys.length
      )
        setIsCheckedAll({
          all: true,
          part: false,
          amount: selectedRowKeys.length,
        });
      else if (selectedRowKeys.length > 0 && selectedRowKeys.length < pageSize)
        setIsCheckedAll({
          all: false,
          part: true,
          amount: selectedRowKeys.length,
        });
      else
        setIsCheckedAll({
          all: false,
          part: false,
          amount: selectedRowKeys.length,
        });
    },
    getCheckboxProps: (record) => {
      return {
        disabled: record.working != null,
        name: record.title,
      };
    },
  };

  //Hàm xóa nhiều sản phẩm trong ProductList
  const delProductLists = () => {
    selectedRowKeys.forEach((id) => {
      ProductAPI.deleteproduct(id)
        .then(function (response) {
          ProductAddSuccess();
          dispatch(deleteproduct(id));

          setSelectedRowKeys([]);
          setIsCheckedAll({
            //state để biết checkbox checkall hay chưa all
            all: false,
            part: false,
            amount: 0,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  return (
    <>
      <div>
        <Popconfirm
          title="Bạn chắc chắn xóa?"
          onConfirm={() => delProductLists()}
        >
          <Button type="primary" danger style={{ marginLeft: 5, width: 68 }}>
            Xóa tất cả
          </Button>
        </Popconfirm>{" "}
        &nbsp;
        <Checkbox
          checked={isCheckedAll.all}
          indeterminate={isCheckedAll.part}
          disabled
        />
        <span style={{ width: 40 }}>{` Đã chọn: ${isCheckedAll.amount} `}</span>
      </div>
      <Table
        columns={columns}
        rowSelection={{}}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.description}
            </p>
          ),
        }}
        rowKey={(record) => record._id}
        rowSelection={rowSelection}
        pagination={{
          onChange: (page, pageSize) => {
            setPageSize(pageSize);
          },
          pageSizeOptions: [2, 10, 20, 40],
          showSizeChanger: true,
        }}
        dataSource={dataProduct}
      />
      <ModalProductUpdate
        visible={visibleProductUpdate}
        setVisible={setVisibleProductUpdate}
      />
    </>
  );
};

//Modal Product Update
const ModalProductUpdate = (props) => {
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
        title="Sửa sản phẩm"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <ProductUpdate setVisible={props.setVisible} />
      </Modal>
    </>
  );
};

export default ProductList;
