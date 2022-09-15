import { axiosColor } from "./api";

const getcolor = () => {
  return (dispatch) => {
    axiosColor()
      .then((data) => dispatch(get_color(data)))
      .catch((error) => console.log(error));
  };
};

const get_color = (data) => ({
  type: "GET_COLOR",
  payload: data,
});

const get_color_id = (id) => ({
  type: "GET_COLOR_ID",
  payload: id,
});

const add_color = (data) => ({
  type: "ADD_COLOR",
  payload: data,
});

const update_color = (data) => ({
  type: "UPDATE_COLOR",
  payload: data,
});

const delete_color = (id) => ({
  type: "DELETE_COLOR",
  payload: id,
});

export default getcolor;
export { add_color, update_color, delete_color, get_color_id };
