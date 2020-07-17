import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../style.css";
import SessionsList from "../components/session/SessionsList";

export default function SessionsPage({ userData }) {
  return (
    <div>
      <div className="app-page">
        <div className="app-page-title text-center">Sessions Page</div>
        <SessionsList userData={userData} />
      </div>
    </div>
  );
}
