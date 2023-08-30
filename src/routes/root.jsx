import { Outlet, Link } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>Forex Calendar</h1>
          <nav>
            <ul>
            <li>
                <Link to={`/`}>Dashboard</Link>
              </li>
              <li>
                <Link to={`/calendar`}>Calendar</Link>
              </li>
              <li>
                <Link to={`/trend-analize`}>Trend analize</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail"><Outlet /></div>
      </>
    );
  }