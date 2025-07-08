import { FieldError, UseFormRegister } from "react-hook-form";
import styles from "./styles.module.scss";

interface FormValues {
  phone: string;
}

interface PhoneInputProps {
  register: UseFormRegister<FormValues>;
  errors: Partial<Record<keyof FormValues, FieldError>>;
}

export default function PhoneInput({ register, errors }: PhoneInputProps) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor="phone" className={styles.label}>
        Phone Number
      </label>
      <input
        id="phone"
        type="tel"
        placeholder="09121234567"
        {...register("phone")}
        className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
      />
      {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
    </div>
  );
}
