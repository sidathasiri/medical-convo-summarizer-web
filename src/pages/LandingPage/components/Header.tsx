import { styles } from "../LandingPage.styles";
import { FaSignInAlt } from "react-icons/fa";

interface HeaderProps {
  onSignIn: () => void;
}

export const Header = ({ onSignIn }: HeaderProps) => {
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.logo}>MediScribe</div>
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
