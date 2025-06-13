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
          <img src="/main-logo.png" alt="CuddleScribe Logo" style={{ height: 60, width: 60, objectFit: 'contain', display: 'block', borderRadius: "5px" }} />
          <span style={{ fontWeight: 700, fontSize: 24, color: '#2D3748', lineHeight: 1 }}>CuddleScribe</span>
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
