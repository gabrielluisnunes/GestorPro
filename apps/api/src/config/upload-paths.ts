import { join } from "path";

/** Diretório raiz onde arquivos públicos são gravados (relativo ao cwd por padrão). */
export function getUploadsRoot(): string {
  const relative = process.env.UPLOAD_ROOT ?? "uploads";
  return join(process.cwd(), relative);
}

export function getDocumentsUploadDir(): string {
  return join(getUploadsRoot(), "documents");
}
