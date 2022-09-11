import axiosClient from "./axiosClient";

const OtherAPI = {
  getother: () => {
    const url = "/other/get-other";
    return axiosClient.get(url);
  },
  addother: (data) => {
    const url = `/other/create-other`;
    return axiosClient.post(url, data);
  },
  updateother: (id, data) => {
    const url = `/other/update-other/${id}`;
    return axiosClient.put(url, data);
  },
};

export default OtherAPI;
