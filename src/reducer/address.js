const initialState = [];

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ADDRESS": {
      return {
        data: action.payload,
      };
    }

    default:
      return state;
  }
};
