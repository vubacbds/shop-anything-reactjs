import { axiosAddress } from "./api";

const getaddress = () => {
  return (dispatch) => {
    axiosAddress()
      .then((data) => dispatch(get_address(data)))
      .catch((error) => console.log(error));
  };
};

const get_address = (data) => ({
  type: "GET_ADDRESS",
  payload: data,
});

export default getaddress;
export {};
