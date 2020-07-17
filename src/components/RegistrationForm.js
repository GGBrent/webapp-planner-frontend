import React, { Component } from "react";
import "../style.css";
import axios from "axios";

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      errors: [],
    };
    this.state = this.initialState;
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

    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    } = this.state;

    let registerData = new FormData();
    registerData.append("firstName", firstName);
    registerData.append("lastName", lastName);
    registerData.append("email", email);
    registerData.append("password", password);
    registerData.append("passwordConfirm", passwordConfirm);

    axios
      .post("http://localhost/planner-backend/register.php", registerData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === "success") {
          this.props.handleSuccessfulAuth(response.data);
        } else {
          let errorMessages = [];
          response.data.map((error) => errorMessages.push(error));
          this.setState({ errors: errorMessages });
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  }

  handleSuccess(data) {
    this.setState(this.initialState);
    this.props.handleSuccessfulAuth(data);
  }

  render() {
    const invalid_email = this.state.errors.includes("invalid email");
    const email_taken = this.state.errors.includes("email in use");
    const passwords_no_match = this.state.errors.includes(
      "passwords do not match"
    );

    return (
      <div>
        <div className="card register-form border border-secondary d-inline-block">
          <div className="card-header">Create an Account</div>
          <form className="card-body" onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="register-first">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="register-first"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group col">
                <label htmlFor="register-last">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="register-last"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="register-email">Email address</label>
              <input
                type="email"
                className={
                  "form-control" +
                  (invalid_email || email_taken ? " is-invalid" : "")
                }
                id="register-email"
                placeholder="example@email.com"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {invalid_email && (
                <div className="invalid-feedback">Invalid email format</div>
              )}
              {email_taken && (
                <div className="invalid-feedback">Email already in use</div>
              )}
              <small id="emailHelp" className="form-text text-muted">
                We will never share your email with anyone else.
              </small>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="register-password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="register-password"
                  required
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="register-password-confirm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={
                    "form-control" + (passwords_no_match ? " is-invalid" : "")
                  }
                  name="passwordConfirm"
                  id="register-password-confirm"
                  value={this.state.passwordConfirm}
                  onChange={this.handleChange}
                />
                {passwords_no_match && (
                  <div className="invalid-feedback">
                    Password does not match
                  </div>
                )}
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
