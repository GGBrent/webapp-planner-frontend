import React, { Component } from "react";
import "../../style.css";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";

const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 2000;

function handleTimezone(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}

export default class SessionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.state.title,
      description: this.props.state.description,
      fromDate: this.props.state.fromDate,
      toDate: this.props.state.toDate,
      hasSubmitted: false,
      userData: this.props.userData,
    };
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFromDate = (date) => {
    this.setState({ fromDate: date });
  };

  handleToDate = (date) => {
    this.setState({ toDate: date });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, fromDate, toDate } = this.state;
    const author =
      this.state.userData["user_first"] +
      " " +
      this.state.userData["user_last"];
    const author_id = this.props.userData["user_id"];

    let sessionData = new FormData();
    sessionData.append("author", author);
    sessionData.append("authorID", author_id);
    sessionData.append("title", title);
    sessionData.append("description", description);
    sessionData.append("session_id", this.props.state.sessionID);
    sessionData.append("fromDate", handleTimezone(fromDate).toISOString());
    sessionData.append("toDate", handleTimezone(toDate).toISOString());
    sessionData.append("method", this.props.method);

    axios
      .post(
        "http://localhost/planner-backend/session_handler.php",
        sessionData,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.handleSuccess();
      })
      .catch((error) => {
        console.log("session edit error");
      });
  };

  handleSuccess = () => {
    if (this.props.resetFields) {
      this.setState(() => ({ title: "", description: "" }));
    }
    this.setState(() => ({
      fromDate: new Date(),
      toDate: new Date(),
      hasSubmitted: true,
    }));
  };

  render() {
    return (
      <div className="app-page">
        {this.state.hasSubmitted && (
          <div className="alert alert-success text-center">
            {this.props.formAlert}
          </div>
        )}
        <div className="card create-session-form border border-secondary">
          <div className="card-header text-center">
            <h2>{this.props.formTitle}</h2>
          </div>
          <form className="form-group card-body" onSubmit={this.handleSubmit}>
            <label htmlFor="input-title">Title:</label>
            <input
              type="text"
              className="form-control"
              id="input-title"
              name="title"
              required
              value={this.state.title}
              onChange={this.handleInput}
              maxLength={MAX_TITLE_LENGTH}
            />
            <small id="input-title-chars" className="form-text text-muted">
              {MAX_TITLE_LENGTH - this.state.title.length} characters left
            </small>
            <br />
            <label htmlFor="input-description">Description:</label>
            <textarea
              className="form-control"
              id="input-description"
              rows="6"
              name="description"
              required
              value={this.state.description}
              onChange={this.handleInput}
              maxLength={MAX_DESCRIPTION_LENGTH}
            />
            <small
              id="input-description-chars"
              className="form-text text-muted"
            >
              {MAX_DESCRIPTION_LENGTH - this.state.description.length}{" "}
              characters left
            </small>
            <div className="text-center">
              <label htmlFor="input-time-from">From:</label>
              <DateTimePicker
                className="card-body"
                clearIcon={null}
                calendarIcon={null}
                disableClock={true}
                disableCalendar={true}
                format="MMMM d, yyyy h:mm aa"
                maxDate={this.state.toDate}
                onChange={this.handleFromDate}
                value={this.state.fromDate}
                id="input-time-from"
              />
              <label htmlFor="input-time-to">To:</label>
              <DateTimePicker
                className="card-body"
                clearIcon={null}
                calendarIcon={null}
                disableClock={true}
                disableCalendar={true}
                format="MMMM d, yyyy h:mm aa"
                minDate={this.state.fromDate}
                onChange={this.handleToDate}
                value={this.state.toDate}
                id="input-time-to"
              />
            </div>
            <div className="text-center pt-2">
              <button type="submit" className="btn btn-primary btn-lg">
                {this.props.formButton}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
