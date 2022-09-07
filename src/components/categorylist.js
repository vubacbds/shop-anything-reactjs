import { Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CategoryAPI from "../services/categorytAPI";
import { deletecategory, getcategory_id } from "../action/category";
import CategorytAdd from "./categoryadd";
import CategorytUpdate from "./categoryupdate";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";

const CategorytList = () => {
  const dataCategory = useSelector((state) => state.category.data);
  const dispatch = useDispatch();

  //Hiện model add category
  const [visibleCategoryAdd, setVisibleCategoryAdd] = useState(false);

  //Hiện model update category
  const [visibleCategoryUpdate, setVisibleCategoryUpdate] = useState(false);

  //Thông báo
  const CategoryDeleteSuccess = () => {
    toast.success("Xóa thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //Hàm xóa một sản phẩm trong Category list
  const deleteCategoryList = (id) => {
    CategoryAPI.deletecategory(id).then(() => {
      CategoryDeleteSuccess();
      dispatch(deletecategory(id));
    });
  };

  //Định nghĩa các cột trong table
  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <>
            <Popconfirm
              title="Bạn chắc chắn xóa?"
              onConfirm={() => deleteCategoryList(record._id)}
            >
              <a href="#">
                <DeleteOutlined />
              </a>
            </Popconfirm>{" "}
            &nbsp; &nbsp;
            <a
              onClick={() => {
                dispatch(getcategory_id(record._id));
                setVisibleCategoryUpdate(true);
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

  return (
    <>
      <Button
        onClick={() => setVisibleCategoryAdd(true)}
        style={{ margin: "10px 20px", fontWeight: "bold", float: "right" }}
        type="primary"
      >
        + Thêm danh mục
      </Button>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={dataCategory}
        style={{ margin: "0px 20px" }}
      />
      <ModalCategoryAdd
        visible={visibleCategoryAdd}
        setVisible={setVisibleCategoryAdd}
      />
      <ModalCategoryUpdate
        visible={visibleCategoryUpdate}
        setVisible={setVisibleCategoryUpdate}
      />
    </>
  );
};

//Modal Category Add
const ModalCategoryAdd = (props) => {
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
        title="Thêm danh mục"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <CategorytAdd setVisible={props.setVisible} />
      </Modal>
    </>
  );
};

//Modal Category Add
const ModalCategoryUpdate = (props) => {
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
        title="Thêm danh mục"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <CategorytUpdate setVisible={props.setVisible} />
      </Modal>
    </>
  );
};

export default CategorytList;
