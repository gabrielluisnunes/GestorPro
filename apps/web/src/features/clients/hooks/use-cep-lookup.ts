import { useState } from "react";

export interface CepData {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

export function useCepLookup() {
  const [loading, setLoading] = useState(false);

  async function lookup(cep: string): Promise<CepData | null> {
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) return null;
    setLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (data.erro) return null;
      return {
        street: data.logradouro ?? "",
        neighborhood: data.bairro ?? "",
        city: data.localidade ?? "",
        state: data.uf ?? "",
      };
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { loading, lookup };
}
