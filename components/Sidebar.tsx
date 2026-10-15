"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookOpenCheck,
  ClipboardList,
  Cpu,
  FileText,
  Home,
  ShieldCheck,
  X
} from "lucide-react";

const items = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/modulo-1/", label: "Normas y estándares", icon: ShieldCheck },
  { href: "/modulo-2/", label: "Documentación", icon: FileText },
  { href: "/modulo-3/", label: "Informes IEEE", icon: ClipboardList },
  { href: "/modulo-4/", label: "Casos de estudio", icon: Cpu },
  { href: "/ejercicio-practico/", label: "Ejercicio práctico", icon: BookOpenCheck }
];

export default function Sidebar({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const accessible = open || desktop;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-slate-800 bg-ink-900/95 backdrop-blur-xl transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
      aria-label="Navegación principal"
      aria-hidden={!accessible}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5">
          <Link href="/" onClick={onClose} tabIndex={accessible ? undefined : -1} className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-900/30">
              <ShieldCheck className="h-5 w-5 text-white" />
            </span>
            <span>
              <span className="block text-sm font-extrabold tracking-tight text-white">
                NormEng
              </span>
              <span className="block text-[10px] uppercase tracking-[.18em] text-slate-500">
                Guía integral
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Cerrar navegación"
            tabIndex={accessible ? undefined : -1}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {items.map((item, index) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.replace(/\/$/, ""));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                tabIndex={accessible ? undefined : -1}
                className={`flex min-h-11 items-center gap-3 rounded-xl border px-3.5 py-3 text-sm font-medium transition ${
                  active
                    ? "border-blue-400/25 bg-blue-500/10 text-blue-200"
                    : "border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
                {index > 0 && index < 5 && (
                  <span className="ml-auto rounded-md bg-slate-800 px-1.5 py-0.5 font-mono text-[9px] text-slate-500">
                    M{index}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
            <p className="text-xs leading-relaxed text-slate-400">
              <span className="font-semibold text-cyan-300">Uso académico.</span>{" "}
              Las normas cambian: verifica siempre la edición y jurisdicción aplicables antes de diseñar o certificar.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
