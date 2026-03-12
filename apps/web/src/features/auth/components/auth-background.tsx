export function AuthBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary-50 flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      {children}

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
