const initialState = {
  image:
    "https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg",
  _id: "",
  email: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_USER":
      return action.payload;

    default:
      return state;
  }
};
