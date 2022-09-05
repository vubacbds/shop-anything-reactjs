const initialState = [];

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORY_ALL": {
      return {
        data: action.payload,
      };
    }
    case "GET_PRODUCT_ID": {
      const categoryId = state.data.find((item) => {
        return item._id === action.payload;
      });

      return {
        ...state,
        categoryId,
      };
    }
    case "ADD_CATEGORY": {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case "UPDATE_PRODUCT_SUCCESS": {
      const newCategory = state.data.filter((item) => {
        return item._id !== action.payload._id;
      });
      return {
        ...state,
        data: [...newCategory, action.payload],
      };
    }
    case "DELETE_PRODUCT_SUCCESS": {
      const newState = { ...state };
      const newCategory = newState.data.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...newState,
        data: newCategory,
      };
    }
    default:
      return state;
  }
};
