import React from "react";
import { Activity } from "lucide-react";

import "./../../style/App.css";

// Component for movement status visualization
const MovementStatus = ({ movement, speed }) => {
  return (
    <div className="dashboard-card movement-card">
      <div className="card-header">
        <Activity className="card-icon" />
        <h2>Movement</h2>
      </div>
      <div className="card-content">
        <div className="movement-info">
          <div className="current-status">
            <span className="status-label">Status</span>
            <span className="movement-value">{movement}</span>
          </div>

          <div className="speed-display">
            <span className="status-label">Speed</span>
            <div className="speed-gauge">
              <div className="speed-value">{speed}%</div>
              <div className="speed-bar">
                <div
                  className="speed-indicator"
                  style={{ width: `${speed}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovementStatus;
