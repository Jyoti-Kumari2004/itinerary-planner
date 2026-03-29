import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// fix default marker icon broken in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView({ itinerary }) {
  // collect all activities across all days
  const allActivities = itinerary.days.flatMap((day) =>
    day.activities.map((act) => ({ ...act, day: day.day })),
  );

  const center = [allActivities[0].lat, allActivities[0].lng];

  return (
    <div style={styles.wrapper}>
      <MapContainer center={center} zoom={13} style={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {allActivities.map((activity, index) => (
          <Marker key={index} position={[activity.lat, activity.lng]}>
            <Popup>
              <strong>
                Day {activity.day} — {activity.time}
              </strong>
              <br />
              {activity.place}
              <br />
              <span style={{ fontSize: "12px", color: "#666" }}>
                {activity.description}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

const styles = {
  wrapper: {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    marginBottom: "24px",
  },
  map: {
    height: "380px",
    width: "100%",
  },
};

export default MapView;
