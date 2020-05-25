import { createStore, applyMiddleware } from "redux";
import allReducers from "./reducers/index";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(logger))
);

export default store;
