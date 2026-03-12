"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "./hooks/use-login";
import { AuthBackground } from "./components/auth-background";
import { AuthLogo } from "./components/auth-logo";
import { FormField } from "./components/form-field";
import { OAuthButtons } from "./components/oauth-buttons";
import { PasswordField } from "./components/password-field";

const schema = z.object({
  email: z.string().email("E-mail invalido"),
  password: z.string().min(6, "Minimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function LoginPage() {
  const router = useRouter();
  const { mutate: doLogin, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormData) {
    doLogin(data, {
      onSuccess: (res) => {
        localStorage.setItem("token", res.access_token);
        router.push("/dashboard");
      },
    });
  }

  const apiError = (error as AxiosError<{ message: string }>)?.response?.data
    ?.message;

  return (
    <AuthBackground>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-10 relative z-10">
        <AuthLogo />

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Bem-vindo de volta
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Entre na sua conta para continuar gerenciando seus projetos
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            extra={
              <Link
                href="/forgot-password"
                className="text-xs text-primary-500 hover:text-primary-600 font-medium"
              >
                Esqueci minha senha
              </Link>
            }
            {...register("password")}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
              Lembrar de mim
            </label>
          </div>

          {apiError && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
              {apiError}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white rounded-lg py-3 text-sm font-semibold transition-colors"
          >
            {isPending ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <OAuthButtons />
      </div>

      <p className="mt-8 text-sm text-gray-600 relative z-10">
        Nao tem uma conta?{" "}
        <Link href="/register" className="text-primary-500 font-semibold hover:text-primary-600">
          Criar uma conta
        </Link>
      </p>
    </AuthBackground>
  );
}
