import axiosClient from "./axiosClient";

const EvaluationAPI = {
  getevaluation: (product_id, amount) => {
    const url = `/evaluation/get-evaluation/${product_id}/${amount}`;
    return axiosClient.get(url);
  },
  addevaluation: (data) => {
    const url = `/evaluation/create-evaluation`;
    return axiosClient.post(url, data);
  },
  deleteevaluation: (id) => {
    const url = `/evaluation/delete-evaluation/${id}`;
    return axiosClient.delete(url);
  },
  updateevaluation: (id, data) => {
    const url = `/evaluation/update-evaluation/${id}`;
    return axiosClient.put(url, data);
  },
};

export default EvaluationAPI;
