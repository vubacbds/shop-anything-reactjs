import { Avatar, Button, Col, Comment, Form, Input, List, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getevaluation, {
  add_evaluation,
  delete_evaluation,
} from "../action/evaluation";
import EvaluationAPI from "../services/evaluationAPI";
import { GetCookie } from "../util/cookie";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Đăng bình luận
      </Button>
    </Form.Item>
  </>
);

const Evaluation = ({ product_id }) => {
  //Xử lý dispatch
  const dispatch = useDispatch();
  const evaluationData = useSelector((state) => state.evaluation);

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
    });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //Khi component bắt đầu return thì chạy dispatch và khi product thay đổi
  useEffect(() => {
    dispatch(getevaluation(product_id));
  }, [product_id]);

  //Khi xóa bình luận
  const handleDelete = (id) => {
    EvaluationAPI.deleteevaluation(id).then(() => {
      dispatch(delete_evaluation(id));
    });
  };

  //Khi lấy được component cũ thì return lại hoặc khi dispatch thêm và xóa
  useEffect(() => {
    //Xử lý comment cũ
    let oldCommentList = []; //Danh sách comment cũ
    evaluationData.data?.forEach((item) => {
      const data = {
        _id: item._id,
        actions: [
          <span
            key="comment-list-reply-to-0"
            onClick={() => handleDelete(item._id)}
          >
            Xóa
          </span>,
        ],
        author: item.users?.email,
        avatar: item.users?.image,
        content: item?.body,
        datetime: moment(item?.createdAt).format("DD/MM/yyyy hh:mm:ss  A"),
      };
      oldCommentList.push(data);
    });
    setComments(oldCommentList);
  }, [evaluationData.data]);

  return (
    <>
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
            {comments?.length > 0 && <CommentList comments={comments} />}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Evaluation;
