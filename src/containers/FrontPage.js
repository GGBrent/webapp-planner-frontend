import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../style.css";
import { Link } from "react-router-dom";

export default function FrontPage({ isLoggedIn }) {
  return (
    <div>
      <div className="front-page jumbotron w-100 d-inline-block border border-secondary">
        <div className="container">
          <h3 className="display-4">
            Want to plan out a multi-sessioned program?
          </h3>
          <br />
          <p className="lead">
            Well how convenient, because this does just that.
          </p>
          <hr className="my-4" />
          <Link to="/register">
            <button type="button" className="btn btn-primary btn-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
