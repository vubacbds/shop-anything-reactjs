import { productReducer } from "./product";
import { userReducer } from "./user";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
});

export default RootReducer;
