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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import An3gach from "../util/an3gach";

const Footer = () => {
  //Lấy các thông tin của web
  const dataOther = useSelector((state) => state.other);

  return (
    <>
      <footer style={{}}>
        <div className="ghimfooter  ">
          <Row
            style={{
              backgroundColor: "#f1f1f1",
              color: "gray",
            }}
          >
            <Col lg={10} xs={12} md={10} xl={10}>
              <div
                style={{
                  color: "gray",
                  margin: "10px 0px 0px 20px",
                  textAlign: "left",
                }}
                className="contact"
              >
                <p>
                  <PhoneOutlined /> Hotline: {dataOther?.web_hotline}
                </p>
                <p>
                  <MailOutlined /> {dataOther?.web_mail}
                </p>
              </div>
            </Col>
            <Col lg={8} xs={12} md={8} xl={8}>
              <ul style={{ textAlign: "left", marginTop: 10 }}>
                <li>
                  <Link
                    to="/other/cs"
                    style={{ color: "black" }}
                    onClick={() => {
                      document.body.scrollTop = 0; //Khi phân trang thì scroll lên top
                      document.documentElement.scrollTop = 0;
                      An3gach();
                    }}
                  >
                    {" "}
                    Chính sách mua hàng
                  </Link>
                </li>
                <li>
                  <Link
                    to="/other/bh"
                    style={{ color: "black" }}
                    onClick={() => {
                      document.body.scrollTop = 0; //Khi phân trang thì scroll lên top
                      document.documentElement.scrollTop = 0;
                      An3gach();
                    }}
                  >
                    {" "}
                    Bảo hành
                  </Link>
                </li>
                <li>
                  <Link
                    to="/other/hd"
                    style={{ color: "black" }}
                    onClick={() => {
                      document.body.scrollTop = 0; //Khi phân trang thì scroll lên top
                      document.documentElement.scrollTop = 0;
                      An3gach();
                    }}
                  >
                    {" "}
                    Hướng dẫn
                  </Link>
                </li>
              </ul>
            </Col>

            <Col
              lg={6}
              xs={24}
              md={6}
              xl={6}
              style={{
                textAlign: "justify",
              }}
            >
              <div
                style={
                  {
                    // margin: "20px 0px 0px 0px",
                  }
                }
              >
                <a
                  className="btn btn-link btn-lg text-dark "
                  href={dataOther?.web_facebook}
                  target="_blank"
                >
                  <FacebookOutlined />
                </a>

                <a
                  className="btn btn-link btn-floating btn-lg text-dark "
                  href={dataOther?.web_youtube}
                  target="_blank"
                >
                  <YoutubeOutlined />
                </a>

                {/* <a
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
              </a> */}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div
                className="text-center text-dark p-3"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  color: "gray",
                  fontSize: 11,
                }}
              >
                <p className="text-dark">{dataOther?.web_finish}</p>
              </div>
            </Col>
          </Row>
        </div>
        {/* <Link to="/demo">Demo</Link> */}
      </footer>
    </>
  );
};

export default Footer;
