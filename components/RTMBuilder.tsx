"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, Download, Link2, Plus, RotateCcw, Trash2 } from "lucide-react";
import { coverage, getStatus, toCSV, type RTMRow } from "@/lib/rtm";

const STORAGE_KEY = "normeng-rtm-v2";

const sampleRows: RTMRow[] = [
  {
    id: "req-001",
    requirement: "REQ-001 · El sistema debe medir temperatura con incertidumbre documentada.",
    implementation: "Sensor digital + rutina de adquisición + calibración.",
    verification: "VT-001 · Comparación contra instrumento patrón y registro de resultados."
  },
  {
    id: "req-002",
    requirement: "REQ-002 · La comunicación debe detectar pérdida de enlace.",
    implementation: "Heartbeat + timeout + estado de falla.",
    verification: ""
  },
  {
    id: "req-003",
    requirement: "REQ-003 · El consumo debe permanecer dentro del presupuesto energético.",
    implementation: "",
    verification: ""
  }
];

function isRTMRows(value: unknown): value is RTMRow[] {
  return Array.isArray(value) && value.length > 0 && value.every((row) => {
    if (!row || typeof row !== "object") return false;
    const item = row as Record<string, unknown>;
    return ["id", "requirement", "implementation", "verification"].every(
      (field) => typeof item[field] === "string"
    );
  });
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `row-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function RTMBuilder() {
  const [rows, setRows] = useState<RTMRow[]>(sampleRows);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (isRTMRows(parsed)) setRows(parsed);
      }
    } catch {
      // Si localStorage contiene datos dañados, se conserva el ejemplo seguro.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    } catch {
      // La matriz sigue funcionando aunque el navegador bloquee o limite el almacenamiento local.
    }
  }, [rows, hydrated]);

  const percent = useMemo(() => coverage(rows), [rows]);
  const complete = rows.filter((row) => getStatus(row) === "complete").length;

  const update = (id: string, field: keyof Omit<RTMRow, "id">, value: string) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const add = () => {
    setRows((current) => [
      ...current,
      { id: makeId(), requirement: "", implementation: "", verification: "" }
    ]);
  };

  const remove = (id: string) => {
    setRows((current) => {
      const next = current.filter((row) => row.id !== id);
      return next.length ? next : [{ id: makeId(), requirement: "", implementation: "", verification: "" }];
    });
  };

  const reset = () => {
    setRows(sampleRows);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Sin almacenamiento disponible, basta restaurar el estado en memoria.
    }
  };

  const exportCSV = () => {
    const blob = new Blob([`\uFEFF${toCSV(rows)}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "matriz-trazabilidad-rtm.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <section className="interactive-card p-5 md:p-7" aria-labelledby="rtm-title">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/10">
            <Link2 className="h-5 w-5 text-violet-300" />
          </span>
          <div>
            <h2 id="rtm-title" className="text-lg font-bold text-white">
              Constructor de Matriz de Trazabilidad (RTM)
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Relaciona requisito → implementación → evidencia de verificación.
            </p>
          </div>
        </div>

        <div className="min-w-28 rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-2 text-right">
          <p className="text-[10px] uppercase tracking-[.16em] text-slate-500">Cobertura</p>
          <p className="font-mono text-lg font-bold text-cyan-200">{complete}/{rows.length} · {percent}%</p>
        </div>
      </div>

      <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-800" aria-label={`Cobertura RTM ${percent}%`}>
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-cyan-300 transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="space-y-3">
        {rows.map((row, index) => {
          const status = getStatus(row);
          return (
            <article key={row.id} className="rounded-2xl border border-slate-800 bg-slate-950/30 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-500">#{index + 1}</span>
                  <span className={`chip ${
                    status === "complete"
                      ? "border-emerald-400/20 text-emerald-300"
                      : status === "partial"
                      ? "border-amber-400/20 text-amber-300"
                      : "text-slate-500"
                  }`}>
                    {status === "complete" ? "Trazado" : status === "partial" ? "Parcial" : "Pendiente"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => remove(row.id)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-300"
                  aria-label={`Eliminar fila ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-3 lg:grid-cols-3">
                <label className="text-xs font-semibold text-slate-400">
                  Requisito
                  <textarea
                    value={row.requirement}
                    onChange={(event) => update(row.id, "requirement", event.target.value)}
                    placeholder="REQ-004 · Descripción verificable…"
                    className="mt-1.5 min-h-24 w-full rounded-xl border border-slate-700 bg-slate-900/50 p-3 text-sm font-normal leading-5 text-slate-200 placeholder:text-slate-600"
                  />
                </label>
                <label className="text-xs font-semibold text-slate-400">
                  Implementación
                  <textarea
                    value={row.implementation}
                    onChange={(event) => update(row.id, "implementation", event.target.value)}
                    placeholder="Componente, módulo, plano o código…"
                    className="mt-1.5 min-h-24 w-full rounded-xl border border-slate-700 bg-slate-900/50 p-3 text-sm font-normal leading-5 text-slate-200 placeholder:text-slate-600"
                  />
                </label>
                <label className="text-xs font-semibold text-slate-400">
                  Verificación
                  <textarea
                    value={row.verification}
                    onChange={(event) => update(row.id, "verification", event.target.value)}
                    placeholder="Ensayo, inspección, análisis o evidencia…"
                    className="mt-1.5 min-h-24 w-full rounded-xl border border-slate-700 bg-slate-900/50 p-3 text-sm font-normal leading-5 text-slate-200 placeholder:text-slate-600"
                  />
                </label>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={add} className="primary-button">
          <Plus className="h-4 w-4" /> Agregar fila
        </button>
        <button type="button" onClick={exportCSV} className="secondary-button">
          <Download className="h-4 w-4" /> Exportar CSV
        </button>
        <button type="button" onClick={reset} className="secondary-button">
          <RotateCcw className="h-4 w-4" /> Restaurar ejemplo
        </button>
      </div>

      <div className="mt-5 flex gap-2 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
        {percent === 100 ? (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
        ) : (
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
        )}
        <p className="text-xs leading-5 text-slate-400">
          La cobertura indica cuántas filas tienen los tres eslabones diligenciados. No evalúa por sí sola la calidad del requisito ni la suficiencia de la evidencia.
        </p>
      </div>
    </section>
  );
}
