"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegister } from "./hooks/use-register";

const schema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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
          Crie sua conta
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Preencha os dados abaixo para começar
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Nome completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle
                    cx="8"
                    cy="5"
                    r="3"
                    stroke="#9CA3AF"
                    strokeWidth="1.25"
                  />
                  <path
                    d="M2 14c0-3.31 2.69-6 6-6s6 2.69 6 6"
                    stroke="#9CA3AF"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <input
                {...register("name")}
                type="text"
                placeholder="Seu nome"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

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
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Senha
            </label>
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

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Confirmar senha
            </label>
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
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
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
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white rounded-lg py-3 text-sm font-semibold transition-colors mt-1"
          >
            {isPending ? "Criando conta..." : "Criar conta"}
          </button>
        </form>
      </div>

      {/* Link below card */}
      <p className="mt-8 text-sm text-gray-600 relative z-10">
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="text-primary-500 font-semibold hover:text-primary-600"
        >
          Entrar
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
