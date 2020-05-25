import * as actions from "./ActionTypes";

export function setIdToken(idToken) {
  return {
    type: actions.AUTH,

    idToken,
  };
}

export function setIsLogged(loggedIn) {
  return {
    type: actions.LOGGED,

    loggedIn,
  };
}
