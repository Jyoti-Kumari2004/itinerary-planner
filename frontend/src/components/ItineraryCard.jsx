function ItineraryCard({ day }) {
  return (
    <div style={styles.card}>
      <div style={styles.dayHeader}>
        <span style={styles.dayBadge}>Day {day.day}</span>
        <h3 style={styles.dayTitle}>{day.title}</h3>
      </div>

      <div style={styles.activities}>
        {day.activities.map((activity, index) => (
          <div key={index} style={styles.activity}>
            <span style={styles.time}>{activity.time}</span>
            <div style={styles.activityContent}>
              <p style={styles.place}>{activity.place}</p>
              <p style={styles.description}>{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    marginBottom: "16px",
  },
  dayHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  dayBadge: {
    background: "#4f46e5",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  dayTitle: {
    fontSize: "16px",
    color: "#2d3748",
  },
  activities: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  activity: {
    display: "flex",
    gap: "16px",
    paddingLeft: "8px",
    borderLeft: "3px solid #e2e8f0",
  },
  time: {
    fontSize: "12px",
    color: "#4f46e5",
    fontWeight: "600",
    minWidth: "70px",
    paddingTop: "2px",
  },
  activityContent: {
    flex: 1,
  },
  place: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#2d3748",
    marginBottom: "2px",
  },
  description: {
    fontSize: "13px",
    color: "#718096",
    lineHeight: "1.5",
  },
};

export default ItineraryCard;
