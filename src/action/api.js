import axios from "axios";
import ProductAPI from "../services/productAPI";
import CategoryAPI from "../services/categorytAPI";
import BillAPI from "../services/billAPI";
import UserAPI from "../services/userAPI";
import OtherAPI from "../services/otherAPI";
import EvaluationAPI from "../services/evaluationAPI";
import SizeAPI from "../services/sizeAPI";
import ColorAPI from "../services/colorAPI";

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

const axiosSize = () => {
  return new Promise((resolve, reject) => {
    SizeAPI.getsize()
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const axiosColor = () => {
  return new Promise((resolve, reject) => {
    ColorAPI.getcolor()
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

const axiosEvaluation = (product_id, amount) => {
  return new Promise((resolve, reject) => {
    EvaluationAPI.getevaluation(product_id, amount)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const axiosAddress = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://provinces.open-api.vn/api/?depth=3`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => reject(error));
  });
};

export {
  axiosProduct,
  axiosCategory,
  axiosSize,
  axiosColor,
  axiosBill,
  axiosUser,
  axiosOther,
  axiosEvaluation,
  axiosAddress,
};
