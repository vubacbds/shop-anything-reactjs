import axiosClient from "./axiosClient";

const ColorAPI = {
  getcolor: () => {
    const url = "/color/get-color";
    return axiosClient.get(url);
  },
  addcolor: (data) => {
    const url = `/color/create-color`;
    return axiosClient.post(url, data);
  },
  deletecolor: (id) => {
    const url = `/color/delete-color/${id}`;
    return axiosClient.delete(url);
  },
  updatecolor: (id, data) => {
    const url = `/color/update-color/${id}`;
    return axiosClient.put(url, data);
  },
};

export default ColorAPI;
