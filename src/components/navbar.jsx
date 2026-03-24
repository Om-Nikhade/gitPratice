import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "15px", background: "#222", color: "white" }}>
      <h2>RouteWise</h2>

      <Link to="/" style={{ marginRight: "20px", color: "white" }}>
        Home
      </Link>

      <Link to="/plan" style={{ color: "white" }}>
        Plan Trip
      </Link>
    </nav>
  );
}

export default Navbar;