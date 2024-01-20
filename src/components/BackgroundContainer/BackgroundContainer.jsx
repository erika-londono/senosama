import styles from "./BackgroundContainer.module.css";

export default function BackgroundContainer({ children }) {
  return <div className={styles.root}>{children}</div>;
}
