import { Avatar, Button, Col, Comment, Form, Input, List, Row } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getevaluation, {
  add_evaluation,
  delete_evaluation,
  getevaluation_amount,
  update_evaluation,
  update_totaldata,
} from "../action/evaluation";
import EvaluationAPI from "../services/evaluationAPI";
import { GetCookie } from "../util/cookie";

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

const Editor = ({ onChange, onSubmit, submitting, value }) => {
  //Lấy thông tin user
  const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";
  return (
    <>
      <Form.Item>
        <TextArea rows={2} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
          disabled={!userData}
        >
          Bình luận
        </Button>
      </Form.Item>
    </>
  );
};

const Evaluation = ({ product_id }) => {
  //Xử lý dispatch
  const dispatch = useDispatch();
  const evaluationData = useSelector((state) => state.evaluation);

  //Xử lý gọi số lượng data từ API
  const [amount, setAmount] = useState(1);

  //Khi component bắt đầu return thì  product_id thay đổi
  useEffect(() => {
    dispatch(getevaluation(product_id, amount));
    setAmount(1);
  }, [product_id]);

  //Khi số lượng data thay đổi thì dispatch lại
  useEffect(() => {
    dispatch(getevaluation_amount(product_id, amount));
  }, [amount]);

  //Lấy thông tin user
  const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";

  //Xử lý các state
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
    }, 1000);

    const newEvaluation = {
      body: value,
      image: "",
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
        content: item?.body,
        // datetime: moment(item?.createdAt).format("DD/MM/yyyy hh:mm:ss  A"),
        datetime: (
          <span>
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
  const listInnerRef = useRef();

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
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  value={value}
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
        </Col>
      </Row>
      {/* <Button onClick={() => setAmount((pre) => pre + 3)}>Xem thêm</Button> */}
    </div>
  );
};

export default Evaluation;
