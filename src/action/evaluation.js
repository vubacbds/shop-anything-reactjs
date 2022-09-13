import { axiosEvaluation } from "./api";

const getevaluation = (product_id) => {
  return (dispatch) => {
    axiosEvaluation(product_id)
      .then((data) => dispatch(get_evaluation(data)))
      .catch((error) => console.log(error));
  };
};

const get_evaluation = (data) => ({
  type: "GET_EVALUATION",
  payload: data,
});

const add_evaluation = (data) => ({
  type: "ADD_EVALUATION",
  payload: data,
});

const delete_evaluation = (id) => ({
  type: "DELETE_EVALUATION",
  payload: id,
});

export default getevaluation;
export { add_evaluation, delete_evaluation };
