import type { Metadata } from "next";
import { BookOpenCheck, CircleAlert } from "lucide-react";
import ExerciseStepper from "@/components/ExerciseStepper";
import ModuleHeader from "@/components/ModuleHeader";
import NormativeNotice from "@/components/NormativeNotice";
import Quiz, { type QuizQuestion } from "@/components/Quiz";

export const metadata: Metadata = {
  title: "Ejercicio Práctico · Quirófano"
};

const questions: QuizQuestion[] = [
  {
    id: "ex-q1",
    question: "¿Qué error conceptual había en conectar el neutro del transformador de aislamiento directamente a tierra?",
    options: [
      "Ninguno; es obligatorio en todo sistema IT médico.",
      "Convertiría el secundario aislado en un sistema puesto a tierra y contradice el principio del sistema IT.",
      "Solo cambia el color del conductor.",
      "Aumenta automáticamente el grado IP."
    ],
    correct: 1,
    explanation:
      "El sistema IT mantiene los conductores activos aislados de tierra o conectados mediante alta impedancia, mientras las masas sí conservan protección/equipotencialidad."
  },
  {
    id: "ex-q2",
    question: "¿Por qué no debe adoptarse un valor único de resistencia de puesta a tierra como único criterio de seguridad?",
    options: [
      "Porque nunca se mide la resistencia.",
      "Porque RETIE también exige controlar tensiones de paso, contacto y transferidas y considerar el diseño completo.",
      "Porque la puesta a tierra no existe en hospitales.",
      "Porque solo importa la potencia del transformador."
    ],
    correct: 1,
    explanation:
      "RETIE 2026 señala que el criterio fundamental es la energía/tensiones de exposición que una persona puede soportar; la resistencia es un indicador relevante, no una garantía aislada."
  }
];

export default function ExercisePage() {
  return (
    <div className="pb-12">
      <ModuleHeader
        module="Ejercicio práctico"
        title="Sistema de puesta a tierra y protección eléctrica para un quirófano"
        description="Caso guiado bajo RETIE vigente: el objetivo es decidir qué debe documentarse y verificarse antes de fijar calibres, topologías o valores numéricos. El porqué técnico acompaña cada paso."
        icon={BookOpenCheck}
      />

      <NormativeNotice>
        <strong className="text-amber-100">Alcance:</strong> ejercicio académico. Un diseño real requiere persona competente, memoria de cálculo, características del sistema, corriente de falla, resistividad del terreno, coordinación de protecciones, equipos certificados e inspección conforme al reglamento vigente.
      </NormativeNotice>

      <div className="mt-8 flex gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/5 p-4">
        <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
        <p className="text-sm leading-6 text-slate-400">
          Se eliminaron prescripciones del sitio original que podían inducir a error —como imponer 1 Ω al quirófano, fijar AWG 2/0 y 0,8 m sin cálculo o aterrizar directamente el secundario del transformador de aislamiento—. La versión corregida enseña a derivar el diseño desde el riesgo y la norma vigente.
        </p>
      </div>

      <div className="mt-8">
        <ExerciseStepper />
      </div>

      <div className="mt-10">
        <Quiz title="Comprobación del ejercicio" questions={questions} />
      </div>
    </div>
  );
}
