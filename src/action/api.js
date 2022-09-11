import axios from "axios";
import ProductAPI from "../services/productAPI";
import CategoryAPI from "../services/categorytAPI";
import BillAPI from "../services/billAPI";
import UserAPI from "../services/userAPI";
import OtherAPI from "../services/otherAPI";

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

const axiosUser = () => {
  return new Promise((resolve, reject) => {
    UserAPI.get()
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const axiosOther = () => {
  return new Promise((resolve, reject) => {
    OtherAPI.getother()
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export { axiosProduct, axiosCategory, axiosBill, axiosUser, axiosOther };
