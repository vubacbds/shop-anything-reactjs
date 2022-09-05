import { axiosProduct } from "./api";

const getproduct = () => {
  return (dispatch) => {
    dispatch(getproduct_2());
    axiosProduct()
      .then((data) => dispatch(getproduct_success(data)))
      .catch((error) => dispatch(getproduct_fail(error)));
  };
};

const getproduct_2 = () => ({
  type: "GET_PRODUCT",
});

const getproduct_success = (data) => ({
  type: "GET_PRODUCT_SUCCESS",
  payload: {
    data,
  },
});

const getproduct_fail = (error) => ({
  type: "GET_PRODUCT_FAIL",
  payload: {
    error,
  },
});

const addproduct = (data) => ({
  type: "ADD_PRODUCT_SUCCESS",
  payload: {
    data,
  },
});

const updateproduct = (data) => ({
  type: "UPDATE_PRODUCT_SUCCESS",
  payload: {
    data,
  },
});

const deleteproduct = (id) => ({
  type: "DELETE_PRODUCT_SUCCESS",
  payload: id,
});

const getproductid = (id) => ({
  type: "GET_PRODUCT_ID",
  payload: id,
});

const getproductcategory = (category) => ({
  type: "GET_PRODUCT_CATEGORY",
  payload: category,
});

export default getproduct;
export {
  addproduct,
  updateproduct,
  deleteproduct,
  getproductid,
  getproductcategory,
};
