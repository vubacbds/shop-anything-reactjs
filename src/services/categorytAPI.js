import axiosClient from "./axiosClient";

const CategoryAPI = {
  getcategory: () => {
    const url = "/category/get-category";
    return axiosClient.get(url);
  },
  getcategoryId: (id) => {
    const url = `/category/get-category/${id}`;
    return axiosClient.get(url);
  },
  addcategory: (data) => {
    const url = `/category/create-category`;
    return axiosClient.post(url, data);
  },
  deletecategory: (id) => {
    const url = `/category/delete-category/${id}`;
    return axiosClient.delete(url);
  },
  updatecategory: (id, data) => {
    const url = `/category/update-category/${id}`;
    return axiosClient.put(url, data);
  },
};

export default CategoryAPI;
