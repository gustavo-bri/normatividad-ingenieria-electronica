import type { Metadata } from "next";
import {
  Cable,
  Car,
  CircuitBoard,
  Factory,
  Globe2,
  HeartPulse,
  Landmark,
  Leaf,
  Network,
  Radio,
  ShieldCheck,
  Siren,
  Zap
} from "lucide-react";
import IPSimulator from "@/components/IPSimulator";
import ModuleHeader from "@/components/ModuleHeader";
import NormativeNotice from "@/components/NormativeNotice";
import Quiz, { type QuizQuestion } from "@/components/Quiz";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Módulo 1 · Normas y Estándares Técnicos"
};

const standards = [
  {
    name: "ISO/IEC 29182",
    category: "Redes de sensores",
    icon: Network,
    description:
      "Serie de arquitectura de referencia para redes de sensores (SNRA): requisitos generales, vocabulario, vistas de arquitectura, modelos de entidades, interfaces, aplicaciones e interoperabilidad.",
    analogy: "Funciona como el plano de una ciudad inteligente: define quién existe, cómo se relaciona y por qué vías intercambia información."
  },
  {
    name: "RETIE 2026 / RETILAP 2026",
    category: "Colombia",
    icon: Zap,
    description:
      "RETIE regula la seguridad de instalaciones eléctricas; RETILAP regula sistemas de iluminación y alumbrado público. Son reglamentos distintos y ambos fueron modificados en junio de 2026.",
    analogy: "Uno controla la seguridad de la infraestructura eléctrica; el otro, la calidad y seguridad de la infraestructura de iluminación."
  },
  {
    name: "IPC-A-610 / J-STD-001",
    category: "Ensamblaje",
    icon: CircuitBoard,
    description:
      "IPC-A-610 establece criterios de aceptabilidad de ensambles electrónicos; J-STD-001 define requisitos para materiales y procesos de soldadura de ensambles eléctricos y electrónicos.",
    analogy: "La receta de cocina estandarizada y la lista de criterios para decidir si el plato terminado es aceptable."
  },
  {
    name: "FCC Part 15",
    category: "EE. UU. · RF/EMC",
    icon: Radio,
    description:
      "Regula, dentro de la jurisdicción de Estados Unidos, emisiones de dispositivos intencionales y no intencionales. Su aplicabilidad depende del tipo de producto y del mercado de destino.",
    analogy: "Es control de tráfico para el espectro: limita cuánto puede interferir un equipo con los demás."
  },
  {
    name: "IATF 16949",
    category: "Automotriz",
    icon: Car,
    description:
      "Especifica requisitos del sistema de gestión de calidad para la cadena automotriz, complementando ISO 9001 con enfoque en prevención de defectos, reducción de variación y trazabilidad.",
    analogy: "Una disciplina de proceso diseñada para que la calidad no dependa de la suerte de un lote."
  },
  {
    name: "IEC 60529 / NEMA 250",
    category: "Envolventes",
    icon: ShieldCheck,
    description:
      "IEC 60529 define el código IP; NEMA 250 clasifica envolventes con criterios propios. No existe una equivalencia universal uno-a-uno entre ambos sistemas.",
    analogy: "Dos sistemas de evaluación que describen resistencia ambiental desde criterios relacionados, pero no idénticos."
  },
  {
    name: "ANSI/TIA-568",
    category: "Cableado",
    icon: Cable,
    description:
      "Familia de estándares de cableado estructurado para telecomunicaciones. Define arquitectura, medios, desempeño y prácticas de instalación según el entorno.",
    analogy: "El código vial de los datos: especifica carriles, enlaces y reglas para que el tráfico de información llegue con desempeño predecible."
  },
  {
    name: "RoHS / REACH",
    category: "Sustancias",
    icon: Leaf,
    description:
      "RoHS restringe determinadas sustancias peligrosas en equipos eléctricos y electrónicos de la UE; REACH aborda registro, evaluación, autorización y restricción de sustancias químicas.",
    analogy: "Una lista de ingredientes controlados y un sistema para justificar qué sustancias entran al producto."
  },
  {
    name: "IEC 62443",
    category: "Ciberseguridad industrial",
    icon: Factory,
    description:
      "Serie para seguridad de sistemas de automatización y control industrial: ciclo de vida, requisitos de componentes y sistemas, segmentación mediante zonas y conductos y niveles de seguridad.",
    analogy: "Seguridad por capas: no basta una puerta; cada zona tiene activos, fronteras y controles coherentes con su riesgo."
  },
  {
    name: "NFPA 70 / NFPA 72",
    category: "EE. UU. · seguridad",
    icon: Siren,
    description:
      "NFPA 70 (NEC) aborda instalaciones eléctricas; NFPA 72 cubre sistemas de alarma y señalización de incendios. Son referencias de gran uso, pero su obligatoriedad depende de la jurisdicción.",
    analogy: "Manuales de seguridad codificados a partir de riesgos reales de instalación y operación."
  },
  {
    name: "IEC 60601-1",
    category: "Equipos electromédicos",
    icon: HeartPulse,
    description:
      "Norma general de seguridad básica y desempeño esencial de equipos electromédicos. Distingue, entre otros conceptos, clase de protección y tipo de parte aplicada B, BF o CF.",
    analogy: "El escudo del paciente: limita peligros eléctricos, mecánicos y funcionales cuando el equipo participa en la atención clínica."
  },
  {
    name: "IEC 62304",
    category: "Software médico",
    icon: Globe2,
    description:
      "Define procesos del ciclo de vida del software de dispositivos médicos y clases de seguridad A, B y C según el daño posible asociado a una falla del software.",
    analogy: "Una cadena de custodia para el código: cada decisión de software debe dejar evidencia proporcional al riesgo."
  }
];

