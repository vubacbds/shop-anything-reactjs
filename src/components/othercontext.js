import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const OtherContext = () => {
  //Lấy các thông tin của web
  const dataOther = useSelector((state) => state.other);

  //Lấy params đuôi để biết hiển thị dữ liệu nào
  const params = useParams();
  return (
    <div>
      <Row>
        <Col xs={24} lg={24}>
          <div className="other-context">
            {params.cat == "cs" ? (
              <p>{dataOther.web_cs}</p>
            ) : params.cat == "bh" ? (
              <p>{dataOther.web_bh}</p>
            ) : (
              <p>{dataOther.web_hd}</p>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OtherContext;
