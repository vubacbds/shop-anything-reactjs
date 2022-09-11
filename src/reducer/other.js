const initialState = {};

export const otherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_OTHER_SUCCESS": {
      return action.payload;
    }

    case "UPDATE_OTHER": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};
