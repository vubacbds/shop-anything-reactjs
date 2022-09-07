import { productReducer } from "./product";
import { userReducer } from "./user";
import { categoryReducer } from "./category";
import { billReducer } from "./bill";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  category: categoryReducer,
  bill: billReducer,
});

export default RootReducer;
