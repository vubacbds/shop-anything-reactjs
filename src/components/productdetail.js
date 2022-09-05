import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductAPI from "../services/productAPI";

const ProductDetail = () => {
  // const product = useSelector((state) => state.product);
  const params = useParams();
  // const dataproduct = JSON.parse(localStorage.getItem("product"));
  // const productitem = dataproduct.data.data.find((item, index) => {
  //   return item["_id"] === params.productId;
  // });

  const [productItem, setProductItem] = useState();
  useEffect(() => {
    ProductAPI.getproductId(params.productId)
      .then((item) => {
        setProductItem(item);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div className="mt-4">
        <div className="row">
          <div className="col-lg-3">
            <h2> Những khóa học lập trình cho người mới </h2>
          </div>
          <div className="col-lg-9">
            <p>{productItem?.title}</p>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/LnTPJcUQdNU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>{productItem?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
