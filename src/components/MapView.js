import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapView() {
  return (
    <MapContainer
      center={[18.5204, 73.8567]}
      zoom={6}
      style={{ height: "400px", width: "80%", margin: "auto" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[18.5204, 73.8567]}>
        <Popup>Pune</Popup>
      </Marker>

    </MapContainer>
  );
}

export default MapView;