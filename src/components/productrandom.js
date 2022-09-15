import { DisconnectOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState, useEffect } from "react";

const ProductRandom = ({ data }) => {
  const [randomProduct, setRandomProduct] = useState(
    () => data[Math.floor(Math.random() * data.length)]
  );
  //   const [runrandom, setRunrandom] = useState(true);

  //   setInterval(() => {
  //     const rand = data[Math.floor(Math.random() * data.length)];
  //     setRandomProduct(rand);
  //   }, 3000);
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
          href={`${process.env.REACT_APP_DOMAIN}/products/${randomProduct?._id}`}
          target="_blank"
        >
          <div className="card w-120" style={{ flexGrow: 2, width: 200 }}>
            <img
              src={randomProduct?.images[0]}
              style={{ width: 200, height: 200 }}
            />

            <div className="card-body">
              <h5 className="card-title">{randomProduct.title}</h5>
              <p
                className="card-text"
                style={{ color: "red", fontWeight: "bold" }}
              >
                {randomProduct.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <div style={{ textAlign: "left", display: "flex" }}>
                <div
                  style={{
                    flexGrow: 8,
                    fontSize: 14,
                    marginTop: 10,
                    color: "#a4b4b4",
                  }}
                >
                  Còn lại: {randomProduct.amount} &ensp;
                  {/* {randomProduct.ghim == 1 ? (
                    <span>
                      <DisconnectOutlined /> Đã ghim{" "}
                    </span>
                  ) : (
                    ""
                  )} */}
                  {/* | &ensp;{" "}
                              {moment(item.updatedAt).format("DD/MM/yyyy")} */}
                </div>
                <div style={{ flexGrow: 1 }}>
                  <Button>
                    <ShoppingCartOutlined />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </a>
      </>
    )
  );
};

export default ProductRandom;
