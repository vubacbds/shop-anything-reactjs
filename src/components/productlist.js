import { Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import getproduct, {
  getproductcategory,
  updateproduct,
} from "../action/product";
import ProductAPI from "../services/productAPI";
import { deleteproduct, getproductid } from "../action/product";
import ProductUpdate from "./productupdate";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";

const ProductList = () => {
  const dataProduct = useSelector((state) => state.product.data); //Chú ý state.product là khi gộp các reducer lại
  const dispatch = useDispatch();

  //Xuất hiện Modal sửa sản phẩm
  const [visibleProductUpdate, setVisibleProductUpdate] = useState(false);

  //Khi commponent bắt đầu render
  useEffect(() => {
    dispatch(getproduct());
  }, []);

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
      title: "",
      dataIndex: "image",
      key: "image",
      render: (_, record) => {
        return (
          <img src={record.images[0]} style={{ width: 100, height: 100 }} />
        );
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    Table.EXPAND_COLUMN,
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        return (
          <p>
            {record.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}{" "}
          </p>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "price",
    },
    Table.SELECTION_COLUMN,
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <>
            <Popconfirm
              title="Bạn chắc chắn xóa?"
              onConfirm={() => deleteProductList(record._id)}
            >
              <a href="#">
                <DeleteOutlined />
              </a>
            </Popconfirm>{" "}
            &nbsp; &nbsp;
            <a
              onClick={() => {
                dispatch(getproductid(record._id));
                setVisibleProductUpdate(true);
              }}
              href="#"
            >
              <FormOutlined />
            </a>
          </>
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
        pageSize == selectedRowKeys?.length ||
        dataProduct.length == selectedRowKeys.length
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
        disabled: record?.working != null,
        name: record?.title,
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

  //Hàm set ảnh chính để hiển thị tại trang chủ
  const handleFirtImage = (record, url) => {
    const newImagesList = record?.images.filter((item) => {
      return item != url;
    });
    const newImages = [url, ...newImagesList];

    ProductAPI.updateproduct(record._id, { images: newImages }) //Update lại mảng images của Product và dispatch lại phía giao diện
      .then(function (response) {
        dispatch(updateproduct({ images: newImages, _id: record._id }));
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
      });
  };

  return (
    <div
      style={{
        flexDirection: "row",
        display: "inline",
      }}
    >
      <div
        style={{
          margin: "10px 20px",
          float: "right",
        }}
      >
        <Checkbox
          checked={isCheckedAll.all}
          indeterminate={isCheckedAll.part}
          disabled
        />
        &nbsp;
        <span
          style={{ width: 40, margin: "0px 10px 0px 0px" }}
        >{` Đã chọn: ${isCheckedAll.amount} `}</span>
        <Popconfirm
          title="Bạn chắc chắn xóa?"
          onConfirm={() => delProductLists()}
        >
          <a href="#">
            <DeleteOutlined style={{ fontSize: 20 }} />
          </a>
        </Popconfirm>{" "}
      </div>
      <Table
        scroll={{ x: true }}
        columns={columns}
        rowSelection={{}}
        expandable={{
          expandedRowRender: (record) => (
            <>
              {record.images.map((item, index) => {
                if (index > 0)
                  return (
                    <a key={index}>
                      <img
                        src={item}
                        onClick={() => handleFirtImage(record, item)}
                        style={{ width: 50, height: 50, margin: 10 }}
                      />
                    </a>
                  );
              })}
              <span
                style={{
                  margin: 0,
                }}
              >
                {record.description}
              </span>
            </>
          ),
        }}
        rowKey={(record) => record?._id}
        rowSelection={rowSelection}
        pagination={{
          onChange: (page, pageSize) => {
            setPageSize(pageSize);
          },
          pageSizeOptions: [2, 10, 20, 40],
          showSizeChanger: true,
        }}
        dataSource={dataProduct}
        style={{ margin: "0px 20px" }}
      />
      <ModalProductUpdate
        visible={visibleProductUpdate}
        setVisible={setVisibleProductUpdate}
      />
    </div>
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
