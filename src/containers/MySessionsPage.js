import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../style.css";
import SessionsList from "../components/session/SessionsList";

export default function MySessionsPage({ userData }) {
  return (
    <div>
      <div className="app-page">
        <div className="app-page-title text-center">Your Created Sessions</div>
        <SessionsList userData={userData} filterSetting="user sessions" />
      </div>
    </div>
  );
}
