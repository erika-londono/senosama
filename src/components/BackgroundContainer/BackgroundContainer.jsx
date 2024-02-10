import styles from "./BackgroundContainer.module.css";
import Image from "next/image";
import Circle from "../../assets/img/circlebig.png";

export default function BackgroundContainer({ children }) {
  return (
    <div className={styles.root}>
      <Image
        className={styles.circle}
        src={Circle}
        alt={"circle"}
        width={750}
        height={750}
      />
      <Image
        className={styles.circle2}
        src={Circle}
        alt={"circle2"}
        width={150}
        height={150}
      />
      <Image
        className={styles.circle3}
        src={Circle}
        alt={"circle3"}
        width={150}
        height={150}
      />
      <div className={styles.woman}>{children}</div>
    </div>
  );
}
