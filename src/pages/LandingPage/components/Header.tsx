import { styles } from "../LandingPage.styles";

interface HeaderProps {
  onSignIn: () => void;
}

export const Header = ({ onSignIn }: HeaderProps) => {
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.logo}>MediScribe</div>
        <button style={{ ...styles.button }} onClick={onSignIn}>
          Sign In
        </button>
      </div>
    </header>
  );
};
