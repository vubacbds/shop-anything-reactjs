import { DisconnectOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState, useEffect } from "react";

const ProductRandom = ({ data }) => {
  const [randomProduct, setRandomProduct] = useState(
    () => data[Math.floor(Math.random() * data.length)]
  );

  useEffect(() => {
    var timerId = setInterval(() => {
      const rand = data[Math.floor(Math.random() * data.length)];
      setRandomProduct(rand);
    }, 24000);

    // Clear intervals after 6 sec with the timer id
    setTimeout(() => {
      clearInterval(timerId);
    }, 2400000);
  }, []);

  return (
    randomProduct && (
      <>
        <a
          href={`${
            process.env.REACT_APP_DOMAIN || "http://localhost:3000"
          }/products/${randomProduct?._id}`}
          target="_blank"
        >
          <div className="product-hover">
            <img
              className="card-img-left"
              src={randomProduct.images[0]}
              style={{ width: 220, height: 200 }}
            />
            <div
              className="card "
              style={{ width: 220, height: 130, color: "black" }}
            >
              <div
                className="card-body"
                style={{ padding: 10, position: "relative" }}
              >
                <span
                  className="card-title"
                  style={{
                    size: 20,
                    fontWeight: "bold",
                  }}
                >
                  {`${randomProduct.title.slice(0, 40)}`}
                  {randomProduct.title.length > 30 && "..."}
                </span>
                <div
                  className="card-text"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  {randomProduct.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>

                <span
                  style={{
                    fontSize: 14,
                    marginTop: 10,
                    color: "#a4b4b4",
                    position: "absolute",
                    left: 10,
                    top: 94,
                  }}
                >
                  {randomProduct.amount > 0 ? (
                    <span>Còn lại: {randomProduct.amount}</span>
                  ) : (
                    <span>Hết hàng</span>
                  )}{" "}
                  &ensp;
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: 94,
                    left: "70%",
                  }}
                >
                  <Button>
                    <ShoppingCartOutlined />
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </a>
      </>
    )
  );
};

export default ProductRandom;
