import type { Metadata } from "next";
import { Braces, ClipboardList, FileText, Quote, SearchCheck, TriangleAlert } from "lucide-react";
import IEEEValidator from "@/components/IEEEValidator";
import ModuleHeader from "@/components/ModuleHeader";
import NormativeNotice from "@/components/NormativeNotice";
import Quiz, { type QuizQuestion } from "@/components/Quiz";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Módulo 3 · Informes Académicos IEEE"
};

const sections = [
  {
    title: "Título y autores",
    icon: FileText,
    text: "Título específico, conciso y descriptivo. Los datos de autoría deben seguir la plantilla de la publicación."
  },
  {
    title: "Abstract",
    icon: SearchCheck,
    text: "Resumen autocontenido del trabajo: propósito, método, resultados y conclusiones/implicaciones relevantes. IEEE Author Center indica un solo párrafo de hasta 250 palabras; la publicación objetivo manda."
  },
  {
    title: "Index Terms",
    icon: Braces,
    text: "IEEE Author Center recomienda 3–5 palabras clave o frases que faciliten la recuperación del artículo; define abreviaturas cuando corresponda."
  },
  {
    title: "Cuerpo técnico",
    icon: ClipboardList,
    text: "Introducción, metodología, resultados y discusión deben permitir entender qué problema se resolvió, cómo se hizo y qué significan los resultados."
  },
  {
    title: "Citas y referencias",
    icon: Quote,
    text: "Las referencias se numeran en el orden de aparición. Cada cita debe apuntar a una fuente realmente consultada y pertinente."
  }
];

const questions: QuizQuestion[] = [
  {
    id: "m3-q1",
    question: "¿Cuál afirmación es más precisa sobre la extensión del abstract IEEE?",
    options: [
      "Todos los documentos IEEE, sin excepción, exigen exactamente 150–250 palabras.",
      "IEEE Author Center recomienda un solo párrafo de hasta 250 palabras, y deben revisarse además las instrucciones de la publicación o conferencia específica.",
      "IEEE exige siempre menos de 100 palabras.",
      "No existe ninguna recomendación de extensión."
    ],
    correct: 1,
    explanation:
      "IEEE Author Center indica un único párrafo de hasta 250 palabras. El journal o la conferencia objetivo puede añadir restricciones específicas, por lo que su plantilla prevalece."
  },
  {
    id: "m3-q2",
    question: "¿Qué NO debería aparecer en un abstract autocontenido según la guía general de IEEE?",
    options: [
      "Resultados principales.",
      "Propósito de la investigación.",
      "Referencias numeradas y ecuaciones.",
      "Conclusiones o implicaciones."
    ],
    correct: 2,
    explanation:
      "IEEE indica que el abstract debe ser autocontenido y evitar referencias, notas al pie y ecuaciones matemáticas."
  },
  {
    id: "m3-q3",
    question: "¿Cuál es una formulación correcta sobre la primera persona?",
    options: [
      "Está explícitamente prohibida en todo texto IEEE.",
      "Es obligatoria en el abstract.",
      "No debe presentarse como prohibición universal; el estilo y la publicación objetivo determinan su conveniencia.",
      "Solo se permite en las referencias."
    ],
    correct: 2,
    explanation:
      "El sitio original convertía una preferencia estilística en una prohibición universal. La guía oficial consultada no formula esa regla de ese modo."
  }
];

export default function Module3Page() {
  return (
    <div className="pb-12">
      <ModuleHeader
        module="Módulo 03"
        title="Documentación Técnica para Informes Académicos IEEE"
        description="El formato no es decoración: reduce ambigüedad y hace comparable la evidencia. La regla operativa es simple: primero sigue la plantilla del journal o conferencia; después aplica la guía editorial general."
        icon={ClipboardList}
      />

      <NormativeNotice>
        <strong className="text-amber-100">Corrección académica:</strong> el sitio original afirmaba que la primera persona está “explícitamente prohibida” y fijaba 4–6 keywords. La guía general revisada prioriza un abstract autocontenido y recomienda 3–5 keywords; las reglas concretas del venue prevalecen.
      </NormativeNotice>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5" aria-label="Estructura IEEE">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Reveal key={section.title} delay={index * 0.04}>
              <article className="interactive-card h-full p-4">
                <Icon className="h-5 w-5 text-blue-300" />
                <h2 className="mt-3 text-sm font-bold text-white">{section.title}</h2>
                <p className="mt-2 text-xs leading-5 text-slate-400">{section.text}</p>
              </article>
            </Reveal>
          );
        })}
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
        <div className="interactive-card p-5">
          <div className="flex items-center gap-2">
            <TriangleAlert className="h-5 w-5 text-amber-300" />
            <h2 className="font-bold text-white">Errores frecuentes</h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
            <li><strong className="text-slate-200">Abstract descriptivo sin resultados:</strong> cuenta qué se hizo, pero no qué se obtuvo.</li>
            <li><strong className="text-slate-200">Afirmaciones sin evidencia:</strong> “mejor”, “robusto” o “eficiente” sin métrica ni comparación.</li>
            <li><strong className="text-slate-200">Figura huérfana:</strong> aparece una gráfica que no se interpreta en el texto.</li>
            <li><strong className="text-slate-200">Referencia inconsistente:</strong> la cita [n] existe en texto, pero no corresponde o falta en la lista.</li>
            <li><strong className="text-slate-200">Plantilla ignorada:</strong> aplicar una guía genérica en lugar de la plantilla oficial del evento o revista.</li>
          </ul>
        </div>

        <IEEEValidator />
      </section>

      <div className="mt-10">
        <Quiz title="Módulo 3 · Informes IEEE" questions={questions} />
      </div>
    </div>
  );
}
