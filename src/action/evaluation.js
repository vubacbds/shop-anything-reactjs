import { axiosEvaluation } from "./api";

const getevaluation = (product_id, amount) => {
  return (dispatch) => {
    axiosEvaluation(product_id, amount)
      .then((data) => dispatch(get_evaluation(data.data, data.totalData)))
      .catch((error) => console.log(error));
  };
};

const get_evaluation = (data, totalData) => ({
  type: "GET_EVALUATION",
  payload: { data, totalData },
});

//Mục đích để khi số lượng data thay đổi thì chạy cái này
const getevaluation_amount = (product_id, amount) => {
  return (dispatch) => {
    axiosEvaluation(product_id, amount)
      .then((data) =>
        dispatch(get_evaluation_amount(data.data, data.totalData))
      )
      .catch((error) => console.log(error));
  };
};

const get_evaluation_amount = (data, totalData) => ({
  //Để khi thay dổi lượng lấy data thì mới gọi cái này
  type: "GET_EVALUATION_AMOUNT",
  payload: { data, totalData },
});

const add_evaluation = (data) => ({
  type: "ADD_EVALUATION",
  payload: data,
});

const delete_evaluation = (id) => ({
  type: "DELETE_EVALUATION",
  payload: id,
});

const update_evaluation = (data) => ({
  type: "UPDATE_EVALUATION",
  payload: data,
});

const update_totaldata = (data) => ({
  type: "UPDATE_TOTALDATA",
  payload: data,
});

export default getevaluation;
export {
  add_evaluation,
  delete_evaluation,
  update_evaluation,
  getevaluation_amount,
  update_totaldata,
};
