"use client";
import Navbar from "../components/Navbar/Navbar";
import Pill from "../components/Pill/Pill";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

import Img1 from "../assets/img/Datos del paciente.png";
import Img2 from "../assets/img/Test psicosocial.png";
import Img3 from "../assets/img/Test socioeconómico.png";
import Img4 from "../assets/img/Test familiar.png";
import Img5 from "../assets/img/Cáncer de ovario.png";
import Img6 from "../assets/img/Cáncer de mama.png";
import BackgroundContainer from "@/components/BackgroundContainer/BackgroundContainer";

export default function Home() {
  const router = useRouter();

  const menuOptions = [
    "Datos del paciente",
    "Test psicosocial",
    "Test socioeconómico",
    "Test familiar",
    "Cáncer de ovario",
    "Cáncer de mama",
  ];

  const menuIcons = [Img1, Img2, Img3, Img4, Img5, Img6];

  return (
    <main className={styles.main}>
      <Navbar />
      <BackgroundContainer>
        <section className={styles.menu}>
          <h2>MÓDULOS</h2>
          <div className={styles.options}>
            {menuOptions.map((option, index) => (
              <Pill
                key={option}
                label={option}
                icon={menuIcons[index]}
                onClick={() =>
                  router.push(`/${option.toLowerCase().split(" ").join("-")}`)
                }
              />
            ))}
          </div>
        </section>
      </BackgroundContainer>
    </main>
  );
}
