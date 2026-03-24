import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>RouteWise</h1>
      <p>Plan your route and discover places on the way</p>

      <button onClick={() => navigate("/plan")}>
        Plan Your Trip
      </button>
    </div>
  );
}

export default Home;