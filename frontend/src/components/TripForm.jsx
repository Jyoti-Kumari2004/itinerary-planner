import { useState } from "react";
import axios from "axios";

function TripForm({ onItineraryReceived, onLoading }) {
  const [form, setForm] = useState({
    destination: "",
    days: 2,
    interests: "",
    budget: "mid-range",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/itinerary/generate",
        form,
      );
      onItineraryReceived(response.data);
    } catch (error) {
      alert("Something went wrong. Is your backend running?");
      console.error(error);
    } finally {
      onLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Plan Your Trip</h2>

      <div style={styles.field}>
        <label style={styles.label}>Destination</label>
        <input
          style={styles.input}
          name="destination"
          placeholder="e.g. Paris, Tokyo, Goa"
          value={form.destination}
          onChange={handleChange}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Number of Days</label>
        <input
          style={styles.input}
          name="days"
          type="number"
          min="1"
          max="7"
          value={form.days}
          onChange={handleChange}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Interests</label>
        <input
          style={styles.input}
          name="interests"
          placeholder="e.g. food, history, hiking"
          value={form.interests}
          onChange={handleChange}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Budget</label>
        <select
          style={styles.input}
          name="budget"
          value={form.budget}
          onChange={handleChange}
        >
          <option value="budget">Budget</option>
          <option value="mid-range">Mid-range</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>

      <button style={styles.button} onClick={handleSubmit}>
        Generate Itinerary
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "420px",
  },
  title: {
    marginBottom: "20px",
    fontSize: "20px",
    color: "#2d3748",
  },
  field: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    color: "#4a5568",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
  },
};

export default TripForm;
