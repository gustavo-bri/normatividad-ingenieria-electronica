import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardList,
  Cpu,
  FileText,
  Gauge,
  Link2,
  ShieldCheck
} from "lucide-react";
import Reveal from "@/components/Reveal";

const modules = [
  {
    href: "/modulo-1/",
    index: "01",
    title: "Normas y Estándares Técnicos",
    description: "RETIE/RETILAP, IEC, ISO, IPC, FCC, IATF, NEMA, TIA, RoHS, NFPA y normativa médica.",
    icon: ShieldCheck
  },
  {
    href: "/modulo-2/",
    index: "02",
    title: "Documentación de Ingeniería",
    description: "Ciclo de vida, niveles documentales, trazabilidad, RTM y control de versiones.",
    icon: FileText
  },
  {
    href: "/modulo-3/",
    index: "03",
    title: "Informes Académicos IEEE",
    description: "Estructura, abstract, index terms, citas, referencias y errores frecuentes.",
    icon: ClipboardList
  },
  {
    href: "/modulo-4/",
    index: "04",
    title: "Casos de Estudio",
    description: "Decisiones normativas en infraestructura industrial y microelectrónica médica.",
    icon: Cpu
  }
];

const tools = [
  { icon: Gauge, title: "Simulador IP", text: "Relaciona los dos dígitos del código IP con las condiciones de ensayo." },
  { icon: BookOpenCheck, title: "Validador IEEE", text: "Hace un pre-chequeo heurístico del abstract y sus palabras clave." },
  { icon: Link2, title: "Constructor RTM", text: "Edita, persiste y exporta la trazabilidad requisito–implementación–verificación." }
];

export default function HomePage() {
  return (
    <div className="pb-12">
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-hero-grid bg-[size:32px_32px] px-5 py-12 shadow-glow sm:px-8 md:py-16 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-400/5" aria-hidden="true" />
        <div className="relative max-w-4xl">
          <p className="eyebrow">Ingeniería electrónica · guía de aprendizaje</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl">
            Normatividad y documentación{" "}
            <span className="bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
              sin perder el criterio de ingeniería
            </span>
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 md:text-lg">
            Un recorrido interactivo para interpretar normas, justificar decisiones, mantener trazabilidad y documentar evidencia técnica. El objetivo no es memorizar siglas: es aprender cuándo una exigencia cambia el diseño.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/modulo-1/" className="primary-button">
              Comenzar por el Módulo 1 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/ejercicio-practico/" className="secondary-button">
              Ir al ejercicio práctico
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="modules-title">
        <div className="mb-5">
          <p className="eyebrow">Ruta formativa</p>
          <h2 id="modules-title" className="section-title mt-1">Cuatro módulos conectados</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Reveal key={module.href} delay={index * 0.04}>
                <Link
                  href={module.href}
                  className="interactive-card group flex h-full items-start gap-4 p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-700 bg-slate-950/50">
                    <Icon className="h-5 w-5 text-blue-300 transition group-hover:text-cyan-200" />
                  </span>
                  <span className="min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-[.16em] text-slate-500">
                      Módulo {module.index}
                    </span>
                    <span className="mt-1 block text-base font-bold text-white">{module.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-slate-400">{module.description}</span>
                  </span>
                  <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="tools-title">
        <p className="eyebrow">Interactividad</p>
        <h2 id="tools-title" className="section-title mt-1">Aprender haciendo</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {tools.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.05}>
              <div className="interactive-card h-full p-5">
                <Icon className="h-5 w-5 text-cyan-300" />
                <h3 className="mt-4 font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 md:p-6">
        <p className="text-sm leading-6 text-slate-400">
          <strong className="text-slate-200">Criterio de uso:</strong> este sitio es una herramienta académica. La aplicabilidad de una norma depende del país, sector, producto, edición contractual y organismo competente. Para decisiones de diseño, inspección o certificación, consulta el texto oficial vigente.
        </p>
      </section>
    </div>
  );
}
