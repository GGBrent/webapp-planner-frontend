import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../style.css";
import LoginHeader from "./LoginHeader";
import WelcomeHeader from "./WelcomeHeader";
import { Link } from "react-router-dom";

export default function Header({
  loggedOn,
  handleLogout,
  handleSuccessfulAuth,
  userData,
}) {
  return (
    <div>
      <div className="border border-dark navbar navbar-expand-lg navbar-dark navbar-main">
        <div className="navbar-planner-title">
          <Link to="/">
            <img
              src={require("../assets/icons/planner-32.png")}
              className="pr-2 pb-2 pl-1"
              alt="Planner"
            />
          </Link>
          <Link to="/" className="navbar-brand navbar-planner-text">
            Session Planner
          </Link>
        </div>
        {!loggedOn ? (
          <LoginHeader handleSuccessfulAuth={handleSuccessfulAuth} />
        ) : (
          <WelcomeHeader handleLogout={handleLogout} userData={userData} />
        )}
      </div>
    </div>
  );
}
