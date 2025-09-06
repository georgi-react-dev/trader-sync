import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaTimesCircle } from "react-icons/fa";
function Sidebar({ show }) {
  const [showSidebar, setShowSidebar] = React.useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      {!showSidebar ? (
        <span
          style={{
            position: "absolute",
            left: ".5rem",
            padding: 0,
            top: ".5rem",
          }}
          onClick={() => setShowSidebar(true)}
        >
          <FiMenu size={"1.5rem"} cursor={"pointer"} />
        </span>
      ) : (
        <div id="sidebar" style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              right: ".5rem",
              padding: 0,
              top: ".5rem",
            }}
            onClick={() => setShowSidebar(false)}
          >
            <FaTimesCircle size={"1.2rem"} cursor={"pointer"} color="#888" />
          </span>
          <h1 data-testid="sidebar-title">Trader Sync</h1>
          <nav>
            <ul>
              <li>
                <Link to={`/dashboard`}>Dashboard</Link>
              </li>
              <li>
                <Link data-testid="to-calendar" to={`/calendar`}>
                  Calendar
                </Link>
              </li>
              <li>
                <Link to={`/size-calculator`}>Size Calculator</Link>
              </li>
              <br />
              <li>
                <Link to={`/trend-analize`}>Trend analize</Link>
              </li>
              <br />
              <li>
                <Link
                  to="/"
                  style={{ color: "red" }}
                  data-testid="logout-btn"
                  onClick={() => handleLogout()}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default Sidebar;
