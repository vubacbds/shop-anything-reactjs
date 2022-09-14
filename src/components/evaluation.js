import { PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Comment,
  Form,
  Input,
  List,
  Row,
  Upload,
} from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import getevaluation, {
  add_evaluation,
  delete_evaluation,
  getevaluation_amount,
  update_evaluation,
  update_totaldata,
} from "../action/evaluation";
import EvaluationAPI from "../services/evaluationAPI";
import { GetCookie } from "../util/cookie";
import { storage } from "./firebase";

const { TextArea } = Input;

const CommentList = ({ comments }) => {
  //Lấy tổng số lượng comment
  const evaluationTotalData = useSelector(
    (state) => state.evaluation.totalData
  );
  return (
    <List
      dataSource={comments}
      header={` Có ${evaluationTotalData} ${
        evaluationTotalData > 1 ? "đánh giá : " : "đánh giá : "
      }`}
      itemLayout="horizontal"
      renderItem={(props) => (
        <Comment {...props} style={{ marginBottom: -10 }} />
      )}
    />
  );
};

const Editor = ({
  onChange,
  onSubmit,
  submitting,
  value,
  handlePreview,
  handleChangeUpload,
  file,
  progress,
  form,
}) => {
  //Lấy thông tin user
  const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";

  return (
    <>
      <Form
        onFinish={onSubmit}
        form={form}
        initialValues={{
          remember: true,
          images: " ",
        }}
        autoComplete="off"
      >
        <Form.Item
        // name="description"
        // rules={[
        //   {
        //     required: true,
        //     message: "Bạn chưa nhập nội dung!",
        //   },
        // ]}
        >
          <TextArea
            rows={2}
            showCount
            maxLength={300}
            onChange={onChange}
            value={value}
          />
        </Form.Item>

        <Form.Item name="images">
          <div style={{ float: "left" }}>
            <Button
              htmlType="submit"
              loading={submitting}
              // onClick={onSubmit}
              type="primary"
              disabled={!userData}
            >
              Bình luận
            </Button>
          </div>
          <div style={{ float: "left", marginLeft: 100 }}>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChangeUpload}
              accept=".jpg, .png"
              // multiple={true}
              style={{ width: "20%" }}
            >
              {(!file || file?.status == "removed") && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Thêm ảnh</div>
                </div>
              )}
            </Upload>
            <br />
            <progress value={progress} max="100" style={{ width: 100 }} />
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

