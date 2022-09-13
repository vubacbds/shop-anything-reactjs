import axiosClient from "./axiosClient";

const EvaluationAPI = {
  getevaluation: (product_id) => {
    const url = `/evaluation/get-evaluation/${product_id}`;
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
};

export default EvaluationAPI;
