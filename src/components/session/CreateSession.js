import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../style.css";
import SessionForm from "./SessionForm";

export default class CreateSession extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      title: "",
      description: "",
      fromDate: new Date(),
      toDate: new Date(),
      hasSubmitted: false,
    };
    this.state = this.initialState;
  }

  handleSuccess = () => {
    this.setState(this.initialState);
    this.setState(() => ({
      fromDate: new Date(),
      toDate: new Date(),
      hasSubmitted: true,
    }));
  };

  render() {
    return (
      <div>
        <SessionForm
          state={this.state}
          userData={this.props.userData}
          resetFields={true}
          method="create"
          formTitle="Create Session"
          formAlert="Your session has been published. You may go to 'My Sessions' to view/edit it."
          formButton="Publish Session"
        />
      </div>
    );
  }
}
