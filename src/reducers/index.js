import loggedReducer from "./Authorization";
import demoReducer from "./demoReducer";
import darkReducer from "./DarkReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  Logged: loggedReducer,
  IdToken: demoReducer,
  darkMode: darkReducer,
});
export default allReducers;
