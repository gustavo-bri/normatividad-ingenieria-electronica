"use client";

import { useMemo, useState } from "react";
import { Droplets, ShieldCheck, Sparkles, TriangleAlert } from "lucide-react";
import { applicationHint, ipCode, liquidLevels, solidLevels } from "@/lib/ip-data";

const presets = [
  { label: "IP20", solid: 2, liquid: 0 },
  { label: "IP44", solid: 4, liquid: 4 },
  { label: "IP54", solid: 5, liquid: 4 },
  { label: "IP65", solid: 6, liquid: 5 },
  { label: "IP67", solid: 6, liquid: 7 },
  { label: "IP68", solid: 6, liquid: 8 },
  { label: "IP69", solid: 6, liquid: 9 }
];

export default function IPSimulator() {
  const [solid, setSolid] = useState(5);
  const [liquid, setLiquid] = useState(4);

  const code = useMemo(() => ipCode(solid, liquid), [solid, liquid]);

  return (
    <section className="interactive-card p-5 md:p-7" aria-labelledby="ip-title">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10">
            <ShieldCheck className="h-5 w-5 text-blue-300" />
          </span>
          <div>
            <h2 id="ip-title" className="text-lg font-bold text-white">
              Simulador de grado de protección IP
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Modifica ambos dígitos y observa qué condición de ensayo representa cada uno.
            </p>
          </div>
        </div>
        <div
          className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-3 text-center"
          aria-live="polite"
        >
          <span className="block text-[10px] uppercase tracking-[.18em] text-slate-500">Código</span>
          <span className="font-mono text-3xl font-black tracking-tight text-cyan-200">{code}</span>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2" aria-label="Valores predefinidos">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            className={`chip transition hover:border-cyan-400/40 hover:text-white ${
              solid === preset.solid && liquid === preset.liquid
                ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                : ""
            }`}
            onClick={() => {
              setSolid(preset.solid);
              setLiquid(preset.liquid);
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
          <label htmlFor="solid-ip" className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-200">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-300" />
              Primer dígito — sólidos
            </span>
            <span className="font-mono text-blue-300">{solid}</span>
          </label>
          <input
            id="solid-ip"
            className="range-control mt-4 w-full"
            type="range"
            min={0}
            max={6}
            step={1}
            value={solid}
            onChange={(event) => setSolid(Number(event.target.value))}
            aria-valuetext={`${solid}: ${solidLevels[solid].short}`}
          />
          <div className="mt-4 rounded-xl border border-blue-400/20 bg-blue-500/5 p-4">
            <p className="font-semibold text-blue-200">{solidLevels[solid].short}</p>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              {solidLevels[solid].description}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
          <label htmlFor="liquid-ip" className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-200">
            <span className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-cyan-300" />
              Segundo dígito — agua
            </span>
            <span className="font-mono text-cyan-300">{liquid}</span>
          </label>
          <input
            id="liquid-ip"
            className="range-control mt-4 w-full"
            type="range"
            min={0}
            max={9}
            step={1}
            value={liquid}
            onChange={(event) => setLiquid(Number(event.target.value))}
            aria-valuetext={`${liquid}: ${liquidLevels[liquid].short}`}
          />
          <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
            <p className="font-semibold text-cyan-200">{liquidLevels[liquid].short}</p>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              {liquidLevels[liquid].description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1.3fr_.7fr]">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            Lectura de selección
          </div>
          <p className="text-sm leading-6 text-slate-400">{applicationHint(solid, liquid)}</p>
        </div>
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-200">
            <TriangleAlert className="h-4 w-4" />
            Precaución
          </div>
          <p className="text-xs leading-5 text-slate-400">
            Los ensayos de agua no son completamente acumulativos, especialmente entre chorros e inmersión. Un número mayor no sustituye la lectura del certificado y de las condiciones de ensayo.
          </p>
        </div>
      </div>
    </section>
  );
}
