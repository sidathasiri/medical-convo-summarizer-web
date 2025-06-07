export const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F7FAFC",
  },
  header: {
    padding: "1rem",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2D3748",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "2rem auto",
    padding: "2rem",
  },
  welcomeSection: {
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "2rem",
    marginBottom: "2rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  welcomeTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: "1rem",
  },
  recordingSection: {
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "2rem",
    marginBottom: "2rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  recordingHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  recordingTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#2D3748",
  },
  recordingStatus: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  statusIndicator: (isRecording: boolean) => ({
    width: "0.75rem",
    height: "0.75rem",
    borderRadius: "50%",
    backgroundColor: isRecording ? "#48BB78" : "#E53E3E",
  }),
  transcriptionContent: {
    backgroundColor: "#F7FAFC",
    borderRadius: "0.5rem",
    padding: "1.5rem",
    marginTop: "1rem",
    maxHeight: "400px",
    overflowY: "auto" as const,
  },
  transcriptionText: {
    whiteSpace: "pre-wrap" as const,
    lineHeight: "1.6",
    color: "#4A5568",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  primaryButton: {
    backgroundColor: "#667EEA",
    color: "white",
    "&:hover": {
      backgroundColor: "#5A67D8",
    },
  },
  secondaryButton: {
    backgroundColor: "#E2E8F0",
    color: "#4A5568",
    "&:hover": {
      backgroundColor: "#CBD5E0",
    },
  },
  dangerButton: {
    backgroundColor: "#E53E3E",
    color: "white",
    "&:hover": {
      backgroundColor: "#C53030",
    },
  },
  infoSection: {
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "2rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginTop: "1rem",
  },
  infoCard: {
    padding: "1.5rem",
    backgroundColor: "#F7FAFC",
    borderRadius: "0.5rem",
    border: "1px solid #E2E8F0",
  },
  infoTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: "0.5rem",
  },
  infoText: {
    color: "#4A5568",
    fontSize: "0.875rem",
  },
};
