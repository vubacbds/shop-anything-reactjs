const initialState = {
  data: [],
};

export const evaluationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EVALUATION": {
      let newData = [...state.data];
      if (state.data[0]?._id != action.payload[0]?._id) {
        newData = [...state.data, ...action.payload];
      }
      return {
        ...state,
        data: newData,
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
    case "UPDATE_EVALUATION": {
      const newEvaluationList = state.data.map((item) => {
        if (item._id == action.payload._id) {
          return (item = { ...item, ...action.payload });
        } else return item;
      });
      return {
        ...state,
        data: newEvaluationList,
      };
    }

    default:
      return state;
  }
};
