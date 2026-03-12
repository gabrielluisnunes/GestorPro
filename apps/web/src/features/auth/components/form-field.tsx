interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon: React.ReactNode;
  extra?: React.ReactNode;
}

export function FormField({
  label,
  error,
  icon,
  extra,
  ...inputProps
}: FormFieldProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {extra}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          {...inputProps}
          className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
