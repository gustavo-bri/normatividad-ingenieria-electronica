# NormEng — Guía Integral de Normatividad y Documentación

Sitio educativo reconstruido con **Next.js 16 App Router**, React 19, Tailwind CSS, Framer Motion y Lucide React.

## Requisitos

- Node.js 22 o superior
- npm 10 o superior

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Verificación

```bash
npm run typecheck
npm run build
```

El proyecto usa `output: "export"`, por lo que `npm run build` genera una salida estática en `out/`.

## Netlify

El repositorio incluye `netlify.toml`.

- Build command: `npm run build`
- Publish directory: `out`
- Node: `22`

Flujo recomendado:

1. Subir la carpeta del proyecto a GitHub/GitLab/Bitbucket.
2. En Netlify, **Add new site → Import an existing project**.
3. Seleccionar el repositorio.
4. Netlify leerá `netlify.toml`; no es necesario sobrescribir build/publish.
5. Desplegar.

También puede usarse Netlify CLI:

```bash
npm install
npm run build
npx netlify deploy --dir=out
npx netlify deploy --dir=out --prod
```

## Simuladores incluidos

- Simulador de grado IP.
- Pre-validador de abstract IEEE.
- Constructor RTM con persistencia local y exportación CSV.
- Quizzes con retroalimentación inmediata.
- Ejercicio práctico paso a paso.

## Alcance académico

El contenido normativo es una guía de aprendizaje. Para diseño, certificación o evaluación de conformidad se debe consultar el texto oficial vigente y la jurisdicción aplicable.
