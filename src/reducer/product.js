const initialState = {
  loading: false,
  error: null,
  data: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "GET_PRODUCT_SUCCESS": {
      return {
        loading: false,
        data: action.payload.data,
        error: null,
      };
    }
    case "GET_PRODUCT_FAIL": {
      return {
        loading: false,
        data: null,
        error: action.payload.error,
      };
    }
    case "GET_PRODUCT_ID": {
      const dataproductid = state.data.find((item) => {
        return item._id === action.payload;
      });

      return {
        ...state,
        productid: action.payload,
        dataproductid,
      };
    }
    case "ADD_PRODUCT_SUCCESS": {
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };
    }
    case "UPDATE_PRODUCT_SUCCESS": {
      const newProductList = state.data.filter((item) => {
        return item._id !== action.payload.data._id;
      });
      return {
        ...state,
        data: [...newProductList, action.payload.data],
      };
    }
    case "DELETE_PRODUCT_SUCCESS": {
      const newState = { ...state };
      const newProductList = newState.data.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...newState,
        data: newProductList,
      };
    }
    default:
      return state;
  }
};
