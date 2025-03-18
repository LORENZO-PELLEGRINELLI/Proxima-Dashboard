import React from "react";
import { Wifi } from "lucide-react";

import "./../../style/App.css";
// Component for WiFi status visualization
const WifiStatus = ({ wifiStrength }) => {
  // Calculate signal quality as a percentage (typical range: -30dBm (excellent) to -90dBm (poor))
  const signalQuality = Math.max(
    0,
    Math.min(100, (wifiStrength + 90) * (100 / 60))
  );

  return (
    <div className="dashboard-card wifi-card">
      <div className="card-header">
        <Wifi className="card-icon" />
        <h2>WiFi Status</h2>
      </div>
      <div className="card-content">
        <div className="wifi-info">
          <span className="signal-value">{wifiStrength} dBm</span>
          <div className="signal-meter">
            <div className="signal-bars">
              <div
                className={`bar ${signalQuality > 20 ? "active" : ""}`}
              ></div>
              <div
                className={`bar ${signalQuality > 40 ? "active" : ""}`}
              ></div>
              <div
                className={`bar ${signalQuality > 60 ? "active" : ""}`}
              ></div>
              <div
                className={`bar ${signalQuality > 80 ? "active" : ""}`}
              ></div>
            </div>
            <span className="signal-quality">
              {signalQuality > 80
                ? "Excellent"
                : signalQuality > 60
                ? "Good"
                : signalQuality > 40
                ? "Fair"
                : signalQuality > 20
                ? "Poor"
                : "Very Poor"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WifiStatus;
