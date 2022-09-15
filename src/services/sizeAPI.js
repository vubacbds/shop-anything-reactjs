import axiosClient from "./axiosClient";

const SizeAPI = {
  getsize: () => {
    const url = "/size/get-size";
    return axiosClient.get(url);
  },
  addsize: (data) => {
    const url = `/size/create-size`;
    return axiosClient.post(url, data);
  },
  deletesize: (id) => {
    const url = `/size/delete-size/${id}`;
    return axiosClient.delete(url);
  },
  updatesize: (id, data) => {
    const url = `/size/update-size/${id}`;
    return axiosClient.put(url, data);
  },
};

export default SizeAPI;
