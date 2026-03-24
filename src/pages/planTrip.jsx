import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Routing from "../components/Routing";
import Places from "../components/Places";

function PlanTrip() {

  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");

  const [startCoords, setStartCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);

  const geocode = async (place) => {

    try {

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
      );

      const data = await response.json();

      if (!data || data.length === 0) {
        alert("Location not found");
        return null;
      }

      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };

    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Error fetching location");
      return null;
    }
  };

  const handleSubmit = async () => {

    if (!start || !destination) {
      alert("Please enter both locations");
      return;
    }

    const startLocation = await geocode(start);
    const destLocation = await geocode(destination);

    if (!startLocation || !destLocation) return;

    console.log("Start:", startLocation);
    console.log("Destination:", destLocation);

    setStartCoords(startLocation);
    setDestCoords(destLocation);

    // clear old route data
    setRoutePoints([]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>

      <h2>Plan Your Trip</h2>

      <input
        type="text"
        placeholder="Start Location"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Find Route
      </button>

      <br /><br />

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "500px", width: "85%", margin: "auto" }}
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {startCoords && destCoords && (
          <Routing
            start={startCoords}
            destination={destCoords}
            setRoutePoints={(points) => {
              console.log("Route Points:", points);
              setRoutePoints(points);
            }}
          />
        )}

        {routePoints.length > 0 && (
          <Places routePoints={routePoints} />
        )}

      </MapContainer>

    </div>
  );
}

export default PlanTrip;