import * as actions from "../actions/ActionTypes";

const loggedReducer = (state = [], action) => {
  switch (action.type) {
    case actions.LOGGED:
      return (state = action.loggedIn);
    default:
      return state;
  }
};

export default loggedReducer;
