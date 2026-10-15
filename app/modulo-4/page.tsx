import type { Metadata } from "next";
import { ArrowRight, Cpu, Factory, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";
import ModuleHeader from "@/components/ModuleHeader";
import NormativeNotice from "@/components/NormativeNotice";
import Quiz, { type QuizQuestion } from "@/components/Quiz";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Módulo 4 · Casos de Estudio"
};

const cases = [
  {
    id: "industrial",
    icon: Factory,
    title: "Celda de automatización industrial",
    subtitle: "Trazabilidad entre seguridad eléctrica, EMC, red industrial y ciberseguridad",
    context:
      "Se moderniza una celda con PLC, variadores, sensores y comunicación Ethernet. El diseño debe convivir con ruido electromagnético, mantenimiento, polvo y acceso remoto.",
    standards: [
      ["RETIE 2026", "Seguridad de la instalación eléctrica en Colombia y requisitos de puesta a tierra aplicables."],
      ["IEC 62443", "Zonas, conductos, requisitos de seguridad y gestión del riesgo cibernético en IACS."],
      ["IEC 60529 / NEMA 250", "Selección de envolvente según peligro ambiental y sistema de clasificación realmente certificado."],
      ["ANSI/TIA-1005 / TIA-568", "Infraestructura de telecomunicaciones en entornos industriales y cableado estructurado, según alcance del proyecto."]
    ],
    decisions: [
      {
        title: "Separar potencia y datos con criterio EMC",
        why:
          "Variadores y motores introducen perturbaciones conducidas y radiadas. La solución combina ruta de cableado, apantallamiento, puesta a tierra y compatibilidad de interfaces; no basta con elegir “cable STP”."
      },
      {
        title: "Definir zonas de seguridad antes de abrir acceso remoto",
        why:
          "IEC 62443 ayuda a agrupar activos con necesidades comunes y a controlar el tráfico entre zonas mediante conductos y políticas explícitas."
      },
      {
        title: "Seleccionar envolvente por exposición real",
        why:
          "El código IP o tipo NEMA debe responder a polvo, agua, corrosión, limpieza y montaje. Una equivalencia informal entre tablas no sustituye la certificación."
      },
      {
        title: "Dimensionar la puesta a tierra por riesgo, no por un único número",
        why:
          "RETIE 2026 enfatiza tensiones de paso, contacto y transferidas; la resistencia de puesta a tierra es un indicador, no el único criterio de seguridad."
      }
    ]
  },
  {
    id: "medical",
    icon: Stethoscope,
    title: "Monitor ECG con conectividad",
    subtitle: "Parte aplicada al paciente, software, EMC y gestión de riesgos",
    context:
      "Se diseña un monitor ECG que adquiere biopotenciales, procesa señal y transmite información. La arquitectura debe proteger al paciente y demostrar que una falla previsible no compromete la función clínica.",
    standards: [
      ["IEC 60601-1", "Seguridad básica y desempeño esencial; clase de protección y tipo de parte aplicada son conceptos distintos."],
      ["IEC 60601-1-2", "Compatibilidad electromagnética en el entorno electromédico."],
      ["IEC 62304", "Procesos del ciclo de vida del software médico y clasificación de seguridad A/B/C."],
      ["ISO 14971", "Gestión de riesgos del dispositivo médico a lo largo de su ciclo de vida."],
      ["ISO 13485", "Sistema de gestión de calidad aplicable a organizaciones de dispositivos médicos."]
    ],
    decisions: [
      {
        title: "Justificar el tipo de parte aplicada",
        why:
          "B, BF y CF describen protección asociada a la parte aplicada. Si la aplicación exige CF, el diseño de aislamiento y las corrientes admisibles deben verificarse contra la norma y la configuración concreta."
      },
      {
        title: "Clasificar el software antes de definir la evidencia",
        why:
          "IEC 62304 relaciona la clase de seguridad con el daño posible de una falla. La clase condiciona la profundidad de procesos y evidencia exigidos."
      },
      {
        title: "Vincular cada riesgo con controles verificables",
        why:
          "ISO 14971 exige identificar peligros, estimar/evaluar riesgos y demostrar que las medidas de control reducen el riesgo de forma verificable."
      },
      {
        title: "Tratar EMC como requisito funcional",
        why:
          "En un equipo médico, inmunidad y emisiones no son una prueba tardía: pueden afectar desempeño esencial, integridad de señal y seguridad del paciente."
      }
    ]
  }
];

