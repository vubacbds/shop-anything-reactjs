const initialState = [];

export const sizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SIZE": {
      return {
        data: action.payload,
      };
    }

    case "GET_SIZE_ID": {
      const datasizeid = state.data.find((item) => {
        return item._id === action.payload;
      });

      return {
        ...state,
        sizeid: action.payload,
        datasizeid,
      };
    }

    case "ADD_SIZE": {
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    }

    case "UPDATE_SIZE": {
      const newSize = state.data.map((item) => {
        if (item._id == action.payload._id) {
          return (item = { ...item, ...action.payload });
        } else return item;
      });
      return {
        ...state,
        data: newSize,
      };
    }

    case "DELETE_SIZE": {
      const newState = { ...state };
      const newSize = newState.data.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...newState,
        data: newSize,
      };
    }
    default:
      return state;
  }
};
