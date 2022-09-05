import axios from "axios";
import ProductAPI from "../services/productAPI";
import CategoryAPI from "../services/categorytAPI";

const axiosProduct = () => {
  return new Promise((resolve, reject) => {
    ProductAPI.getproduct()
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const axiosCategory = () => {
  return new Promise((resolve, reject) => {
    CategoryAPI.getcategory()
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export { axiosProduct, axiosCategory };
