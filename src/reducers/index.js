import loggedReducer from "./Authorization";
import demoReducer from "./demoReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  Logged: loggedReducer,
  IdToken: demoReducer,
});
export default allReducers;
