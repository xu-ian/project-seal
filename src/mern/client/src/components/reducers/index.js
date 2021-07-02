import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";


//combines the two reducers for auth and error into one function
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});