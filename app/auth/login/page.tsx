import Image from "next/image";
import styles from "./styles.module.scss";
import LoginForm from "./_components/loginForm";

export default function Login() {
  return (
    <div className={styles.page}>
      <Image
        className={styles.cartImage}
        width={120}
        priority
        height={100}
        alt="cart image"
        src="/images/cart.svg"
      />
      <LoginForm />
    </div>
  );
}
