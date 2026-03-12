"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  ClipboardList,
  CreditCard,
  Calendar,
  MessageSquare,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/servicos", label: "Servicos", icon: Briefcase },
  { href: "/documentos", label: "Documentos", icon: FileText },
  { href: "/contratos", label: "Contratos", icon: ClipboardList },
  { href: "/pagamentos", label: "Pagamentos", icon: CreditCard },
  { href: "/agenda", label: "Agenda", icon: Calendar },
  { href: "/mensagens", label: "Mensagens", icon: MessageSquare },
];

interface SidebarProps {
  userName?: string;
}

export function Sidebar({ userName = "Usuario" }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <aside className="w-52 min-h-screen bg-white border-r border-gray-100 flex flex-col shrink-0">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
              <path d="M4 11L9 16L18 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 leading-tight">GestorPro</p>
            <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">ADMINISTRACAO</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-2">
        <Link
          href="/configuracoes"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            pathname === "/configuracoes"
              ? "bg-primary-50 text-primary-600"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Settings size={17} />
          Configuracoes
        </Link>
      </div>

      <div className="px-4 py-4 border-t border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-900 truncate">{userName}</p>
          <button
            onClick={handleLogout}
            className="text-[11px] text-gray-400 hover:text-red-500 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    </aside>
  );
}
