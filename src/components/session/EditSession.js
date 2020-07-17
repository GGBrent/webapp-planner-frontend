import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../style.css";
import SessionForm from "./SessionForm";
import SideMenu from "../SideMenu";

export default class EditSession extends Component {
  state = this.props.history.location.state;

  render() {
    return (
      <div>
        <SideMenu />
        <SessionForm
          state={this.state}
          userData={this.state.userData}
          resetFields={false}
          method="edit"
          formTitle="Edit Session"
          formAlert="Your Session has been updated."
          formButton="Update Session"
        />
      </div>
    );
  }
}
