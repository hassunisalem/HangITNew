import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductAdmin from "./components/ProductAdmin";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ForgotPasswordVerification from "./components/auth/ForgotPasswordVerification";
import ChangePassword from "./components/auth/ChangePassword";
import ChangePasswordConfirm from "./components/auth/ChangePasswordConfirm";
import Welcome from "./components/auth/Welcome";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Theme";

import "react-dates/initialize";
import "react-dropdown/style.css";

import { Auth } from "aws-amplify";
// import { withAuthenticator } from "aws-amplify-react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Chart from "./components/chartsTypes/Chart";

import store from "./store";
import * as ActionConstructer from "./actions/ActionConstructer";

library.add(faEdit);

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
  };

  setAuthStatus = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = (user) => {
    this.setState({ user: user });
  };

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();

      this.setAuthStatus(true);

      store.dispatch(ActionConstructer.setDarkModeFlag("light"));
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
      console.log(session);
      this.setState({ isAuthenticating: false });
      store.dispatch(
        ActionConstructer.setIdToken(
          (await Auth.currentSession()).getIdToken().getJwtToken()
        )
      );
    } catch (error) {
      if (error !== "No current user") {
        store.dispatch(ActionConstructer.setIsLogged(false));
        console.log(error);
      }
      store.dispatch(ActionConstructer.setDarkModeFlag("light"));
    }

    this.setState({ isAuthenticating: false });
  }

  themeToggler = () => {
    store.getState().darkMode === "light"
      ? store.dispatch(ActionConstructer.setDarkModeFlag("dark"))
      : store.dispatch(ActionConstructer.setDarkModeFlag("light"));
    this.forceUpdate();
  };

  render() {
    store.dispatch(ActionConstructer.setIsLogged(false));
    if (this.state.isAuthenticated) {
      store.dispatch(ActionConstructer.setIsLogged(true));
    }

    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
    };
    var charPage = null;
    if (this.state.isAuthenticated) {
      charPage = (
        <Route
          exact
          path="/chart"
          render={(props) => <Chart {...props} auth={authProps} />}
        />
      );
    }
    return (
      !this.state.isAuthenticating && (
        <ThemeProvider
          theme={store.getState().darkMode === "light" ? lightTheme : darkTheme}
        >
          <>
            <GlobalStyles />
            <div className="App">
              <button onClick={this.themeToggler}>Switch Theme</button>
              <Router>
                <div>
                  <Navbar auth={authProps} />
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={(props) => <Home {...props} auth={authProps} />}
                    />
                    <Route
                      exact
                      path="/products"
                      render={(props) => (
                        <Products {...props} auth={authProps} />
                      )}
                    />
                    <Route
                      exact
                      path="/admin"
                      render={(props) => (
                        <ProductAdmin {...props} auth={authProps} />
                      )}
                    />
                    <Route
                      exact
                      path="/login"
                      render={(props) => <LogIn {...props} auth={authProps} />}
                    />
                    <Route
                      exact
                      path="/register"
                      render={(props) => (
                        <Register {...props} auth={authProps} />
                      )}
                    />
                    <Route
                      exact
                      path="/forgotpassword"
                      render={(props) => (
                        <ForgotPassword {...props} auth={authProps} />
                      )}
                    />
                    <Route
                      exact
                      path="/forgotpasswordverification"
                      render={(props) => (
                        <ForgotPasswordVerification
                          {...props}
                          auth={authProps}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/changepassword"
                      render={(props) => (
                        <ChangePassword {...props} auth={authProps} />
                      )}
                    />
                    <Route
                      exact
                      path="/changepasswordconfirmation"
                      render={(props) => (
                        <ChangePasswordConfirm {...props} auth={authProps} />
                      )}
                    />

                    {charPage}

                    <Route
                      exact
                      path="/welcome"
                      render={(props) => (
                        <Welcome {...props} auth={authProps} />
                      )}
                    />
                  </Switch>
                </div>
              </Router>
            </div>
          </>
        </ThemeProvider>
      )
    );
  }
}

export default App;
