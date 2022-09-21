import axiosClient from "./axiosClient";

const ReplyAPI = {
  addreply: (data) => {
    const url = `/reply/create-reply`;
    return axiosClient.post(url, data);
  },
  deletereply: (id) => {
    const url = `/reply/delete-reply/${id}`;
    return axiosClient.delete(url);
  },
};

export default ReplyAPI;
