import axiosClient from "./axiosClient";

const UserAPI = {
  login: (data) => {
    const url = "/login";
    return axiosClient.post(url, data);
  },
  signup: (data) => {
    const url = "/signup";
    return axiosClient.post(url, data);
  },
};

export default UserAPI;
