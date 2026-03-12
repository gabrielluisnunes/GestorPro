"use client";

import { Bell, HelpCircle, Search } from "lucide-react";

interface NavbarProps {
  pageTitle?: string;
}

export function Navbar({ pageTitle = "Dashboard Geral" }: NavbarProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-6 gap-4 shrink-0">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Pesquisar em toda a plataforma..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary-400 focus:bg-white transition-colors placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <HelpCircle size={18} />
        </button>
        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700 cursor-pointer hover:text-primary-600 transition-colors select-none">
          <span>{pageTitle}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-400">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </header>
  );
}
