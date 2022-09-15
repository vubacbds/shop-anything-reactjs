import { axiosSize } from "./api";

const getsize = () => {
  return (dispatch) => {
    axiosSize()
      .then((data) => dispatch(get_size(data)))
      .catch((error) => console.log(error));
  };
};

const get_size = (data) => ({
  type: "GET_SIZE",
  payload: data,
});

const get_size_id = (id) => ({
  type: "GET_SIZE_ID",
  payload: id,
});

const add_size = (data) => ({
  type: "ADD_SIZE",
  payload: data,
});

const update_size = (data) => ({
  type: "UPDATE_SIZE",
  payload: data,
});

const delete_size = (id) => ({
  type: "DELETE_SIZE",
  payload: id,
});

export default getsize;
export { add_size, update_size, delete_size, get_size_id };
