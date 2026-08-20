import type { Metadata } from "next";
import "./globals.css";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

export const metadata: Metadata = {
  title: {
    default: "Cuanti — Historias con datos",
    template: "%s · Cuanti",
  },
  description:
    "Lecciones interactivas de estadística construidas a partir de preguntas y datos reales.",
  openGraph: {
    title: "Cuanti — Historias con datos",
    description: "Mirá, tocá y poné a prueba tus intuiciones con datos reales.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cuanti — Historias con datos",
    description: "Mirá, tocá y poné a prueba tus intuiciones con datos reales.",
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
