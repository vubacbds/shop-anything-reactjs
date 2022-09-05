const initialState = [];

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORY_ALL": {
      return {
        data: action.payload,
      };
    }
    case "GET_CATEGORY_ID": {
      const datacategoryid = state.data.find((item) => {
        return item._id === action.payload;
      });

      return {
        ...state,
        catid: action.payload,
        datacategoryid,
      };
    }
    case "ADD_CATEGORY": {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case "UPDATE_CATEGORY_SUCCESS": {
      const newCategory = state.data.filter((item) => {
        return item._id !== action.payload._id;
      });
      return {
        ...state,
        data: [...newCategory, action.payload],
      };
    }
    case "DELETE_CATEGORY_SUCCESS": {
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
