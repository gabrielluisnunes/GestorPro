"use client";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Client } from "../types/client.types";

interface MenuPosition {
  top: number;
  right: number;
}

interface Props {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

export function ClientActionMenu({ client, onEdit, onDelete }: Props) {
  const router = useRouter();
  const [pos, setPos] = useState<MenuPosition | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pos) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setPos(null);
      }
    }
    function handleScroll() {
      setPos(null);
    }
    document.addEventListener("mousedown", handleClick);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [pos]);

  function open(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
  }

  return (
    <>
      <button
        onClick={open}
        className={`p-1.5 rounded-md transition-colors ${
          pos
            ? "bg-gray-100 text-gray-700"
            : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        }`}
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {pos && (
        <div
          ref={menuRef}
          style={{ position: "fixed", top: pos.top, right: pos.right }}
          className="z-50 w-44 bg-white border border-gray-200 rounded-xl shadow-2xl py-1 divide-y divide-gray-50"
        >
          <button
            onClick={() => {
              setPos(null);
              router.push(`/clientes/${client.id}`);
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-gray-400" />
            Ver Perfil
          </button>
          <button
            onClick={() => {
              setPos(null);
              onEdit(client);
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-400" />
            Editar
          </button>
          <button
            onClick={() => {
              setPos(null);
              onDelete(client.id);
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Excluir
          </button>
        </div>
      )}
    </>
  );
}
