import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../style.css";
import axios from "axios";

export default class WelcomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: "",
      greets: {
        "We were expecting you, ": ".",
        "Welcome, ": "!",
        "Planning something, ": "?",
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .get("http://localhost/planner-backend/logout.php", {
        withCredentials: true,
      })
      .then((response) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  }

  componentDidMount() {
    this.setGreet();
  }

  setGreet() {
    const lengthOfGreets = Object.keys(this.state.greets).length;
    const positionInGreets = Math.floor(Math.random() * lengthOfGreets);
    const greet = Object.keys(this.state.greets)[positionInGreets];
    const punctuation = this.state.greets[
      Object.keys(this.state.greets)[positionInGreets]
    ];

    this.setState({
      greeting: greet + this.props.userData["user_first"] + punctuation,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-group greet-logout">
        <div className="text-light d-inline pr-2 mt-1 greet-text">
          {this.state.greeting}
        </div>
        <button
          type="submit"
          className="btn btn-light btn-outline-dark d-inline"
        >
          Logout
        </button>
      </form>
    );
  }
}
