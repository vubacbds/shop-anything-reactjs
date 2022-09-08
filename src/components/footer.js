import {
  FacebookOutlined,
  GithubOutlined,
  GooglePlusOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";

const Footer = () => {
  return (
    <>
      <Row style={{ backgroundColor: "#f1f1f1" }}>
        <Col span={6}>
          <div
            style={{
              color: "gray",
              margin: "20px 0px 0px 20px",
            }}
          >
            <p>0868609878</p>
            <p>vubacbds@gmail.com</p>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ color: "gray" }}>
            {/* <p>0868609878</p>
            <p>vubacbds@gmail.com</p> */}
          </div>
        </Col>

        <Col
          span={6}
          style={{
            textAlign: "justify",
          }}
        >
          <a className="btn btn-link btn-lg text-dark " href="#!">
            <FacebookOutlined />
          </a>

          <a className="btn btn-link btn-floating btn-lg text-dark " href="#!">
            <YoutubeOutlined />
          </a>

          <a className="btn btn-link btn-floating btn-lg text-dark " href="#!">
            <InstagramOutlined />
          </a>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div
            className="text-center text-dark p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2020 Copyright:
            <a className="text-dark" href="https://mdbootstrap.com/">
              MDBootstrap.com
            </a>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
