import axiosClient from "./axiosClient";

const BillAPI = {
  getall: () => {
    const url = "/bill/get-all";
    return axiosClient.get(url);
  },
  addbill: (data) => {
    const url = `/bill/create-bill`;
    return axiosClient.post(url, data);
  },
  deletebill: (id) => {
    const url = `/bill/delete-bill/${id}`;
    return axiosClient.delete(url);
  },
  updatebill: (id, data) => {
    const url = `/bill/update-bill/${id}`;
    return axiosClient.put(url, data);
  },
};

export default BillAPI;
