import { validateCpfCnpj } from "@/lib/validators";
import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "Nome obrigatorio"),
  cpf_cnpj: z
    .string()
    .optional()
    .refine(
      (v) => !v || v.replace(/\D/g, "").length === 0 || validateCpfCnpj(v),
      { message: "CPF ou CNPJ invalido" },
    ),
  phone: z.string().optional(),
  email: z.string().email("E-mail invalido").optional().or(z.literal("")),
  status: z.enum(["ativo", "inativo"]).default("ativo"),
  cep: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().max(2).optional(),
  notes: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;
