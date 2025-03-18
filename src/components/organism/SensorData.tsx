import React from "react";
import { Compass } from "lucide-react";

import "./../../style/App.css";

// Component for sensor data visualization
const SensorData = ({ distance, irLeft, irRight }) => {
  return (
    <div className="dashboard-card sensor-card">
      <div className="card-header">
        <Compass className="card-icon" />
        <h2>Sensors</h2>
      </div>
      <div className="card-content">
        <div className="sensor-value">
          <span className="sensor-label">Distance</span>
          <span className="sensor-reading">{distance.toFixed(1)} cm</span>
          <div className="sensor-bar">
            <div
              className="sensor-progress"
              style={{ width: `${Math.min(100, distance)}%` }}
            ></div>
          </div>
        </div>

        <div className="sensors-grid">
          <div className="ir-sensor">
            <span className="sensor-label">Left IR</span>
            <span className={`sensor-status ${irLeft ? "clear" : "blocked"}`}>
              {irLeft ? "Clear" : "Blocked"}
            </span>
          </div>

          <div className="ir-sensor">
            <span className="sensor-label">Right IR</span>
            <span className={`sensor-status ${irRight ? "clear" : "blocked"}`}>
              {irRight ? "Clear" : "Blocked"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorData;
