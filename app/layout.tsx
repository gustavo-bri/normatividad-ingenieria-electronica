import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: {
    default: "NormEng | Normatividad y Documentación en Ingeniería Electrónica",
    template: "%s | NormEng"
  },
  description:
    "Guía de aprendizaje integral sobre normatividad, estándares técnicos, trazabilidad y documentación IEEE aplicada a ingeniería electrónica.",
  applicationName: "NormEng",
  keywords: [
    "ingeniería electrónica",
    "RETIE",
    "IEC",
    "IEEE",
    "trazabilidad",
    "documentación técnica"
  ],
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark">
      <body>
        <a href="#contenido-principal" className="skip-link">
          Saltar al contenido
        </a>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
