import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  client_id: z.string().min(1, "Cliente obrigatório"),
  description: z.string().optional(),
  status: z.enum(["ativo", "aguardando", "finalizado"]).default("aguardando"),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  notes: z.string().optional(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
