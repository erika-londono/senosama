import styles from "./BackgroundContainer.module.css";
import Image from "next/image";
import Circle from "../../assets/img/circlebig.png";
import useWindowSize from "@/customHook/ismobile";
import { usePathname } from "next/navigation";
export default function BackgroundContainer({ children }) {
  const isMobile = useWindowSize();
  const pathname = usePathname();

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
      <div
        className={`${pathname !== "/login" && styles.hidden} ${styles.woman}`}
      >
        {children}
      </div>
    </div>
  );
}
