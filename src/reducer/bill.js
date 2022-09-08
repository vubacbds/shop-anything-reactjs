import { AccountBookOutlined } from "@ant-design/icons";
import { GetCookie } from "../util/cookie";

const initialState = {
  data: [],
  olddata: [],
  coutcheck: 0,
  coutdelivering: 0,
  coutdelivered: 0,
};

export const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BILL":
      const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";
      if (userData?.email == "bac") {
        const databill = action.payload.filter((item) => {
          return item.status === 0;
        });

        //Này để đếm số lượng
        const databill1 = action.payload.filter((item) => {
          return item.status === 1;
        });
        const databill2 = action.payload.filter((item) => {
          return item.status === 2;
        });
        //Đóng đếm số lượng
        return {
          ...state,
          data: databill,
          olddata: action.payload,
          coutcheck: databill.length,
          coutdelivering: databill1.length,
          coutdelivered: databill2.length,
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
        coutcheck: state.coutcheck + 1,
      };
    }

    case "UPDATE_BILL": {
      const newState = { ...state };
      const newBill = newState.data.map((item) => {
        if (item._id == action.payload.id) {
          return (item = { ...item, ...action.payload.data });
        } else return item;
      });
      const newBillofOld = newState.olddata.map((item) => {
        if (item._id == action.payload.id) {
          return (item = { ...item, ...action.payload.data });
        } else return item;
      });

      //Này để đếm số lượng
      const coutBill = newState.data.find((item) => {
        return item._id === action.payload.id;
      });
      let deliveringOrdelivered;
      if (coutBill.status === 0) {
        deliveringOrdelivered = {
          coutdelivering: state.coutdelivering + 1,
          coutcheck: state.coutcheck - 1,
        };
      } else {
        deliveringOrdelivered = {
          coutdelivering: state.coutdelivering - 1,
          coutdelivered: state.coutdelivered + 1,
        };
      }
      //Đóng đếm số lượng

      return {
        ...state,
        data: newBill,
        olddata: newBillofOld,
        ...deliveringOrdelivered,
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

      //Này để đếm số lượng
      const coutBill = newState.data.find((item) => {
        return item._id === action.payload;
      });
      let deliveringOrdelivered;
      if (coutBill?.status === 0) {
        deliveringOrdelivered = { coutcheck: state.coutcheck - 1 };
      } else if (coutBill?.status === 1) {
        deliveringOrdelivered = { coutdelivering: state.coutdelivering - 1 };
      } else {
        deliveringOrdelivered = { coutdelivered: state.coutdelivered - 1 };
      }
      //Đóng đếm số lượng

      return {
        ...newState,
        data: newBill,
        olddata: newBillofOld,
        ...deliveringOrdelivered,
      };
    }
    default:
      return state;
  }
};
