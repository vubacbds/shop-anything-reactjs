import axios from "axios";
import ProductAPI from "../services/productAPI";
import CategoryAPI from "../services/categorytAPI";
import BillAPI from "../services/billAPI";

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

const axiosBill = () => {
  return new Promise((resolve, reject) => {
    BillAPI.getall()
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export { axiosProduct, axiosCategory, axiosBill };
