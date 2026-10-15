export const solidLevels = [
  { level: 0, short: "Sin protección", description: "No se especifica protección contra acceso o ingreso de objetos sólidos." },
  { level: 1, short: "≥ 50 mm", description: "Protección frente a objetos sólidos de 50 mm de diámetro o mayores." },
  { level: 2, short: "≥ 12,5 mm", description: "Protección frente a objetos sólidos de 12,5 mm de diámetro o mayores; referencia típica: dedo." },
  { level: 3, short: "≥ 2,5 mm", description: "Protección frente a objetos sólidos de 2,5 mm de diámetro o mayores." },
  { level: 4, short: "≥ 1,0 mm", description: "Protección frente a objetos sólidos de 1,0 mm de diámetro o mayores." },
  { level: 5, short: "Protegido contra polvo", description: "Puede entrar polvo en cantidad limitada, pero no suficiente para interferir con la operación segura." },
  { level: 6, short: "Hermético al polvo", description: "No se permite ingreso de polvo bajo las condiciones de ensayo aplicables." }
] as const;

export const liquidLevels = [
  { level: 0, short: "Sin protección", description: "No se especifica protección contra agua." },
  { level: 1, short: "Goteo vertical", description: "Protección contra gotas de agua que caen verticalmente." },
  { level: 2, short: "Goteo con inclinación", description: "Protección contra goteo cuando la envolvente se inclina hasta 15°." },
  { level: 3, short: "Agua pulverizada", description: "Protección frente a agua pulverizada dentro de los ángulos definidos por el ensayo." },
  { level: 4, short: "Salpicaduras", description: "Protección frente a salpicaduras desde cualquier dirección." },
  { level: 5, short: "Chorros de agua", description: "Protección frente a chorros de agua bajo las condiciones normalizadas del ensayo." },
  { level: 6, short: "Chorros potentes", description: "Protección frente a chorros potentes de agua." },
  { level: 7, short: "Inmersión temporal", description: "Protección frente a efectos de inmersión temporal bajo las condiciones definidas por la norma." },
  { level: 8, short: "Inmersión prolongada", description: "Protección frente a inmersión prolongada; las condiciones se acuerdan/especifican para el producto y deben ser más severas que IPX7." },
  { level: 9, short: "Alta presión y temperatura", description: "Protección frente a chorros de agua a alta presión y alta temperatura bajo condiciones de ensayo específicas." }
] as const;

export function ipCode(solid: number, liquid: number) {
  return `IP${solid}${liquid}`;
}

export function applicationHint(solid: number, liquid: number) {
  if (solid >= 6 && liquid >= 6) {
    return "La envolvente ofrece alta protección frente a polvo y agua, pero la aptitud final depende del entorno, montaje, conectores y certificación del producto.";
  }
  if (solid >= 5 && liquid >= 4) {
    return "Perfil habitual para ambientes con polvo y salpicaduras. Verifica si existen chorros, inmersión, agentes corrosivos o lavado a presión.";
  }
  if (solid >= 4 && liquid >= 2) {
    return "Protección moderada. Puede ser suficiente para interiores controlados, pero no sustituye el análisis de exposición ambiental.";
  }
  return "Protección limitada. Revisa el peligro real de contacto, partículas y agua antes de seleccionar la envolvente.";
}
