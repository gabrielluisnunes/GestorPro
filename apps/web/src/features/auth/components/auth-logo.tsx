export function AuthLogo() {
  return (
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
  );
}
