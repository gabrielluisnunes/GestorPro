"use client";

export type ProfileTab =
  | "servicos"
  | "documentos"
  | "contratos"
  | "pagamentos"
  | "notas";

const TABS: { id: ProfileTab; label: string }[] = [
  { id: "servicos", label: "Servicos" },
  { id: "documentos", label: "Documentos" },
  { id: "contratos", label: "Contratos" },
  { id: "pagamentos", label: "Pagamentos" },
  { id: "notas", label: "Notas" },
];

interface Props {
  active: ProfileTab;
  onChange: (tab: ProfileTab) => void;
}

export function ClientTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-1 border-b border-gray-100">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
            active === tab.id
              ? "border-primary-500 text-primary-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
