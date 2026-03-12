"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegister } from "./hooks/use-register";
import { AuthBackground } from "./components/auth-background";
import { AuthLogo } from "./components/auth-logo";
import { FormField } from "./components/form-field";
import { PasswordField } from "./components/password-field";

const schema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail invalido"),
    password: z.string().min(6, "Minimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "As senhas nao coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export function RegisterPage() {
  const router = useRouter();
  const { mutate: doRegister, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function onSubmit({ name, email, password }: FormData) {
    doRegister(
      { name, email, password },
      {
        onSuccess: (res) => {
          localStorage.setItem("token", res.access_token);
          router.push("/dashboard");
        },
      },
    );
  }

  const apiError = (error as AxiosError<{ message: string }>)?.response?.data
    ?.message;

  return (
    <AuthBackground>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-10 relative z-10">
        <AuthLogo />

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Crie sua conta
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Preencha os dados abaixo para comecar
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Nome completo"
            type="text"
            placeholder="Seu nome"
            error={errors.name?.message}
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5" r="3" stroke="#9CA3AF" strokeWidth="1.25" />
                <path
                  d="M2 14c0-3.31 2.69-6 6-6s6 2.69 6 6"
                  stroke="#9CA3AF"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
            }
            {...register("name")}
          />

          <FormField
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm0 0l6 5 6-5"
                  stroke="#9CA3AF"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            {...register("email")}
          />

          <PasswordField
            label="Senha"
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordField
            label="Confirmar senha"
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {apiError && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
              {apiError}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white rounded-lg py-3 text-sm font-semibold transition-colors mt-1"
          >
            {isPending ? "Criando conta..." : "Criar conta"}
          </button>
        </form>
      </div>

      <p className="mt-8 text-sm text-gray-600 relative z-10">
        Ja tem uma conta?{" "}
        <Link href="/login" className="text-primary-500 font-semibold hover:text-primary-600">
          Entrar
        </Link>
      </p>
    </AuthBackground>
  );
}
