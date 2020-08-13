import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav>
      <ul className="flex content-between flex-wrap">
        <li className="p-3">
          <Link to="/">Home</Link>
        </li>
        <li className="p-3">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="p-3">
          <Link to="/properties">Properties</Link>
        </li>
        <li className="p-3">
          <Link to="/users">Users</Link>
        </li>
        <li className="p-3">
          <Link to="/my-account">My Account</Link>
        </li>
        <li className="p-3">
          <Link to="/auth-debugger">Auth Debugger</Link>
        </li>
      </ul>
    </nav>
  );
}
