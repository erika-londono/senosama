import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.css";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

export default function SignUp() {
  return (
    <main className={styles.main}>
      <Navbar signup />
      <div className={styles.home}>
        <div>
          <h1>Aplicativo SENOSama</h1>
          <form className={styles.form}>
            <h2>Registrate</h2>
            <h3>Usuario</h3>
            <Input inputProps={{ type: "email" }} />
            <h3>Contraseña</h3>
            <Input inputProps={{ type: "password" }} />
            <Button>Continuar</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
