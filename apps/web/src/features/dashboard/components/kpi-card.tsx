interface KpiBadge {
  label: string;
  variant: "positive" | "negative" | "warning";
}

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  badge?: KpiBadge;
}

const badgeStyles: Record<KpiBadge["variant"], string> = {
  positive: "bg-emerald-50 text-emerald-600",
  negative: "bg-red-50 text-red-500",
  warning: "bg-amber-50 text-amber-600",
};

export function KpiCard({
  title,
  value,
  icon,
  iconBg,
  iconColor,
  badge,
}: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}
        >
          <span className={iconColor}>{icon}</span>
        </div>
        {badge && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeStyles[badge.variant]}`}
          >
            {badge.label}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium mb-1">{title}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
