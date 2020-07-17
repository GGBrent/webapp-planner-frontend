import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../style.css";
import SessionsList from "../components/session/SessionsList";

export default function AttendingSessionsPage({ userData }) {
  return (
    <div>
      <div className="app-page">
        <div className="app-page-title text-center">
          Sessions you are Attending
        </div>
        <SessionsList userData={userData} filterSetting="attending sessions" />
      </div>
    </div>
  );
}
