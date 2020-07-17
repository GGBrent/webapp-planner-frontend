import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Session extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  state = {
    submitType: "",
    session: this.props.session,
    attending: false,
    numAttending: 0,
  };

  componentDidMount() {
    this.handleAttending();
  }

  async handleButtonClick(event) {
    await this.setState({ submitType: event.target.name });
    this.handleSubmit();
  }

  handleNumAttended = () => {
    const attendees = this.state.session["attendees"];
    if (attendees) {
      const numAttending = attendees.split(",").length;
      this.setState({ numAttending });
    } else {
      this.setState({ numAttending: 0 });
    }
  };

  handleSubmit = () => {
    let sessionData = new FormData();
    sessionData.append("submitType", this.state.submitType);
    sessionData.append("session_id", this.state.session["session_id"]);
    sessionData.append("user_id", this.props.userData["user_id"]);

    axios
      .post(
        "http://localhost/planner-backend/session_handler.php",
        sessionData,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (this.state.submitType === "delete") {
          this.props.handleDelete(this.state.session["session_id"]);
        } else if (this.state.submitType === "edit") {
          this.props.handleEdit(this.state.session["session_id"]);
        } else {
          this.setState({ session: response.data });
          this.handleAttending();
        }
      })
      .catch((error) => {
        console.log("session access error", error);
      });
  };

  handleAttending = () => {
    const attendees = this.state.session["attendees"];
    if (attendees) {
      const attendeesList = attendees.split(",");
      if (attendeesList.includes(this.props.userData["user_id"])) {
        this.setState({ attending: true });
      } else this.setState({ attending: false });
    } else this.setState({ attending: false });
    this.handleNumAttended();
  };

  render() {
    const session = this.state.session;

    const numAttendingBadgeClass =
      "badge " +
      (this.state.numAttending > 0 ? "badge-primary" : "badge-secondary");

    const datetimeFormat = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const fromDate = new Date(session["start_datetime"]).toLocaleString(
      [],
      datetimeFormat
    );
    const toDate = new Date(session["end_datetime"]).toLocaleString(
      [],
      datetimeFormat
    );

    const buttonScheme =
      this.props.userData["user_id"] === session["author_id"] ? (
        <div className="mt-3">
          <Link
            type="button"
            className="btn btn-outline-primary font-weight-bold mx-2"
            name="edit"
            to={{
              pathname: "/app/edit-session",
              state: {
                title: session["title"],
                description: session["description"],
                fromDate: new Date(session["start_datetime"]),
                toDate: new Date(session["end_datetime"]),
                hasSubmitted: false,
                userData: this.props.userData,
                sessionID: session["session_id"],
              },
            }}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-outline-danger font-weight-bold"
            name="delete"
            onClick={this.handleButtonClick}
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-outline-primary font-weight-bold mx-2"
            name="attend"
            onClick={this.handleButtonClick}
            disabled={this.state.attending}
          >
            Attend
          </button>
          <button
            type="button"
            className="btn btn-outline-danger font-weight-bold"
            name="leave"
            onClick={this.handleButtonClick}
            disabled={!this.state.attending}
          >
            Leave
          </button>
        </div>
      );

    return (
      <div>
        <div className="card-header d-flex justify-content-between pt-3 pb-2">
          <h4>{session["title"]}</h4>
          <h5 className="mt-1">
            Attendees:{" "}
            <span className={numAttendingBadgeClass}>
              {this.state.numAttending}
            </span>
          </h5>
        </div>
        <div className="card-body">
          <h6 className="card-title">Posted by: {session["author"]}</h6>
          <h6 className="card-text pt-3 mb-0">Description:</h6>
          <small>{session["description"]}</small>
        </div>
        <div className="card-footer pb-2 pt-1 d-flex justify-content-between">
          <div>
            <small>Start time: {fromDate}</small>
            <br />
            <small>End time: {toDate}</small>
          </div>

          {buttonScheme}
        </div>
      </div>
    );
  }
}