const questions: QuizQuestion[] = [
  {
    id: "m4-q1",
    question: "En un monitor ECG, ¿qué estándar se relaciona directamente con procesos del ciclo de vida del software médico?",
    options: ["IEC 62304", "ANSI/TIA-568", "IEC 60529", "NFPA 72"],
    correct: 0,
    explanation:
      "IEC 62304 organiza procesos del ciclo de vida del software médico y su clasificación de seguridad."
  },
  {
    id: "m4-q2",
    question: "¿Cuál es la mejor forma de usar IEC 62443 al diseñar acceso remoto a una celda industrial?",
    options: [
      "Abrir el PLC directamente a Internet.",
      "Definir zonas, conductos, flujos autorizados y controles coherentes con el riesgo.",
      "Cambiar todos los cables a Cat 8 sin analizar arquitectura.",
      "Usar un código IP más alto."
    ],
    correct: 1,
    explanation:
      "La segmentación y control de comunicaciones debe responder a una arquitectura de seguridad, no a una solución aislada."
  },
  {
    id: "m4-q3",
    question: "¿Cuál afirmación sobre IEC 60601-1 es correcta?",
    options: [
      "Clase II y tipo CF son sinónimos.",
      "Clase de protección del equipo y tipo de parte aplicada son clasificaciones distintas.",
      "Solo aplica a cableado de edificios.",
      "Reemplaza ISO 14971."
    ],
    correct: 1,
    explanation:
      "La norma distingue mecanismos de protección del equipo y tipos de partes aplicadas al paciente; no deben confundirse."
  }
];

export default function Module4Page() {
  return (
    <div className="pb-12">
      <ModuleHeader
        module="Módulo 04"
        title="Casos de Estudio y Entornos de Aplicación"
        description="La competencia normativa aparece cuando varias exigencias coinciden. Estos casos muestran cómo convertir una lista de normas en decisiones de arquitectura, evidencia y verificación."
        icon={Cpu}
      />

      <NormativeNotice>
        Los casos son didácticos: muestran razonamiento de ingeniería, no sustituyen una evaluación de conformidad, diseño firmado o ensayo acreditado.
      </NormativeNotice>

      <div className="mt-8 space-y-6">
        {cases.map((item, caseIndex) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.id}>
              <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">
                <header className="border-b border-slate-800 bg-gradient-to-r from-blue-500/10 to-cyan-400/5 p-5 md:p-6">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                      <Icon className="h-5 w-5 text-blue-300" />
                    </span>
                    <div>
                      <p className="eyebrow">Caso {caseIndex + 1}</p>
                      <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">{item.title}</h2>
                      <p className="mt-1 text-sm text-slate-400">{item.subtitle}</p>
                    </div>
                  </div>
                </header>

                <div className="p-5 md:p-6">
                  <p className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-sm leading-6 text-slate-400">
                    <strong className="text-slate-200">Contexto: </strong>{item.context}
                  </p>

                  <div className="mt-6">
                    <h3 className="flex items-center gap-2 font-bold text-white">
                      <ShieldCheck className="h-4 w-4 text-blue-300" /> Normas que participan
                    </h3>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      {item.standards.map(([name, role]) => (
                        <div key={name} className="rounded-xl border border-slate-800 bg-slate-950/25 p-3">
                          <p className="font-mono text-xs font-bold text-cyan-200">{name}</p>
                          <p className="mt-1 text-xs leading-5 text-slate-500">{role}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-bold text-white">Decisiones de diseño</h3>
                    <div className="mt-3 space-y-3">
                      {item.decisions.map((decision) => (
                        <article key={decision.title} className="rounded-xl border border-slate-800 bg-slate-950/25 p-4">
                          <div className="flex items-start gap-3">
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                            <div>
                              <p className="text-sm font-semibold text-slate-200">{decision.title}</p>
                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                <span className="font-semibold text-cyan-200">Porqué técnico: </span>
                                {decision.why}
                              </p>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-10">
        <Quiz title="Módulo 4 · Casos de estudio" questions={questions} />
      </div>
    </div>
  );
}
