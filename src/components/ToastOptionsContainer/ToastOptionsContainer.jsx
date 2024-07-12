import styles from "./ToastOptionsContainer.module.css";

export default function ToastOptionsContainer({ children }) {
  return <div className={styles.toastOptions}>{children}</div>;
}
