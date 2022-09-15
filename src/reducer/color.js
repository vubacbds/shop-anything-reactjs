const initialState = [];

export const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COLOR": {
      return {
        data: action.payload,
      };
    }

    case "GET_COLOR_ID": {
      const datacolorid = state.data.find((item) => {
        return item._id === action.payload;
      });

      return {
        ...state,
        colorid: action.payload,
        datacolorid,
      };
    }

    case "ADD_COLOR": {
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    }

    case "UPDATE_COLOR": {
      const newColor = state.data.map((item) => {
        if (item._id == action.payload._id) {
          return (item = { ...item, ...action.payload });
        } else return item;
      });
      return {
        ...state,
        data: newColor,
      };
    }

    case "DELETE_COLOR": {
      const newState = { ...state };
      const newColor = newState.data.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...newState,
        data: newColor,
      };
    }
    default:
      return state;
  }
};
