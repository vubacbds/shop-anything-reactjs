import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./reducer";

// const saveState = (product, user) => {
//   try {
//     localStorage.setItem("product", JSON.stringify(product));
//     localStorage.setItem("user", JSON.stringify(user));
//   } catch (e) {
//     // Ignore write errors;
//   }
// };

const store = createStore(RootReducer, applyMiddleware(thunk));

//Khi store thay đổi thì hàm subscribe chạy
// store.subscribe(() => {

//   saveState(store.getState().product, store.getState().user);
// });

export default store;
