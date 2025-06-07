import { styles } from "../HomePage.styles";

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
          <span>{email}</span>
          <button
            onClick={onSignOut}
            style={{ ...styles.button, ...styles.dangerButton }}
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};
