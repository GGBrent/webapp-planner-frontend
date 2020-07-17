import React, { Component } from "react";
import "./App.css";

import Header from "./headers/Header";
import SessionsPage from "./containers/SessionsPage";
import FrontPage from "./containers/FrontPage";
import CreateSession from "./components/session/CreateSession";
import EditSession from "./components/session/EditSession";
import RegistrationForm from "./components/RegistrationForm";
import axios from "axios";
import Dashboard from "./components/Dashboard";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AttendingSessionsPage from "./containers/AttendingSessionsPage";
import MySessionsPage from "./containers/MySessionsPage";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      userData: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.handleLogin(data);
  }

  handleLogin(data) {
    this.setState({ isLoggedIn: true, userData: data });
  }

  handleLogout() {
    this.setState({ isLoggedIn: false, userData: {} });
  }

  checkLoginStatus() {
    axios
      .get("http://localhost/planner-backend/logged_in.php", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === "logged in") {
          this.handleLogin(response.data);
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    let header = (
      <Header
        loggedOn={this.state.isLoggedIn}
        handleLogout={this.handleLogout}
        handleSuccessfulAuth={this.handleSuccessfulAuth}
        userData={this.state.userData}
      />
    );
    if (!this.state.isLoggedIn) {
      return (
        <Router>
          {header}
          <div>
            <Route
              path="/register"
              exact
              render={(props) => (
                <RegistrationForm
                  {...props}
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                />
              )}
            />
            <Route path="/" exact component={FrontPage} />
            <Route path="/">
              <Redirect to="/" />
            </Route>
          </div>
        </Router>
      );
    }

    return (
      <Router>
        <div>
          {header}
          <Switch>
            <Route path="/register">
              <Redirect to="/" />
            </Route>
            <Route
              path={["/", "/app", "/app/sessions"]}
              exact
              render={(props) => (
                <Dashboard
                  {...props}
                  component={SessionsPage}
                  userData={this.state.userData}
                />
              )}
            />
            <Route
              path="/app/create-session"
              exact
              render={(props) => (
                <Dashboard
                  {...props}
                  component={CreateSession}
                  userData={this.state.userData}
                />
              )}
            />
            <Route
              path="/app/my-sessions"
              exact
              render={(props) => (
                <Dashboard
                  {...props}
                  component={MySessionsPage}
                  userData={this.state.userData}
                />
              )}
            />
            <Route
              path="/app/attending-sessions"
              exact
              render={(props) => (
                <Dashboard
                  {...props}
                  component={AttendingSessionsPage}
                  userData={this.state.userData}
                />
              )}
            />
            <Route path="/app/edit-session/" exact component={EditSession} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
