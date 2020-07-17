import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../style.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default class LoginHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginError: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;

    let loginData = new FormData();
    loginData.append("email", email);
    loginData.append("password", password);

    axios
      .post("http://localhost/planner-backend/login.php", loginData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === "logged in") {
          this.props.handleSuccessfulAuth(response.data);
        } else {
          this.setState({ password: "", loginError: true });
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
  }

  render() {
    const error = this.state.loginError;
    return (
      <div>
        <form
          className="form-group login-form"
          align="center"
          onSubmit={this.handleSubmit}
        >
          <input
            type="email"
            className="form-control login-input"
            id="login-email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            className={
              "form-control login-input" + (error ? " is-invalid" : "")
            }
            name="password"
            id="login-password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-light mr-2">
            Login
          </button>
          <Link to="/register">
            <button type="button" className="btn btn-dark ml-1">
              Register
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
