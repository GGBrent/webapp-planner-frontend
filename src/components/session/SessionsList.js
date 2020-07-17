import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../style.css";
import axios from "axios";
import Session from "./Session";

const USER_SESSIONS_FILTER = "user sessions";
const ATTENDING_SESSIONS_FILTER = "attending sessions";

export default class SessionsList extends Component {
  constructor(props) {
    super(props);
    this.handleGettingSessions = this.handleGettingSessions.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  state = {
    sessions: [],
  };

  componentDidMount() {
    this.handleGettingSessions();
  }

  handleGettingSessions() {
    axios
      .get("http://localhost/planner-backend/session_list.php", {
        withCredentials: true,
      })
      .then((response) => {
        let newSessions = [];
        response.data.forEach((element) => newSessions.push(element));
        this.setState({ sessions: newSessions });
        this.handleFilterByUserSession();
        this.handleFilterByAttending();
      })
      .catch((error) => {
        console.log("get session error", error);
      });
  }

  handleFilterByUserSession() {
    if (this.props.filterSetting === USER_SESSIONS_FILTER) {
      const newSessions = this.state.sessions.filter(
        (session) => session["author_id"] === this.props.userData["user_id"]
      );
      this.setState({ sessions: newSessions });
    }
  }

  handleFilterByAttending() {
    if (this.props.filterSetting === ATTENDING_SESSIONS_FILTER) {
      const newSessions = this.state.sessions.filter(
        (session) =>
          session["attendees"] &&
          session["attendees"].includes(this.props.userData["user_id"])
      );
      this.setState({ sessions: newSessions });
    }
  }

  handleDelete(id) {
    const newSessions = this.state.sessions.filter(
      (session) => session["session_id"] !== id
    );
    this.setState({ sessions: newSessions });
  }

  render() {
    const noSessions = this.state.sessions.length === 0;
    return (
      <div>
        {noSessions && (
          <div className="text-center">
            <br />
            No sessions to be found here. :(
          </div>
        )}
        {this.state.sessions.map((session) => (
          <div
            key={"card" + session["session_id"]}
            className="card create-session-form border border-secondary"
          >
            <Session
              key={"session" + session["session_id"]}
              session={session}
              userData={this.props.userData}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          </div>
        ))}
      </div>
    );
  }
}