const questions: QuizQuestion[] = [
  {
    id: "m1-q1",
    question: "¿Qué afirmación describe correctamente la relación entre IEC 60529 y NEMA 250?",
    options: [
      "Son sistemas idénticos y cualquier IP se convierte directamente a un tipo NEMA.",
      "IEC 60529 define el código IP y NEMA 250 usa una clasificación propia; no hay equivalencia universal uno-a-uno.",
      "NEMA 250 solo aplica a software industrial.",
      "IEC 60529 solo evalúa corrosión química."
    ],
    correct: 1,
    explanation:
      "Ambos tratan protección de envolventes, pero los métodos y alcances no son idénticos. Una tabla de aproximación nunca sustituye el ensayo/certificación del sistema correspondiente."
  },
  {
    id: "m1-q2",
    question: "En Colombia, ¿qué pareja de reglamentos es correcta?",
    options: [
      "RETIE para instalaciones eléctricas y RETILAP para iluminación y alumbrado público.",
      "RETIELAB para laboratorios y RETIE para telecomunicaciones.",
      "RETILAP para software médico y RETIE para radiofrecuencia.",
      "RETIE y RETILAP son dos nombres del mismo reglamento."
    ],
    correct: 0,
    explanation:
      "RETIE y RETILAP son reglamentos diferentes del Ministerio de Minas y Energía. El término RETIELAB no corresponde a uno de los reglamentos técnicos oficiales listados por el Ministerio."
  },
  {
    id: "m1-q3",
    question: "¿Cuál estándar está orientado al ciclo de vida del software de dispositivos médicos?",
    options: ["IEC 62304", "ANSI/TIA-568", "IPC-A-610", "NFPA 72"],
    correct: 0,
    explanation:
      "IEC 62304 estructura procesos del ciclo de vida de software médico y clasifica la seguridad del software en A, B o C."
  },
  {
    id: "m1-q4",
    question: "¿Qué concepto es característico de IEC 62443 para segmentar una arquitectura de control industrial?",
    options: ["Zonas y conductos", "Índice IP", "Clase CF", "RTM"],
    correct: 0,
    explanation:
      "Zonas y conductos permiten agrupar activos con necesidades de seguridad comunes y controlar las comunicaciones entre grupos."
  }
];

export default function Module1Page() {
  return (
    <div className="pb-12">
      <ModuleHeader
        module="Módulo 01"
        title="Normas y Estándares Técnicos"
        description="Una norma no es una sigla para memorizar. Es una fuente de requisitos, métodos de ensayo, criterios de aceptación y evidencia. El primer trabajo del ingeniero es identificar cuál aplica y con qué edición."
        icon={ShieldCheck}
      />

      <NormativeNotice>
        <strong className="text-amber-100">Actualización realizada:</strong> el sitio original confundía “RETIELAB” con un reglamento oficial y trataba NEMA e IP como equivalentes. Aquí se distinguen RETIE/RETILAP y se evita una conversión automática NEMA↔IP.
      </NormativeNotice>

      <section className="mt-8 grid gap-4 md:grid-cols-2" aria-label="Mapa de normas">
        {standards.map((standard, index) => {
          const Icon = standard.icon;
          return (
            <Reveal key={standard.name} delay={(index % 4) * 0.03}>
              <article className="interactive-card h-full p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-800 bg-slate-950/50">
                    <Icon className="h-5 w-5 text-blue-300" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-white">{standard.name}</h2>
                      <span className="chip">{standard.category}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{standard.description}</p>
                    <p className="mt-3 border-l-2 border-cyan-400/25 pl-3 text-xs italic leading-5 text-cyan-100/70">
                      {standard.analogy}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>

      <div className="mt-10">
        <IPSimulator />
      </div>

      <div className="mt-10">
        <Quiz title="Módulo 1 · Normas y estándares" questions={questions} />
      </div>
    </div>
  );
}
