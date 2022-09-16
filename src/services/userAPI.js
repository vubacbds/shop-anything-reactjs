import axiosClient from "./axiosClient";

const UserAPI = {
  login: (data) => {
    const url = "/user/login";
    return axiosClient.post(url, data);
  },
  signup: (data) => {
    const url = "/user/signup";
    return axiosClient.post(url, data);
  },
  get: () => {
    const url = "/user/get";
    return axiosClient.get(url);
  },
  getemail: (email) => {
    const url = `/user/get-email`;
    return axiosClient.get(url, email);
  },
  delete: (id) => {
    const url = `/user/delete/${id}`;
    return axiosClient.delete(url);
  },
  update: (id, data) => {
    const url = `/user/update/${id}`;
    return axiosClient.put(url, data);
  },
  update_pass: (id, data) => {
    const url = `/user/update-pass/${id}`;
    return axiosClient.put(url, data);
  },
};

export default UserAPI;
