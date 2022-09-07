import { AccountBookOutlined } from "@ant-design/icons";
import { GetCookie } from "../util/cookie";

const initialState = {
  data: [],
  olddata: [],
};

export const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BILL":
      const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";
      if (userData?.email == "bac") {
        const databill = action.payload.filter((item) => {
          return item.status === 0;
        });
        return {
          ...state,
          data: databill,
          olddata: action.payload,
        };
      } else {
        const databill = action.payload.filter((item) => {
          return item.status === 0 && item.users?._id === userData?._id;
        });
        return {
          ...state,
          data: databill,
          olddata: action.payload,
        };
      }
    case "GET_BILL_USER_STATUS": {
      if (!action.payload.id) {
        const databill = state.olddata.filter((item) => {
          return item.status === action.payload.status;
        });
        return {
          ...state,
          data: databill,
        };
      } else {
        const databill = state.olddata.filter((item) => {
          return (
            item.status === action.payload.status &&
            item.users?._id === action.payload.id
          );
        });
        return {
          ...state,
          data: databill,
        };
      }
    }

    case "SET_NULL": {
      return initialState;
    }
    case "ADD_BILL": {
      return {
        ...state,
        data: [...state.data, action.payload],
        olddata: [...state.olddata, action.payload],
      };
    }

    case "UPDATE_BILL": {
      const newState = { ...state };
      const newBill = newState.data.filter((item) => {
        return item._id !== action.payload.id;
      });
      const newBillofOld = newState.olddata.filter((item) => {
        return item._id !== action.payload.id;
      });
      return {
        ...state,
        data: [...newBill, action.payload.data],
        olddata: [...newBillofOld, action.payload.data],
      };
    }

    case "DELETE_BILL": {
      const newState = { ...state };
      const newBill = newState.data.filter(
        (item) => item._id !== action.payload
      );
      const newBillofOld = newState.olddata.filter(
        //cả xét cho old data, vì khi chuyển tab nó lại lấy dữ liệu oldataa
        (item) => item._id !== action.payload
      );
      return {
        ...newState,
        data: newBill,
        olddata: newBillofOld,
      };
    }
    default:
      return state;
  }
};
