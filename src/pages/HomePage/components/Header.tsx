import { styles } from "../HomePage.styles";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

interface HeaderProps {
  email: string;
  onSignOut: () => void;
}

export const Header = ({ email, onSignOut }: HeaderProps) => {
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/logo.png" alt="MediScribe Logo" style={{ height: 40, width: 40, objectFit: 'contain', display: 'block', borderRadius: "5px" }} />
          <span style={{ fontWeight: 700, fontSize: 24, color: '#2D3748', lineHeight: 1 }}>MediScribe</span>
        </div>
        <div style={styles.userInfo}>
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <FaUserCircle />
            {email}
          </span>
          <button
            onClick={onSignOut}
            style={{
              ...styles.button,
              ...styles.dangerButton,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FaSignOutAlt />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
