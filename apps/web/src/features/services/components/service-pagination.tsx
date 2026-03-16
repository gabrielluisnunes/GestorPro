"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  shownCount: number;
  onPageChange: (page: number) => void;
}

export function ServicePagination({
  currentPage,
  totalPages,
  totalItems,
  shownCount,
  onPageChange,
}: Props) {
  if (totalItems === 0) return null;

  return (
    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
      <p className="text-xs text-gray-500">
        Mostrando {shownCount} de {totalItems} serviço
        {totalItems !== 1 ? "s" : ""}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            className={`w-7 h-7 text-xs rounded-md transition-colors ${
              currentPage === n
                ? "bg-primary-500 text-white font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
