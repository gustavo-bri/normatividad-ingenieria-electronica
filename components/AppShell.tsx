"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import ScrollProgress from "@/components/ScrollProgress";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {open && (
        <button
          aria-label="Cerrar navegación"
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-800/80 bg-ink-950/90 px-4 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl border border-slate-700 bg-slate-900/80 p-2.5 text-slate-200"
          aria-label="Abrir navegación"
          aria-expanded={open}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="ml-3">
          <p className="text-sm font-bold text-white">NormEng</p>
          <p className="text-[10px] uppercase tracking-[.16em] text-slate-500">
            Guía integral
          </p>
        </div>
      </header>

      <main
        id="contenido-principal"
        className="min-h-screen lg:pl-72"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-10">
          {children}
        </div>
      </main>
    </>
  );
}
