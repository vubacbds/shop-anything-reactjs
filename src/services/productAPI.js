import axiosClient from "./axiosClient";

const ProductAPI = {
  getproduct: () => {
    const url = "/api/get-product";
    return axiosClient.get(url);
  },
  getproductId: (id) => {
    const url = `/api/get-product/${id}`;
    return axiosClient.get(url);
  },
  addproduct: (data) => {
    const url = `/api/create-product`;
    return axiosClient.post(url, data);
  },
  deleteproduct: (id) => {
    const url = `/api/delete-product/${id}`;
    return axiosClient.delete(url);
  },
  updateproduct: (id, data) => {
    const url = `/api/update-product/${id}`;
    return axiosClient.put(url, data);
  },
};

export default ProductAPI;
