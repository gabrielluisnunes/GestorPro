import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GestorPro",
  description: "Gestão para prestadores de serviço",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
