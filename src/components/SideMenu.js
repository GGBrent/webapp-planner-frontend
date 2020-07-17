import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../style.css";
import { NavLink } from "react-router-dom";

export default function SideMenu() {
  return (
    <div className="sidenav bg-dark">
      <NavLink to="/app/sessions">Sessions Page</NavLink>
      <NavLink to="/app/create-session">Create Session</NavLink>
      <NavLink to="/app/my-sessions">My Sessions</NavLink>
      <NavLink to="/app/attending-sessions">Attending Sessions</NavLink>
    </div>
  );
}
