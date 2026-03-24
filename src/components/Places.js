import { useEffect, useState, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

function Places({ routePoints }) {

  const [places, setPlaces] = useState([]);
  const fetched = useRef(false);

  useEffect(() => {

    if (!routePoints || routePoints.length === 0) return;
    if (fetched.current) return;

    fetched.current = true;

    const fetchPlaces = async () => {

      let allPlaces = [];

      // use start, middle, end of route
      const selectedPoints = [
        routePoints[0],
        routePoints[Math.floor(routePoints.length / 2)],
        routePoints[routePoints.length - 1]
      ];

      for (const point of selectedPoints) {

        const query = `
        [out:json][timeout:25];
        (
          node["tourism"="attraction"](around:5000,${point.lat},${point.lng});
          node["tourism"="viewpoint"](around:5000,${point.lat},${point.lng});
          node["tourism"="museum"](around:5000,${point.lat},${point.lng});
          node["tourism"="gallery"](around:5000,${point.lat},${point.lng});
        );
        out;
        `;

        try {

          const response = await fetch(
            "https://overpass-api.de/api/interpreter",
            {
              method: "POST",
              body: query
            }
          );

          const text = await response.text();

          // Overpass sometimes returns XML if rate limited
          if (text.startsWith("<")) {
            console.log("Overpass rate limit reached");
            continue;
          }

          const data = JSON.parse(text);

          if (data.elements) {
            allPlaces = [...allPlaces, ...data.elements];
          }

          // wait to avoid rate limit
          await new Promise(res => setTimeout(res, 1500));

        } catch (err) {
          console.log("Overpass API error:", err);
        }
      }

      // remove duplicates
      const uniquePlaces = Array.from(
        new Map(allPlaces.map(place => [place.id, place])).values()
      );

      console.log("Tourist Places:", uniquePlaces);

      setPlaces(uniquePlaces);
    };

    fetchPlaces();

  }, [routePoints]);

  return (
    <>
      {places.map(place => {

        const icon = new L.Icon({
          iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        });

        return (
          <Marker
            key={place.id}
            position={[place.lat, place.lon]}
            icon={icon}
          >
            <Popup>
              <b>{place.tags?.name || "Tourist Attraction"}</b>
              <br />
              Category: {place.tags?.tourism}
            </Popup>
          </Marker>
        );

      })}
    </>
  );
}

export default Places;