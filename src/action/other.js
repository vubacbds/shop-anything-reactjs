import { axiosOther } from "./api";

const getother = () => {
  return (dispatch) => {
    axiosOther()
      .then((data) => dispatch(get_other_success(...data)))
      .catch((error) => console.log(error));
  };
};

const get_other_success = (data) => ({
  type: "GET_OTHER_SUCCESS",
  payload: data,
});

const update_other = (data) => ({
  type: "UPDATE_OTHER",
  payload: data,
});

export default getother;
export { update_other };
