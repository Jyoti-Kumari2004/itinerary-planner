import { useState } from "react";
import TripForm from "./components/TripForm";
import ItineraryCard from "./components/ItineraryCard";
import MapView from "./components/MapView";

function App() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>TripAI</h1>
        <p style={styles.tagline}>AI-powered itinerary planner</p>
      </header>

      <main style={styles.main}>
        <div style={styles.left}>
          <TripForm onItineraryReceived={setItinerary} onLoading={setLoading} />
        </div>

        <div style={styles.right}>
          {loading && (
            <div style={styles.loading}>Generating your itinerary...</div>
          )}

          {itinerary && !loading && (
            <>
              <h2 style={styles.resultTitle}>
                Your {itinerary.days.length}-Day {itinerary.destination}{" "}
                Itinerary
              </h2>
              <MapView itinerary={itinerary} />
              {itinerary.days.map((day) => (
                <ItineraryCard key={day.day} day={day} />
              ))}
            </>
          )}

          {!itinerary && !loading && (
            <div style={styles.empty}>
              Fill in the form to generate your itinerary
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4f8",
  },
  header: {
    background: "#4f46e5",
    color: "#fff",
    padding: "20px 40px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "700",
  },
  tagline: {
    fontSize: "14px",
    opacity: 0.8,
  },
  main: {
    display: "flex",
    gap: "24px",
    padding: "32px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  left: {
    flexShrink: 0,
  },
  right: {
    flex: 1,
  },
  loading: {
    textAlign: "center",
    padding: "60px",
    color: "#4f46e5",
    fontSize: "16px",
    fontWeight: "500",
  },
  empty: {
    textAlign: "center",
    padding: "60px",
    color: "#a0aec0",
    fontSize: "15px",
  },
  resultTitle: {
    fontSize: "20px",
    color: "#2d3748",
    marginBottom: "16px",
  },
};

export default App;
