import React, { Component } from "react";
import { Auth } from "aws-amplify";
import store from "../store";
import * as ActionConstructer from "../actions/ActionConstructer";
// {this.props.auth.isAuthenticated && this.props.auth.user && (
// )}

export default class Navbar extends Component {
  handleLogOut = async (event) => {
    event.preventDefault();
    Auth.signOut();
    store.dispatch(ActionConstructer.setIsLogged(false));
    this.props.auth.setAuthStatus(false);
    this.props.auth.setUser(null);
  };

  render() {
    var chartPage;
    if (store.getState().Logged) {
      chartPage = (
        <a href="/chart" className="navbar-item">
          bruger data
        </a>
      );
    } else chartPage = "";

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <h1> HangIT </h1>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            {chartPage}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>Hello {this.props.auth.user.username}</p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <a
                    href="/"
                    onClick={this.handleLogOut}
                    className="button is-light"
                  >
                    Log out
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
