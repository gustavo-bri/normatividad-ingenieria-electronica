"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, RotateCcw, XCircle } from "lucide-react";

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export default function Quiz({
  title,
  questions
}: {
  title: string;
  questions: QuizQuestion[];
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const answered = selected !== null;
  const question = questions[current];

  const choose = (index: number) => {
    if (answered) return;
    setSelected(index);
    if (index === question.correct) setScore((value) => value + 1);
  };

  const next = () => {
    if (!answered) return;
    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }
    setCurrent((value) => value + 1);
    setSelected(null);
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (!questions.length) return null;

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <section className="interactive-card p-6 text-center md:p-8" aria-live="polite">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-cyan-400/20 bg-cyan-400/5">
          <span className="font-mono text-2xl font-black text-cyan-200">{percentage}%</span>
        </div>
        <h2 className="mt-5 text-xl font-bold text-white">Evaluación completada</h2>
        <p className="mt-2 text-sm text-slate-400">
          {score} de {questions.length} respuestas correctas.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
          {percentage >= 80
            ? "Buen dominio conceptual. Revisa aun así las explicaciones y las fuentes normativas."
            : percentage >= 60
            ? "Hay una base funcional, pero conviene repasar los puntos con error antes de avanzar."
            : "Repasa el módulo y vuelve a intentarlo; las explicaciones indican qué concepto revisar."}
        </p>
        <button type="button" className="primary-button mt-6" onClick={reset}>
          <RotateCcw className="h-4 w-4" /> Reintentar
        </button>
      </section>
    );
  }

  return (
    <section className="interactive-card p-5 md:p-7" aria-labelledby={`quiz-${question.id}`}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Autoevaluación</p>
          <h2 className="mt-1 text-lg font-bold text-white">{title}</h2>
        </div>
        <span className="font-mono text-xs text-slate-500">{current + 1}/{questions.length}</span>
      </div>

      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-300 transition-[width] duration-300"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <fieldset>
        <legend id={`quiz-${question.id}`} className="mb-5 text-base font-semibold leading-7 text-slate-100">
          {question.question}
        </legend>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const correct = index === question.correct;
            const chosen = index === selected;
            const classes = answered
              ? correct
                ? "border-emerald-400/40 bg-emerald-400/10"
                : chosen
                ? "border-rose-400/40 bg-rose-400/10"
                : "border-slate-800 bg-slate-950/25 opacity-70"
              : "border-slate-700 bg-slate-900/50 hover:border-slate-600";

            return (
              <button
                type="button"
                key={`${question.id}-${index}`}
                className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition ${classes}`}
                onClick={() => choose(index)}
                disabled={answered}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-600 font-mono text-xs text-slate-400">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 text-slate-200">{option}</span>
                {answered && correct && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />}
                {answered && chosen && !correct && <XCircle className="h-5 w-5 shrink-0 text-rose-300" />}
              </button>
            );
          })}
        </div>
      </fieldset>

      {answered && (
        <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4" aria-live="polite">
          <p className="text-sm leading-6 text-slate-300">
            <span className="font-semibold text-cyan-200">Retroalimentación: </span>
            {question.explanation}
          </p>
        </div>
      )}

      <button
        type="button"
        className="primary-button ml-auto mt-5"
        onClick={next}
        disabled={!answered}
      >
        {current === questions.length - 1 ? "Ver resultados" : "Siguiente"}
        <ChevronRight className="h-4 w-4" />
      </button>
    </section>
  );
}
