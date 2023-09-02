import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Root() {

  const {logout} = useAuth();

    return (
      <>
        <div id="sidebar">
          <h1>Trader Sync</h1>
          <nav>
            <ul>
            <li>
                <Link to={`/dashboard`}>Dashboard</Link>
              </li>
              <li>
                <Link to={`/calendar`}>Calendar</Link>
              </li>
              <li>
                <Link to={`/trend-analize`}>Trend analize</Link>
              </li>
              <br />
              <li>
                <Link style={{color:"red"}}onClick={logout}>Logout</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail"><Outlet /></div>
      </>
    );
  }