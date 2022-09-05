import { axiosCategory } from "./api";

const getcategory = () => {
  return (dispatch) => {
    axiosCategory()
      .then((data) => dispatch(getcategory_all(data)))
      .catch((error) => console.log(error));
  };
};

const getcategory_all = (data) => ({
  type: "GET_CATEGORY_ALL",
  payload: data,
});

const getcategory_id = (id) => ({
  type: "GET_PRODUCT_ID",
  payload: id,
});

const addcategory = (data) => ({
  type: "ADD_CATEGORY",
  payload: data,
});

const updatecategory = (data) => ({
  type: "UPDATE_PRODUCT_SUCCESS",
  payload: data,
});

const deletecategory = (id) => ({
  type: "DELETE_PRODUCT_SUCCESS",
  payload: id,
});

export default getcategory;
export { addcategory, updatecategory, deletecategory, getcategory_id };
