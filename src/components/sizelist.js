import { Form, Input, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SizeAPI from "../services/sizeAPI";
import {
  add_size,
  delete_size,
  get_size_id,
  update_size,
} from "../action/size";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import An3gach from "../util/an3gach";

const SizetList = () => {
  const dataSize = useSelector((state) => state.size.data);
  const dispatch = useDispatch();

  //Hiện model add size
  const [visibleSizeAdd, setVisibleSizeAdd] = useState(false);

  //Hiện model update size
  const [visibleSizeUpdate, setVisibleSizeUpdate] = useState(false);

  //Thông báo
  const SizeDeleteSuccess = () => {
    toast.success("Xóa thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //Hàm xóa một sản phẩm trong Size list
  const deleteSizeList = (id) => {
    SizeAPI.deletesize(id).then(() => {
      SizeDeleteSuccess();
      dispatch(delete_size(id));
    });
  };

  //Hàm xử lý ẩn hiện các phần tử của size
  const handleShow = (record, isshow) => {
    SizeAPI.updatesize(record._id, { ...record, status: isshow })
      .then(function (response) {
        dispatch(update_size({ ...record, status: isshow }));
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
      title: "Tên size",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      dataIndex: "operations",
      render: (_, record) => {
        return (
          <>
            <Button type="link">
              {record.status == 0 ? (
                <span onClick={() => handleShow(record, 1)}>Ẩn</span>
              ) : (
                <span onClick={() => handleShow(record, 0)}>Bỏ ẩn</span>
              )}
            </Button>
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
            &nbsp; &nbsp;
            <Popconfirm
              title="Bạn chắc chắn xóa?"
              onConfirm={() => deleteSizeList(record._id)}
            >
              <Button type="link">
                <DeleteOutlined />
              </Button>
            </Popconfirm>{" "}
            &nbsp; &nbsp;
            <Button
              onClick={() => {
                dispatch(get_size_id(record._id));
                setVisibleSizeUpdate(true);
              }}
              type="link"
            >
              <FormOutlined />
            </Button>
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
          setVisibleSizeAdd(true);
        }}
        style={{ margin: "10px 20px", fontWeight: "bold", float: "right" }}
        type="primary"
      >
        + Thêm size
      </Button>

      <Button
        onClick={() => {
          An3gach();
          handleShowAll(dataSize);
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
        dataSource={dataSize}
        style={{ margin: "0px 20px" }}
        pagination={{
          pageSize: 3, //set page mặt định
        }}
      />
      <ModalSizeAdd visible={visibleSizeAdd} setVisible={setVisibleSizeAdd} />
      <ModalSizeUpdate
        visible={visibleSizeUpdate}
        setVisible={setVisibleSizeUpdate}
      />
    </div>
  );
};

//Modal Size Add
const ModalSizeAdd = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  //Dispatch action
  const dispatch = useDispatch();

  //Thông báo
  const SizeAddSuccess = () => {
    toast.success("Thêm danh mục thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const SizeAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFinish = (values) => {
    SizeAPI.addsize(values)
      .then(function (response) {
        SizeAddSuccess();
        dispatch(add_size(response));
        props.setVisible(false);
        // navigate("/Size/admin-Size-list");
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        SizeAddFail(error.response.data.message);
      });
  };

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
        title="Thêm size"
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
            label="Tên size"
            name="name"
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập tên size!",
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

//Modal Size Update
const ModalSizeUpdate = (props) => {
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

  //Lấy Size id từ redux
  const dataSize = useSelector((state) => state.size);

  //Dispatch action
  const dispatch = useDispatch();

  //Thông báo
  const SizeUpdateSuccess = () => {
    toast.success("Sửa danh mục thành công !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const SizetAddFail = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFinish = (values) => {
    SizeAPI.updatesize(dataSize.sizeid, values)
      .then(function (response) {
        SizeUpdateSuccess();
        dispatch(update_size({ ...values, _id: dataSize.sizeid }));
        props.setVisible(false);
        // navigate("/Size/admin-Size-list");
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
        SizetAddFail(error.response.data.message);
      });
  };

  //Xử lý lấy dữ liệu cũ điền vào form
  const [form] = Form.useForm();
  useEffect(() => {
    //Khi chọn vào ID product thay đổi thì UseEffect chạy reset lại form
    form.resetFields();
  }, [dataSize.sizeid]);

  return (
    <>
      <Modal
        title="Sửa danh mục"
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
            name: dataSize.datasizeid?.name,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên size"
            name="name"
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập tên size!",
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

export default SizetList;
