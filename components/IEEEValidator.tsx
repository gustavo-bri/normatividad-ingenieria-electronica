"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, FileCheck2, Info, XCircle } from "lucide-react";
import { countWords, validateAbstract } from "@/lib/ieee-validator";

export default function IEEEValidator() {
  const [text, setText] = useState("");
  const [keywords, setKeywords] = useState("");

  const rules = useMemo(() => validateAbstract(text, keywords), [text, keywords]);
  const passed = rules.filter((rule) => rule.passed).length;
  const words = countWords(text);
  const hasInput = text.trim().length > 0 || keywords.trim().length > 0;

  return (
    <section className="interactive-card p-5 md:p-7" aria-labelledby="ieee-validator-title">
      <div className="mb-6 flex items-start gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10">
          <FileCheck2 className="h-5 w-5 text-cyan-300" />
        </span>
        <div>
          <h2 id="ieee-validator-title" className="text-lg font-bold text-white">
            Pre-validador de abstract IEEE
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Chequeo heurístico en tiempo real. No sustituye la plantilla ni las instrucciones de la publicación destino.
          </p>
        </div>
      </div>

      <label htmlFor="abstract-text" className="text-sm font-semibold text-slate-200">
        Abstract
      </label>
      <textarea
        id="abstract-text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Pega aquí el abstract en español o inglés…"
        className="mt-2 h-44 w-full resize-y rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm leading-6 text-slate-200 placeholder:text-slate-600 focus:border-cyan-400/60"
      />
      <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-slate-500">
        <span>
          Palabras: <strong className={words > 0 && words <= 250 ? "text-emerald-300" : "text-slate-300"}>{words}</strong>
        </span>
        <span aria-live="polite">{passed}/5 comprobaciones superadas</span>
      </div>

      <label htmlFor="keywords-text" className="mt-5 block text-sm font-semibold text-slate-200">
        Palabras clave / Index Terms
      </label>
      <input
        id="keywords-text"
        value={keywords}
        onChange={(event) => setKeywords(event.target.value)}
        placeholder="sensores, trazabilidad, sistemas embebidos"
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-cyan-400/60"
      />

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-300 transition-[width] duration-300"
          style={{ width: `${(passed / 5) * 100}%` }}
        />
      </div>

      <div className="mt-5 space-y-3">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`rounded-xl border p-3.5 ${
              rule.passed
                ? "border-emerald-400/20 bg-emerald-400/5"
                : "border-slate-700 bg-slate-950/25"
            }`}
          >
            <div className="flex items-start gap-3">
              {rule.passed ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              ) : hasInput ? (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
              ) : (
                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
              )}
              <div>
                <p className="text-sm font-semibold text-slate-200">{rule.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{rule.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-2 rounded-xl border border-blue-400/20 bg-blue-500/5 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
        <p className="text-xs leading-5 text-slate-400">
          La guía general de IEEE prioriza que el abstract sea conciso, autocontenido y refleje la investigación. Reglas exactas de extensión o formato pueden variar entre journals y conferencias.
        </p>
      </div>
    </section>
  );
}
