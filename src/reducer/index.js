import { productReducer } from "./product";
import { userReducer } from "./user";
import { categoryReducer } from "./category";
import { billReducer } from "./bill";
import { otherReducer } from "./other";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  category: categoryReducer,
  bill: billReducer,
  other: otherReducer,
});

export default RootReducer;
