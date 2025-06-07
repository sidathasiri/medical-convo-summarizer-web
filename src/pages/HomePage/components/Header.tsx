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
        <div style={styles.logo}>MediScribe</div>
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
