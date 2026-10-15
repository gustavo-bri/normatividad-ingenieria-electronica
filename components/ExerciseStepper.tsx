"use client";

import { useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Lightbulb, ShieldCheck } from "lucide-react";

type Step = {
  title: string;
  action: string;
  why: string;
  evidence: string[];
  reference: string;
};

const steps: Step[] = [
  {
    title: "1. Clasificar el área y el riesgo clínico",
    action:
      "Identifica que el quirófano pertenece a un área de cuidados críticos y documenta las cargas que soportan vida, las cargas críticas y los equipos conectados al paciente.",
    why:
      "La arquitectura eléctrica depende del daño posible ante una falla y de la continuidad requerida. Diseñar primero el electrodo de tierra sin clasificar el área invierte el proceso.",
    evidence: [
      "Plano funcional del área y ubicación de camas/equipos.",
      "Lista de cargas por criticidad y fuente de alimentación.",
      "Requisitos normativos aplicables a la instalación médica."
    ],
    reference: "RETIE 2026 · Libro 3 · instalaciones especiales de asistencia médica"
  },
  {
    title: "2. Diseñar la puesta a tierra redundante para cuidado de pacientes",
    action:
      "Define el conductor de protección aislado que acompaña al circuito derivado y la trayectoria metálica/cable ensamblado que actúa como segundo camino de puesta a tierra cuando aplique.",
    why:
      "El RETIE vigente exige tierra redundante en áreas para cuidado de pacientes. La redundancia reduce la probabilidad de perder la protección por una sola falla de continuidad.",
    evidence: [
      "Diagrama unifilar con PE y rutas de canalización.",
      "Cálculo del conductor de protección según el criterio aplicable.",
      "Detalle de conexiones equipotenciales e identificación."
    ],
    reference: "RETIE 2026 · definición de tierra redundante y requisitos de áreas para cuidado de pacientes"
  },
  {
    title: "3. Separar el sistema de potencia aislado de la puesta a tierra de protección",
    action:
      "Para los circuitos del área crítica que lo requieran, incorpora transformador de aislamiento, monitor de aislamiento y tablero de aislamiento; conserva la puesta a tierra de protección de masas y partes accesibles.",
    why:
      "Un sistema IT médico mantiene los conductores activos aislados de tierra, pero no elimina la necesidad de puesta a tierra de protección. Poner a tierra directamente el secundario anularía el principio del sistema aislado.",
    evidence: [
      "Esquema del sistema IT y monitor de aislamiento.",
      "Lista de circuitos exclusivos del área crítica.",
      "Coordinación con el sistema eléctrico esencial y fuentes alternas."
    ],
    reference: "RETIE 2026 · sistema de potencia aislado IT para áreas de cuidados críticos"
  },
  {
    title: "4. Verificar equipotencialidad, continuidad y exposición",
    action:
      "Define ensayos de continuidad de conductores de protección, resistencia/impedancia del sistema de puesta a tierra según diseño, verificación de polaridad, aislamiento y funcionamiento del monitor de aislamiento.",
    why:
      "RETIE 2026 advierte que la seguridad no se decide por un único valor de resistencia de puesta a tierra: deben controlarse tensiones de paso, contacto y transferidas, además de la continuidad efectiva de las trayectorias de protección.",
    evidence: [
      "Procedimiento de prueba con instrumento identificado y calibración vigente.",
      "Criterios de aceptación vinculados al diseño.",
      "Registro de resultados y no conformidades."
    ],
    reference: "RETIE 2026 · Título de sistemas de puesta a tierra y verificación"
  },
  {
    title: "5. Cerrar la trazabilidad y la puesta en servicio",
    action:
      "Relaciona cada requisito con planos as-built, cálculo, certificado, inspección o ensayo; registra revisión, responsable y fecha antes de liberar la instalación.",
    why:
      "Una instalación segura pero no trazable es difícil de mantener y auditar. La documentación debe demostrar qué se construyó y con qué evidencia se aceptó.",
    evidence: [
      "RTM de requisitos vs. evidencia.",
      "Planos as-built y memoria de cálculo aprobada.",
      "Actas de prueba, certificados aplicables y manual de mantenimiento."
    ],
    reference: "RETIE 2026 · evaluación de conformidad y documentación del proyecto"
  }
];

export default function ExerciseStepper() {
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [showWhy, setShowWhy] = useState(true);

  const step = steps[index];
  const allDone = completed.length === steps.length;

  const next = () => {
    setCompleted((current) => current.includes(index) ? current : [...current, index]);
    if (index < steps.length - 1) {
      setIndex((value) => value + 1);
      setShowWhy(true);
    }
  };

  const previous = () => {
    if (index > 0) {
      setIndex((value) => value - 1);
      setShowWhy(true);
    }
  };

  return (
    <section className="interactive-card p-5 md:p-7">
      <div className="mb-6 flex items-center gap-2">
        {steps.map((_, itemIndex) => (
          <div
            key={itemIndex}
            className={`h-1.5 flex-1 rounded-full ${
              completed.includes(itemIndex)
                ? "bg-emerald-400"
                : itemIndex === index
                ? "bg-blue-400"
                : "bg-slate-800"
            }`}
            aria-hidden="true"
          />
        ))}
        <span className="ml-2 font-mono text-xs text-slate-500">{index + 1}/{steps.length}</span>
      </div>

      <p className="eyebrow">Paso activo</p>
      <h2 className="mt-1 text-xl font-bold text-white">{step.title}</h2>

      <div className="mt-5 rounded-xl border border-blue-400/20 bg-blue-500/5 p-4">
        <p className="text-sm leading-6 text-slate-300">
          <strong className="text-blue-200">Acción: </strong>{step.action}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setShowWhy((value) => !value)}
        className="mt-4 flex items-center gap-2 text-sm font-semibold text-amber-200 hover:text-amber-100"
        aria-expanded={showWhy}
      >
        <Lightbulb className="h-4 w-4" />
        {showWhy ? "Ocultar" : "Mostrar"} el porqué técnico
      </button>

      {showWhy && (
        <div className="mt-3 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
          <p className="text-sm leading-6 text-slate-300">{step.why}</p>
        </div>
      )}

      <div className="mt-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-white">
          <ShieldCheck className="h-4 w-4 text-emerald-300" />
          Evidencia esperada
        </h3>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-400">
          {step.evidence.map((item) => <li key={item}>• {item}</li>)}
        </ul>
      </div>

      <p className="mt-5 rounded-lg bg-slate-950/50 px-3 py-2 font-mono text-[11px] leading-5 text-cyan-200/80">
        Referencia de estudio: {step.reference}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button type="button" className="secondary-button" onClick={previous} disabled={index === 0}>
          <ChevronLeft className="h-4 w-4" /> Anterior
        </button>
        <button type="button" className="primary-button" onClick={next}>
          {index === steps.length - 1 ? "Marcar como completado" : "Siguiente paso"}
          {index === steps.length - 1 ? <CheckCircle2 className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      {allDone && (
        <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 text-center" aria-live="polite">
          <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-300" />
          <p className="mt-2 font-bold text-white">Secuencia completada</p>
          <p className="mx-auto mt-1 max-w-2xl text-sm leading-6 text-slate-400">
            El resultado no es un valor único de resistencia: es una arquitectura de protección, continuidad y trazabilidad coherente con el área médica y el diseño real.
          </p>
        </div>
      )}
    </section>
  );
}
