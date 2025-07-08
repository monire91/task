"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "../styles.module.scss";
import PhoneInput from "@/src/components/input/phoneInput";
import { useAuth } from "@/src/providers/auth";
import { fetchRandomUser, RandomUserResponse } from "@/src/api/auth";
import Button from "@/src/components/button";

interface FormValues {
  phone: string;
}

// Validation schema
const schema = yup
  .object()
  .shape({
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(
        /^\d{11}$/,
        "Phone number must be exactly 10 digits (e.g., 09350664601)"
      ),
  })
  .required();

export default function LoginForm() {
  const { setToken, setUser, isAuthenticated } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: fetchRandomUser,
    onSuccess: (data: RandomUserResponse) => {
      
      const userData = {
        firstName: data.results[0].name.first,
        lastName: data.results[0].name.last,
        id: data.results[0].id.value || "unknown",
      };
      setUser(userData);
      setToken("static-token-123");
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onSubmit = () => {
    mutate();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <PhoneInput register={register} errors={errors} />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </Button>
      {isError && (
        <p className={styles.error}>
          {error?.message || "An error occurred during login"}
        </p>
      )}
    </form>
  );
}

