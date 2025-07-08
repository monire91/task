import React from "react";
import styles from './styles.module.scss'

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  isLoading = false,
  children = "Submit",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.submitButton}
      disabled={disabled || isLoading}
    >
      {children}
    </button>
  );
};

export default Button;
