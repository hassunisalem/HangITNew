import * as actions from "../actions/ActionTypes";

const demoReducer = (state = [], action) => {
  switch (action.type) {
    case actions.AUTH:
      return (state = action.idToken);
    default:
      return state;
  }
};

export default demoReducer;
