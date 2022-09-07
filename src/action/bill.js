import { axiosBill } from "./api";

const getbill = () => {
  return (dispatch) => {
    axiosBill()
      .then((data) => dispatch(get_bill(data)))
      .catch((error) => console.log(error));
  };
};

const get_bill = (data) => ({
  type: "GET_BILL",
  payload: data,
});

const get_bill_user_status = (status, id) => ({
  type: "GET_BILL_USER_STATUS",
  payload: {
    id,
    status,
  },
});

const set_null = () => ({
  type: "SET_NULL",
  payload: null,
});

const add_bill = (data) => ({
  type: "ADD_BILL",
  payload: data,
});

const update_bill = (id, data) => ({
  type: "UPDATE_BILL",
  payload: {
    data: data,
    id: id,
  },
});

const delete_bill = (id) => ({
  type: "DELETE_BILL",
  payload: id,
});

export default getbill;
export { get_bill_user_status, add_bill, set_null, delete_bill, update_bill };
