export type RuleResult = {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
};

export function countWords(text: string) {
  const normalized = text.trim().replace(/\s+/g, " ");
  return normalized ? normalized.split(" ").length : 0;
}

export function parseKeywords(value: string) {
  return value
    .split(/[,;\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function hasSectionSignal(text: string, expressions: RegExp[]) {
  return expressions.some((expression) => expression.test(text));
}

export function validateAbstract(text: string, keywordsText: string): RuleResult[] {
  const clean = text.trim();
  const words = countWords(clean);
  const paragraphs = clean
    ? clean.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    : [];
  const keywords = parseKeywords(keywordsText);

  const objective = hasSectionSignal(clean, [
    /\bobjetiv[oa]\b/i,
    /\bprop[oó]sito\b/i,
    /\beste (trabajo|estudio|art[ií]culo) (presenta|propone|describe|eval[uú]a|desarrolla|analiza)\b/i,
    /\bthis (paper|work|study) (presents|proposes|describes|evaluates|develops|analyzes)\b/i,
    /\bobjective\b/i
  ]);
  const method = hasSectionSignal(clean, [
    /\bmetodolog[ií]a\b/i,
    /\bm[eé]todo\b/i,
    /\bse (diseñ[oó]|implement[oó]|evalu[oó]|midieron|analizaron)\b/i,
    /\bmethod\b/i,
    /\bimplemented\b/i,
    /\bevaluated\b/i
  ]);
  const result = hasSectionSignal(clean, [
    /\bresultad[oa]s?\b/i,
    /\bse (obtuvo|obtuvieron|alcanz[oó]|demostr[oó])\b/i,
    /\bresults?\b/i,
    /\bachieved\b/i,
    /\bdemonstrat(ed|es)\b/i,
    /\b\d+([.,]\d+)?\s?%\b/
  ]);

  const selfContained =
    !/\[\s*\d+\s*\]/.test(clean) &&
    !/\bhttps?:\/\//i.test(clean) &&
    !/\bdoi\s*:/i.test(clean) &&
    !/^\s*(fig\.?|figure|tabla|table)\s*\d+/im.test(clean) &&
    !/[=∑∫√]/.test(clean);

  return [
    {
      id: "length",
      label: "Extensión general: hasta 250 palabras",
      passed: words > 0 && words <= 250,
      detail: `${words} palabra${words === 1 ? "" : "s"}. Verifica siempre la plantilla del journal o conferencia objetivo.`
    },
    {
      id: "paragraph",
      label: "Un solo párrafo",
      passed: paragraphs.length <= 1 && clean.length > 0,
      detail: clean ? `${Math.max(paragraphs.length, 1)} párrafo(s) detectado(s).` : "Aún no hay texto."
    },
    {
      id: "self-contained",
      label: "Autocontenido: sin citas, URL ni ecuaciones",
      passed: clean.length > 0 && selfContained,
      detail: selfContained ? "No se detectaron referencias o ecuaciones evidentes." : "Se detectó al menos una referencia, URL, llamada a figura/tabla o símbolo de ecuación."
    },
    {
      id: "content",
      label: "Expone propósito, método y resultados",
      passed: objective && method && result,
      detail: `Propósito ${objective ? "✓" : "—"} · Método ${method ? "✓" : "—"} · Resultados ${result ? "✓" : "—"}.`
    },
    {
      id: "keywords",
      label: "Incluye 3–5 palabras clave o frases",
      passed: keywords.length >= 3 && keywords.length <= 5,
      detail: `${keywords.length} término(s) de indexación detectado(s).`
    }
  ];
}
