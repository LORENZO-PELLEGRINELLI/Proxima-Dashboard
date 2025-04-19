import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Zap, Compass, Monitor, Sun, Moon, Wifi } from "lucide-react";

//components
import MovementStatus from "./components/organism/MovementStatus";
import SensorData from "./components/organism/SensorData";
import WifiStatus from "./components/organism/WifiStatus";

// Component to display connection status
function ConnectionStatus({ isConnected }) {
  return (
    <div
      className={`connection-badge ${
        isConnected ? "connected" : "disconnected"
      }`}
    >
      <span className="status-indicator"></span>
      {isConnected ? "Connected" : "Disconnected"}
    </div>
  );
}

function App() {
  // State variables
  const [robotData, setRobotData] = useState({
    distance: 0,
    irLeft: 1,
    irRight: 1,
    movement: "🛑 Stopped",
    speed: 0,
    wifiStrength: -65,
  });
  const [controlMode, setControlMode] = useState("manual");
  const [isConnected, setIsConnected] = useState(false);
  const [theme, setTheme] = useState("dark"); // New state for theme

  // Reference for handling repeated keyboard commands
  const commandIntervalRef = useRef(null);

  // Apply theme class to body
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Fetch robot data every 100ms
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.1.50/data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRobotData(data);
        setIsConnected(true);
      } catch (error) {
        console.error("Request error:", error);
        setIsConnected(false);
      }
    };

    const interval = setInterval(fetchData, 100);
    return () => clearInterval(interval);
  }, []);

  // Function to send a command to Arduino
  const sendCommand = async (command) => {
    try {
      await fetch(`http://192.168.1.50/command?cmd=${command}`);
    } catch (error) {
      console.error("Error sending command:", error);
    }
  };

  // Switch mode (autonomous / manual)
  const switchMode = async (mode) => {
    setControlMode(mode);
    try {
      await fetch(`http://192.168.1.50/command?mode=${mode}`);
    } catch (error) {
      console.error("Error changing mode:", error);
    }
  };

  // Handle keyboard events in manual mode
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (controlMode !== "manual") return;
      let command = "";
      switch (event.key) {
        case "ArrowUp":
          command = "forward";
          break;
        case "ArrowDown":
          command = "backward";
          break;
        case "ArrowLeft":
          command = "right";
          break;
        case "ArrowRight":
          command = "left";
          break;
        default:
          return;
      }
      if (!commandIntervalRef.current) {
        sendCommand(command);
        commandIntervalRef.current = setInterval(() => {
          sendCommand(command);
        }, 100);
      }
    };

    const handleKeyUp = (event) => {
      if (controlMode !== "manual") return;
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
      ) {
        if (commandIntervalRef.current) {
          clearInterval(commandIntervalRef.current);
          commandIntervalRef.current = null;
        }
        sendCommand("stop");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [controlMode]);

  // Render the manual control panel
  const renderManualControlPanel = () => {
    if (controlMode !== "manual") return null;

    return (
      <div className="manual-control-panel">
        <h2>Manual Control</h2>
        <div className="control-description">
          Use the buttons below or arrow keys on your keyboard
        </div>

        <div className="control-pad">
          <button
            className="control-button up-button"
            onMouseDown={() => sendCommand("forward")}
            onMouseUp={() => sendCommand("stop")}
            onTouchStart={() => sendCommand("forward")}
            onTouchEnd={() => sendCommand("stop")}
          >
            ▲
          </button>

          <div className="middle-row">
            <button
              className="control-button left-button"
              onMouseDown={() => sendCommand("left")}
              onMouseUp={() => sendCommand("stop")}
              onTouchStart={() => sendCommand("left")}
              onTouchEnd={() => sendCommand("stop")}
            >
              ◄
            </button>

            <button
              className="control-button stop-button"
              onClick={() => sendCommand("stop")}
            >
              ■
            </button>

            <button
              className="control-button right-button"
              onMouseDown={() => sendCommand("right")}
              onMouseUp={() => sendCommand("stop")}
              onTouchStart={() => sendCommand("right")}
              onTouchEnd={() => sendCommand("stop")}
            >
              ►
            </button>
          </div>

          <button
            className="control-button down-button"
            onMouseDown={() => sendCommand("backward")}
            onMouseUp={() => sendCommand("stop")}
            onTouchStart={() => sendCommand("backward")}
            onTouchEnd={() => sendCommand("stop")}
          >
            ▼
          </button>
        </div>

        <div className="keyboard-hint">
          You can also use your keyboard arrow keys
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="title-section">
            <Monitor className="dashboard-icon" />
            <h1>Proxima Control Dashboard</h1>
          </div>
          <div className="header-controls">
            {/* Theme toggle button */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <ConnectionStatus isConnected={isConnected} />
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Top row with WiFi status, mode selector, and manual control panel */}
        <div className="top-controls">
          {/* WiFi component positioned to the left */}
          <div className="wifi-status-top">
            <WifiStatus wifiStrength={robotData.wifiStrength} />
          </div>

          <div className="mode-selector">
            <button
              className={`mode-button ${
                controlMode === "autonomous" ? "active" : ""
              }`}
              onClick={() => switchMode("autonomous")}
              disabled={controlMode === "autonomous"}
            >
              <Zap className="button-icon" />
              Autonomous Mode
            </button>
            <button
              className={`mode-button ${
                controlMode === "manual" ? "active" : ""
              }`}
              onClick={() => switchMode("manual")}
              disabled={controlMode === "manual"}
            >
              <Compass className="button-icon" />
              Manual Mode
            </button>
          </div>

          {/* Command console moved to top right */}
          <div className="top-right-control">{renderManualControlPanel()}</div>
        </div>

        {/* Main components area */}
        <div className="components-grid">
          <SensorData
            distance={robotData.distance}
            irLeft={robotData.irLeft}
            irRight={robotData.irRight}
          />
          <MovementStatus
            movement={robotData.movement}
            speed={robotData.speed}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
