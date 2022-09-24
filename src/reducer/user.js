import { GetCookie } from "../util/cookie";

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      //Lấy User từ cookie
      const userDataCookie = GetCookie("user")
        ? JSON.parse(GetCookie("user"))
        : "";
      const dataOne = action.payload.find((item) => {
        return item._id == userDataCookie._id;
      });
      return {
        data: action.payload,
        dataOne,
      };

    case "DELETE_USER": {
      const newState = { ...state };
      const userList = newState.data.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        data: userList,
      };
    }

    case "GET_USER_ONE": {
      const dataOne = state.data.find((item) => {
        return item._id == action.payload;
      });
      return {
        ...state,
        dataOne,
      };
    }

    case "ADD_USER": {
      return {
        ...state,
        data: [action.payload, ...state.data],
        dataOne: action.payload,
      };
    }

    case "UPDATE_USER": {
      const newUser = { ...state.dataOne, ...action.payload };
      return {
        ...state,
        dataOne: newUser,
      };
    }

    case "REMOVE_DATA_ONE": {
      return {
        ...state,
        dataOne: null,
      };
    }

    default:
      return state;
  }
};
