"use client";

import { useState } from "react";

interface PasswordFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  error?: string;
  extra?: React.ReactNode;
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 2l12 12M6.5 6.6A2 2 0 0110 9.4M4.3 4.4A7 7 0 001 8s2.5 5 7 5a6.9 6.9 0 004.7-1.9M6 2.2A7 7 0 0115 8a6.8 6.8 0 01-1.3 2.4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

const LockIcon = () => (
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
);

export function PasswordField({
  label,
  error,
  extra,
  ...inputProps
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {extra}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <LockIcon />
        </div>
        <input
          {...inputProps}
          type={show ? "text" : "password"}
          className="w-full border border-gray-200 rounded-lg pl-9 pr-10 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
