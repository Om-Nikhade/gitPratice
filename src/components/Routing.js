import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

function Routing({ start, destination, setRoutePoints }) {

  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {

    if (!start || !destination) return;

    // remove previous route safely
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    const control = L.Routing.control({
      waypoints: [
        L.latLng(start.lat, start.lng),
        L.latLng(destination.lat, destination.lng)
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      createMarker: () => null,

      lineOptions: {
        styles: [{ color: "#007bff", weight: 5 }]
      }

    }).addTo(map);

    routingRef.current = control;

    control.on("routesfound", function (e) {

      const coords = e.routes[0].coordinates;

      const sampled = coords.filter((_, i) => i % 40 === 0);

      setRoutePoints(sampled);

    });

    // cleanup when component re-renders
    return () => {
      if (routingRef.current) {
        try {
          map.removeControl(routingRef.current);
        } catch (err) {}
        routingRef.current = null;
      }
    };

  }, [start, destination, map, setRoutePoints]);

  return null;
}

export default Routing;