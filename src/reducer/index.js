import { productReducer } from "./product";
import { userReducer } from "./user";
import { categoryReducer } from "./category";
import { billReducer } from "./bill";
import { otherReducer } from "./other";
import { evaluationReducer } from "./evaluation";
import { sizeReducer } from "./size";
import { colorReducer } from "./color";

import { combineReducers } from "redux";

const RootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  category: categoryReducer,
  bill: billReducer,
  other: otherReducer,
  evaluation: evaluationReducer,
  size: sizeReducer,
  color: colorReducer,
});

export default RootReducer;
