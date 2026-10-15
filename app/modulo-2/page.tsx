import type { Metadata } from "next";
import { Archive, FileCheck2, FileText, GitBranch, Link2, PenTool, ShieldCheck } from "lucide-react";
import ModuleHeader from "@/components/ModuleHeader";
import RTMBuilder from "@/components/RTMBuilder";
import Quiz, { type QuizQuestion } from "@/components/Quiz";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Módulo 2 · Documentación en Proyectos"
};

const levels = [
  {
    level: "1",
    title: "Necesidad y requisitos",
    icon: PenTool,
    examples: ["Necesidad del usuario", "Requisitos verificables", "Criterios de aceptación"],
    question: "¿Qué debe hacer el sistema y bajo qué condición se considera cumplido?"
  },
  {
    level: "2",
    title: "Arquitectura y diseño",
    icon: GitBranch,
    examples: ["Diagramas de bloques", "Interfaces", "Cálculos", "Selección de componentes"],
    question: "¿Cómo se transformará el requisito en una solución técnica?"
  },
  {
    level: "3",
    title: "Implementación",
    icon: FileText,
    examples: ["Esquemáticos", "PCB", "Código", "BOM", "Configuraciones"],
    question: "¿Qué versión concreta fue construida?"
  },
  {
    level: "4",
    title: "Verificación y validación",
    icon: FileCheck2,
    examples: ["Plan de pruebas", "Resultados", "No conformidades", "RTM"],
    question: "¿Qué evidencia demuestra que la implementación cumple?"
  },
  {
    level: "5",
    title: "Liberación, operación y mantenimiento",
    icon: Archive,
    examples: ["As-built", "Manual", "Historial de cambios", "Registro de mantenimiento"],
    question: "¿Qué necesita el siguiente equipo para operar, auditar y mantener?"
  }
];

const questions: QuizQuestion[] = [
  {
    id: "m2-q1",
    question: "¿Qué problema principal resuelve una RTM bien mantenida?",
    options: [
      "Sustituye todos los planos eléctricos.",
      "Conecta cada requisito con su implementación y evidencia de verificación.",
      "Elimina la necesidad de control de versiones.",
      "Convierte automáticamente requisitos en código."
    ],
    correct: 1,
    explanation:
      "La RTM permite detectar requisitos huérfanos, evidencia faltante e implementaciones sin justificación trazable."
  },
  {
    id: "m2-q2",
    question: "¿Cuál es una buena práctica al controlar versiones de documentación técnica?",
    options: [
      "Sobrescribir siempre el archivo final.pdf.",
      "Cambiar de nombre sin registrar el motivo.",
      "Mantener identificador, revisión, fecha, autor/aprobador y descripción del cambio.",
      "Guardar solo la última versión y eliminar todo historial."
    ],
    correct: 2,
    explanation:
      "El control de configuración exige saber qué cambió, quién lo autorizó y qué versión corresponde al producto o ensayo."
  },
  {
    id: "m2-q3",
    question: "Un requisito verificable debe incluir principalmente:",
    options: [
      "Una intención vaga.",
      "Una condición observable o medible y un criterio de aceptación.",
      "Solo el nombre del componente.",
      "Una captura de pantalla sin contexto."
    ],
    correct: 1,
    explanation:
      "Si no puede verificarse objetivamente, la trazabilidad termina siendo administrativa en lugar de técnica."
  }
];

export default function Module2Page() {
  return (
    <div className="pb-12">
      <ModuleHeader
        module="Módulo 02"
        title="Documentación en Proyectos de Ingeniería"
        description="Documentar no significa producir archivos: significa construir una cadena de evidencia. Cada requisito debe poder seguirse hasta el diseño que lo implementa y el ensayo que demuestra su cumplimiento."
        icon={FileText}
      />

      <section aria-labelledby="levels-title">
        <p className="eyebrow">Modelo didáctico</p>
        <h2 id="levels-title" className="section-title mt-1">Cinco niveles para ordenar la evidencia</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Estos cinco niveles son una estructura pedagógica del curso, no una norma universal. En proyectos reales, adapta la jerarquía al sistema de gestión, contrato y estándar aplicables.
        </p>

        <div className="mt-5 grid gap-4 lg:grid-cols-5">
          {levels.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.level} delay={index * 0.04}>
                <article className="interactive-card h-full p-4">
                  <div className="flex items-center justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-500/10">
                      <Icon className="h-4 w-4 text-blue-300" />
                    </span>
                    <span className="font-mono text-2xl font-black text-slate-700">{item.level}</span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-cyan-100/70">{item.question}</p>
                  <ul className="mt-3 space-y-1.5 text-xs leading-5 text-slate-500">
                    {item.examples.map((example) => <li key={example}>• {example}</li>)}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3" aria-label="Principios documentales">
        {[
          {
            icon: Link2,
            title: "Trazabilidad bidireccional",
            text: "Debe ser posible ir de requisito a evidencia y regresar de una evidencia a la necesidad que la justifica."
          },
          {
            icon: GitBranch,
            title: "Control de configuración",
            text: "Documento, firmware, PCB y procedimiento de ensayo deben identificar la revisión exacta a la que pertenecen."
          },
          {
            icon: ShieldCheck,
            title: "Evidencia auditable",
            text: "Una conclusión técnica necesita datos, método, instrumentos y criterio de aceptación suficientes para ser revisada por otra persona."
          }
        ].map(({ icon: Icon, title, text }) => (
          <article key={title} className="interactive-card p-5">
            <Icon className="h-5 w-5 text-cyan-300" />
            <h3 className="mt-3 font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
          </article>
        ))}
      </section>

      <div className="mt-10">
        <RTMBuilder />
      </div>

      <div className="mt-10">
        <Quiz title="Módulo 2 · Documentación y trazabilidad" questions={questions} />
      </div>
    </div>
  );
}
