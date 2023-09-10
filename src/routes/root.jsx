import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
  FaTimesCircle,
  
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
export default function Root() {

  const {logout} = useAuth();
  const [showSidebar, setShowSidebar] = useState();
    return (
      <>
      
        {!showSidebar ? <span style={{position: 'absolute', left: '.5rem', padding: 0, top: '.5rem'}} onClick={() => setShowSidebar(true)}><FiMenu size={'1.5rem'} cursor={'pointer'}/></span> : <div id="sidebar" style={{position: 'relative'}}>
          <span style={{position: 'absolute', right: '.5rem', padding: 0, top: '.5rem'}} onClick={() => setShowSidebar(false)}><FaTimesCircle size={'1.2rem'} cursor={'pointer'} color="#888"/></span>
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
        </div>}
        <div id="detail"><Outlet /></div>
      </>
    );
  }