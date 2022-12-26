import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
const Sidebar = () => {
  return (
    <div id="sidebarSection">
      <ul>
        <li>
          <Link to="/admin/register">Add User</Link>
        </li>
        
        <li>
          <Link to="/">logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
