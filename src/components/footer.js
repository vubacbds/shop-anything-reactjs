import {
  FacebookOutlined,
  GithubOutlined,
  GooglePlusOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  SkypeOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";

const Footer = () => {
  return (
    <>
      <Row style={{ backgroundColor: "#f1f1f1", color: "gray" }}>
        <Col span={6}>
          <div
            style={{
              color: "gray",
              margin: "20px 0px 0px 20px",
              textAlign: "left",
            }}
            className="contact"
          >
            <p>
              <PhoneOutlined /> Hotline: 0868609878
            </p>
            <p>
              <MailOutlined /> Gmail: vubacbds@gmail.com
            </p>
          </div>
        </Col>
        <Col span={10}>
          <ul style={{ textAlign: "left", marginTop: 20 }}>
            <li>Chính sách mua hàng</li>
            <li>Bảo hành</li>
            <li>Hướng dẫn sử dụng</li>
          </ul>
        </Col>

        <Col
          span={8}
          style={{
            textAlign: "justify",
          }}
        >
          <div
            style={{
              margin: "20px 0px 0px 50px",
            }}
          >
            <a className="btn btn-link btn-lg text-dark " href="#!">
              <FacebookOutlined />
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-dark "
              href="#!"
            >
              <YoutubeOutlined />
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-dark "
              href="#!"
            >
              <InstagramOutlined />
            </a>
            <a
              className="btn btn-link btn-floating btn-lg text-dark "
              href="#!"
            >
              <SkypeOutlined />
            </a>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div
            className="text-center text-dark p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", color: "gray" }}
          >
            © 2022 Copyright: &nbsp;
            <a className="text-dark" href="https://mdbootstrap.com/">
              Website built on ReactJS and NodeJS platform by BAC
            </a>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
