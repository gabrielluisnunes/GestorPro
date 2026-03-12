export function OAuthButtons() {
  return (
    <>
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400 whitespace-nowrap">
          Ou continue com
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
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
    </>
  );
}
