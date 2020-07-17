import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SideMenu from "./SideMenu";

export default class Dashboard extends Component {
  render() {
    const Component = this.props.component;
    return (
      <div>
        <SideMenu />
        <Component userData={this.props.userData} />
      </div>
    );
  }
}
