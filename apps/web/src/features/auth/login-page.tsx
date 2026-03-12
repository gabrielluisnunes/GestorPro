"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "./hooks/use-login";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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

  const apiError = (error as any)?.response?.data?.message as
    | string
    | undefined;

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-10 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mb-3 shadow-sm">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M5 5L11 11L5 17M11 5L17 11L11 17"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-semibold text-gray-800 text-base tracking-tight">
            GestorPro
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Bem-vindo de volta
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Entre na sua conta para continuar gerenciando seus projetos
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm0 0l6 5 6-5"
                    stroke="#9CA3AF"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                {...register("email")}
                type="email"
                placeholder="seu@email.com"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary-500 hover:text-primary-600 font-medium"
              >
                Esqueci minha senha
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect
                    x="2"
                    y="7"
                    width="12"
                    height="8"
                    rx="1.5"
                    stroke="#9CA3AF"
                    strokeWidth="1.25"
                  />
                  <path
                    d="M5 7V5a3 3 0 016 0v2"
                    stroke="#9CA3AF"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-10 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 2l12 12M6.5 6.6A2 2 0 0110 9.4M4.3 4.4A7 7 0 001 8s2.5 5 7 5a6.9 6.9 0 004.7-1.9M6 2.2A7 7 0 0115 8a6.8 6.8 0 01-1.3 2.4"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.25"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="text-sm text-gray-600 cursor-pointer"
            >
              Lembrar de mim
            </label>
          </div>

          {/* API Error */}
          {apiError && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
              {apiError}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white rounded-lg py-3 text-sm font-semibold transition-colors"
          >
            {isPending ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* OAuth divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400 whitespace-nowrap">
            Ou continue com
          </span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* OAuth buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {/* Google icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M16.51 9.19c0-.57-.05-1.13-.14-1.66H9v3.14h4.21a3.6 3.6 0 01-1.56 2.36v1.96h2.52c1.48-1.36 2.34-3.36 2.34-5.8z"
                fill="#4285F4"
              />
              <path
                d="M9 17c2.12 0 3.9-.7 5.2-1.9l-2.52-1.96c-.7.47-1.6.75-2.68.75-2.06 0-3.8-1.39-4.43-3.26H2.01v2.02A8 8 0 009 17z"
                fill="#34A853"
              />
              <path
                d="M4.57 10.63A4.8 4.8 0 014.32 9c0-.57.1-1.12.25-1.63V5.35H2.01A8 8 0 001 9c0 1.3.31 2.52.85 3.6l2.72-1.97z"
                fill="#FBBC05"
              />
              <path
                d="M9 4.11c1.16 0 2.2.4 3.02 1.18l2.26-2.26A8 8 0 002.01 5.35l2.56 1.98C5.2 5.5 6.94 4.11 9 4.11z"
                fill="#EA4335"
              />
            </svg>
            <span>Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {/* GitHub icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 1a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.82 1.23.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.01.08-2.1 0 0 .67-.22 2.2.82A7.66 7.66 0 019 5.75c.68 0 1.36.09 2 .27 1.52-1.04 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.46.55.38A8 8 0 009 1z"
              />
            </svg>
            <span>GitHub</span>
          </button>
        </div>
      </div>

      {/* Link below card */}
      <p className="mt-8 text-sm text-gray-600 relative z-10">
        Não tem uma conta?{" "}
        <Link
          href="/register"
          className="text-primary-500 font-semibold hover:text-primary-600"
        >
          Criar uma conta
        </Link>
      </p>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 160"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-32"
        >
          <path
            d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,160 L0,160 Z"
            fill="#DDD8F5"
          />
        </svg>
      </div>
    </div>
  );
}
