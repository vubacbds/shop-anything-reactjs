import { Form, Input, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ColorAPI from "../services/colorAPI";

import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import An3gach from "../util/an3gach";
import {
  add_color,
  delete_color,
  get_color_id,
  update_color,
} from "../action/color";

const ColortList = () => {
  const dataColor = useSelector((state) => state.color.data);
  const dispatch = useDispatch();

  //Hiện model add Color
  const [visibleColorAdd, setVisibleColorAdd] = useState(false);

  //Hiện model update Color
  const [visibleColorUpdate, setVisibleColorUpdate] = useState(false);

  //Thông báo
  const ColorDeleteSuccess = () => {
    toast.success("Xóa thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //Hàm xóa một sản phẩm trong Color list
  const deleteColorList = (id) => {
    ColorAPI.deletecolor(id).then(() => {
      ColorDeleteSuccess();
      dispatch(delete_color(id));
    });
  };

  //Hàm xử lý ẩn hiện các phần tử của color
  const handleShow = (record, isshow) => {
    ColorAPI.updatecolor(record._id, { ...record, status: isshow })
      .then(function (response) {
        dispatch(update_color({ ...record, status: isshow }));
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
      });
  };

  //Hàm xử lý ẩn tất cả các phần tử của size
  const handleShowAll = (data) => {
    data.map((item) => {
      if (item.status == 0) handleShow(item, 1);
    });
  };

  //Định nghĩa các cột trong table
  const columns = [
    {
      title: "Tên Color",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <>
            <a href="#">
              {record.status == 0 ? (
                <span onClick={() => handleShow(record, 1)}>Ẩn</span>
              ) : (
                <span onClick={() => handleShow(record, 0)}>Bỏ ẩn</span>
              )}
            </a>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <>
            <Popconfirm
              title="Bạn chắc chắn xóa?"
              onConfirm={() => deleteColorList(record._id)}
            >
              <a href="#">
                <DeleteOutlined />
              </a>
            </Popconfirm>{" "}
            &nbsp; &nbsp;
            <a
              onClick={() => {
                dispatch(get_color_id(record._id));
                setVisibleColorUpdate(true);
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
    <div
      style={{
        flexDirection: "row",
        display: "inline",
        marginBottom: 60,
      }}
    >
      <Button
        onClick={() => {
          An3gach();
          setVisibleColorAdd(true);
        }}
        style={{ margin: "10px 20px", fontWeight: "bold", float: "right" }}
        type="primary"
      >
        + Thêm Màu
      </Button>

      <Button
        onClick={() => {
          An3gach();
          handleShowAll(dataColor);
        }}
        style={{ margin: "10px 20px", fontWeight: "bold", float: "right" }}
        type="primary"
      >
        Ẩn tất cả
      </Button>

      <Table
        scroll={{ x: true }}
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={dataColor}
        style={{ margin: "0px 20px" }}
        pagination={{
          pageSize: 3, //set page mặt định
        }}
      />
      <ModalColorAdd
        visible={visibleColorAdd}
        setVisible={setVisibleColorAdd}
      />
      <ModalColorUpdate
        visible={visibleColorUpdate}
        setVisible={setVisibleColorUpdate}
      />
    </div>
  );
};

//Modal Color Add
const ModalColorAdd = (props) => {
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

  //Dispatch action
  const dispatch = useDispatch();

  //Thông báo
  const ColorAddSuccess = () => {
    toast.success("Thêm danh mục thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const ColorAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFinish = (values) => {
    ColorAPI.addcolor(values)
      .then(function (response) {
        ColorAddSuccess();
        dispatch(add_color(response));
        props.setVisible(false);
        // navigate("/category/admin-category-list");
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        ColorAddFail(error.response.data.message);
      });
  };

  return (
    <>
      <Modal
        title="Thêm màu"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            xs: 8,
            md: 8,
          }}
          wrapperCol={{
            xs: 12,
            md: 12,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên màu"
            name="name"
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập tên màu!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

//Modal Color Update
const ModalColorUpdate = (props) => {
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

  //Lấy Color id từ redux
  const dataColor = useSelector((state) => state.color);

  //Dispatch action
  const dispatch = useDispatch();

  //Thông báo
  const ColorUpdateSuccess = () => {
    toast.success("Sửa danh mục thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const ColortAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFinish = (values) => {
    ColorAPI.updatecolor(dataColor.colorid, values)
      .then(function (response) {
        ColorUpdateSuccess();
        dispatch(update_color({ ...values, _id: dataColor.colorid }));
        props.setVisible(false);
        // navigate("/Color/admin-Color-list");
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        ColortAddFail(error.response.data.message);
      });
  };

  //Xử lý lấy dữ liệu cũ điền vào form
  const [form] = Form.useForm();
  useEffect(() => {
    //Khi chọn vào ID product thay đổi thì UseEffect chạy reset lại form
    form.resetFields();
  }, [dataColor.colorid]);

  return (
    <>
      <Modal
        title="Sửa màu"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            xs: 8,
            md: 8,
          }}
          wrapperCol={{
            xs: 12,
            md: 12,
          }}
          initialValues={{
            remember: true,
            name: dataColor.datacolorid?.name,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên màu"
            name="name"
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập tên màu!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ColortList;