const Evaluation = ({ product_id, listInnerRef }) => {
  //Lấy thông tin user
  const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";

  //Xử lý dispatch
  const dispatch = useDispatch();
  const evaluationData = useSelector((state) => state.evaluation);

  //Xử lý gọi số lượng data từ API
  const [amount, setAmount] = useState(1);
  console.log(amount);
  //Khi  bắt đầu  component return hoặc product_id/userData._id thay đổi
  useEffect(() => {
    if (listInnerRef.current) listInnerRef.current.scrollTop = 0;
    dispatch(getevaluation(product_id, amount));
    setAmount(1);
  }, [product_id, userData._id]);

  //Khi số lượng data thay đổi thì dispatch lại
  useEffect(() => {
    dispatch(getevaluation_amount(product_id, amount));
  }, [amount]);

  //Xử lý các state
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  //Submit bình luận gọi khi đã upload hình ảnh
  const handleSubmit = (urlimg) => {
    if (!(file || value.trim() != "")) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
    }, 1000);

    const newEvaluation = {
      body: value.trim(),
      image: urlimg,
      products: product_id,
      users: userData._id,
    };
    EvaluationAPI.addevaluation(newEvaluation).then((item) => {
      item.users = {
        email: userData.email,
        image: userData.image,
      };
      dispatch(add_evaluation(item));
      dispatch(update_totaldata(1)); //Cộng thêm 1 vào tổng số lượng data

      //Up bình luận xong reset tất cả
      setFile();
      setUrl();
      form.resetFields();
    });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //Hàm xử lí xóa bình luận
  const handleDelete = (id) => {
    EvaluationAPI.deleteevaluation(id).then(() => {
      dispatch(delete_evaluation(id));
      dispatch(update_totaldata(-1)); //Trừ đi 1 vào tổng số lượng data
    });
  };

  //Hàm xử lí like bình luận
  const handleLike = (item) => {
    EvaluationAPI.updateevaluation(item._id, {
      likes: [userData._id, ...item.likes],
    }).then(() => {
      const newData = { ...item, likes: [userData._id, ...item.likes] };
      dispatch(update_evaluation(newData));
    });
  };

  //Hàm xử lí bỏ like bình luận
  const handleUnlike = (item) => {
    const newLikes = item.likes.filter((item) => {
      return item != userData._id;
    });
    EvaluationAPI.updateevaluation(item._id, {
      likes: newLikes,
    }).then(() => {
      const newData = { ...item, likes: newLikes };
      dispatch(update_evaluation(newData));
    });
  };

  //Kiểm tra đã like chưa
  const checkLike = (arrayLikes) => {
    return arrayLikes.find((item) => {
      return userData._id == item;
    });
  };

  //Khi lấy được component cũ thì return lại hoặc khi dispatch thêm và xóa / login tài khoản khác cũng chạy lại để sửa chỗ like dislike
  useEffect(() => {
    //Xử lý comment cũ
    let oldCommentList = []; //Danh sách comment cũ
    evaluationData.data?.forEach((item) => {
      const data = {
        _id: item._id,
        actions: [
          checkLike(item.likes) ? (
            <span
              key="comment-list-reply-to-0"
              onClick={() => handleUnlike(item)}
              style={{ color: "blue" }}
            >
              Thích ({item.likes.length})
            </span>
          ) : (
            <span
              key="comment-list-reply-to-0"
              onClick={() => handleLike(item)}
            >
              Thích ({item.likes.length})
            </span>
          ),
          userData.email == item.users?.email ||
          userData.users?.email == "bac" ? (
            <span
              key="comment-list-reply-to-0"
              onClick={() => handleDelete(item._id)}
            >
              Xóa
            </span>
          ) : null,
        ],
        author: item.users?.email,
        avatar: item.users?.image,
        content: (
          <div>
            <p>{item?.body}</p>
            {item.image && item.image != " " && (
              <img src={item.image} style={{ width: 120, height: 120 }} />
            )}
          </div>
        ),
        // datetime: moment(item?.createdAt).format("DD/MM/yyyy hh:mm:ss  A"),
        datetime: (
          <span
            onClick={() =>
              toast.info(
                moment(item?.createdAt).format("DD/MM/yyyy hh:mm:ss  A"),
                {
                  position: toast.POSITION.BOTTOM_LEFT,
                }
              )
            }
          >
            {moment(
              moment(item?.createdAt)
                .format("yyyy-MM-DD hh:mm:ss  A")
                .toString()
            ).fromNow()}
          </span>
        ),
      };
      oldCommentList.push(data);
    });
    setComments(oldCommentList);
  }, [evaluationData.data, userData._id]); //Đăng nhập tài khoản khác cũng phải chạy lại ko thì ko có avatar

  //Xử lý bắt sự kiện cuộn trang xuống cuối scroll (chú ý phải có scroll)

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setAmount((pre) => pre + 3);
      }
    }
  };

  // window.onscroll = function (ev) {
  //   if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
  //     console.log("đã cuộng xuông");
  //   }
  // };

  //Xử lý upload 1 ảnh bình luận
  const [url, setUrl] = useState();
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  // const [url, setUrl] = useState([1]);

  function getBase64(file) {
    //Sửa lỗi Xem trước phóng to
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => setPreviewVisible(false);

  const handleChangeUpload = (e) => {
    setFile(e.file);
    setProgress(0); //Để button đổi ảnh disable tắt
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(() => file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      () => file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleUpload = () => {
    if (file) {
      const uploadTask = storage
        .ref(`images/${file.originFileObj.name}`)
        .put(file.originFileObj);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(file.originFileObj.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              setProgress(0);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      );
    } else setUrl(" ");
  };

  //url thay đổi chạy handleSubmit để đăng bình luận,
  useEffect(() => {
    if (url) handleSubmit(url);
  }, [url]);
  //Đóng xử lý upload 1 ảnh

  //Reset Form
  const [form] = Form.useForm();

  return (
    <div style={{ marginTop: 40, marginLeft: 10 }}>
      <hr />
      <Row>
        <Col xs={24} sm={12} md={12} lg={12}>
          <div style={{ textAlign: "left" }}>
            <Comment
              avatar={<Avatar src={userData.image} alt={userData.email} />}
              content={
                <Editor
                  onChange={handleChange}
                  onSubmit={handleUpload}
                  submitting={submitting}
                  value={value}
                  handleChangeUpload={handleChangeUpload} //Cái này up ảnh bình luận
                  handlePreview={handlePreview}
                  file={file}
                  progress={progress}
                  form={form}
                />
              }
            />
            {comments?.length > 0 && (
              <div
                style={{ overflowY: "auto", height: 300 }}
                onScroll={onScroll}
                ref={listInnerRef}
              >
                <CommentList comments={comments} />
              </div>
            )}
          </div>
          <Button onClick={() => (listInnerRef.current.scrollTop = 0)}>
            Reset Sctroll
          </Button>
        </Col>
      </Row>
      {/* <Button onClick={() => setAmount((pre) => pre + 3)}>Xem thêm</Button> */}
    </div>
  );
};

export default Evaluation;
