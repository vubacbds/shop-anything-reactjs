const initialState = {};

export const evaluationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EVALUATION": {
      return {
        data: action.payload,
      };
    }
    case "ADD_EVALUATION": {
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    }
    case "DELETE_EVALUATION": {
      const newState = [...state.data];
      const newEvaluationList = newState.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        data: newEvaluationList,
      };
    }
    default:
      return state;
  }
};
