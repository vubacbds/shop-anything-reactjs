import { axiosUser } from "./api";

const getuser = () => {
  return (dispatch) => {
    axiosUser()
      .then((data) => dispatch(get_user(data)))
      .catch((error) => console.log(error));
  };
};

const get_user = (data) => ({
  type: "GET_USER",
  payload: data,
});

const get_user_one = (id) => ({
  type: "GET_USER_ONE",
  payload: id,
});

const delete_user = (id) => ({
  type: "DELETE_USER",
  payload: id,
});

const add_user = (data) => ({
  type: "ADD_USER",
  payload: data,
});

const update_user = (data) => ({
  type: "UPDATE_USER",
  payload: data,
});

const remove_data_one = () => ({
  type: "REMOVE_DATA_ONE",
});

export default getuser;
export { delete_user, get_user_one, update_user, remove_data_one, add_user };
