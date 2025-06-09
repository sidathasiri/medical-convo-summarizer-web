import { styles } from "../LandingPage.styles";
import { FaSignInAlt } from "react-icons/fa";

interface HeaderProps {
  onSignIn: () => void;
}

export const Header = ({ onSignIn }: HeaderProps) => {
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/logo.png" alt="MediScribe Logo" style={{ height: 40, width: 40, objectFit: 'contain', display: 'block', borderRadius: "5px" }} />
          <span style={{ fontWeight: 700, fontSize: 24, color: '#2D3748', lineHeight: 1 }}>MediScribe</span>
        </div>
        <button
          style={{
            ...styles.button,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onClick={onSignIn}
        >
          <FaSignInAlt />
          <span>Sign In</span>
        </button>
      </div>
    </header>
  );
};
