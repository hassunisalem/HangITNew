import * as actions from "../actions/ActionTypes";

const darkReducer = (state = [], action) => {
  switch (action.type) {
    case actions.DARK:
      return (state = action.darkMode);
    default:
      return state;
  }
};

export default darkReducer;
