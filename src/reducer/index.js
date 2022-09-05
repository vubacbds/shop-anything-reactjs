import { productReducer } from "./product";
import { userReducer } from "./user";
import { categoryReducer } from "./category";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  category: categoryReducer,
});

export default RootReducer;
