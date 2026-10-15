# Informe de auditoría — NormEng v2

## Hallazgos críticos corregidos

1. **Stack no conforme al brief**  
   El proyecto original era Vite + React Router. Se reconstruyó en Next.js App Router con exportación estática compatible con Netlify.

2. **Sin configuración de Netlify**  
   Se añadió `netlify.toml`, Node 22, salida `out/`, headers básicos de seguridad y caché para assets.

3. **Terminología colombiana incorrecta**  
   “RETIELAB” se reemplazó por la distinción correcta entre **RETIE** y **RETILAP**. Se actualizó la referencia al RETIE modificado por Resolución 40284 del 23 de junio de 2026.

4. **Código IP simplificado de forma engañosa**  
   El simulador anterior convertía los dígitos en una escala genérica “nula/limitada/adecuada/óptima”. La versión nueva explica condiciones de protección y advierte que los ensayos de agua no son totalmente acumulativos.

5. **Validador IEEE con reglas presentadas como universales**  
   Se eliminó la afirmación de que la primera persona está universalmente prohibida. El validador ahora se presenta como pre-chequeo heurístico, incluye un solo párrafo, autocontención, contenido técnico y 3–5 keywords, y recuerda verificar el venue.

6. **Ejercicio de quirófano con prescripciones no justificadas**  
   Se retiraron valores y topologías rígidas que dependían del diseño real. También se corrigió la idea de conectar a tierra directamente el secundario de un transformador de aislamiento de un sistema IT médico.

7. **RTM limitada**  
   Se añadió persistencia con `localStorage`, exportación CSV, restauración del ejemplo y cálculo robusto de cobertura.

8. **Accesibilidad**  
   Se añadieron etiquetas, `aria-live`, navegación por teclado, skip-link, `aria-current`, manejo de Escape y respeto por `prefers-reduced-motion`.

9. **Dependencias innecesarias**  
   Se eliminaron Supabase, Recharts, dnd-kit, uuid, date-fns y canvas-confetti, que no eran necesarios para el sitio.

10. **Rendimiento y mantenimiento**  
    El sitio es estático, no depende de fuentes externas en runtime, usa componentes cliente solo donde hay interactividad y no carga imágenes pesadas.

## Comandos de aceptación

```bash
npm install
npm run typecheck
npm run build
```

La salida de producción debe quedar en `out/`.

## Validaciones ejecutadas sobre la versión corregida

- Resolución de imports internos `@/...`: **correcta**.
- Rutas estáticas verificadas: `/`, `/modulo-1/`, `/modulo-2/`, `/modulo-3/`, `/modulo-4/`, `/ejercicio-practico/`.
- Transpilación sintáctica de 22 archivos TypeScript/TSX: **sin errores**.
- Comprobación estructural TypeScript con *shims* de las dependencias externas: **sin errores**.
- Pruebas unitarias de lógica: **aprobadas** para código IP, reglas del abstract, parser de keywords, estado/cobertura RTM y escape CSV.
- Revisión de clases Tailwind: se normalizaron modificadores de opacidad para evitar utilidades no generadas en Tailwind 3.
- Robustez RTM: validación del JSON recuperado, tolerancia a `localStorage` bloqueado/lleno y liberación segura del `Blob` exportado.
- Navegación móvil: los enlaces fuera de pantalla dejan de entrar en el orden de tabulación.

### Limitación de este entorno de auditoría

El registro de npm no respondió desde el contenedor de ejecución, por lo que no fue posible descargar las dependencias y ejecutar aquí un `next build` real. No se atribuye ese bloqueo al proyecto. Por esa razón se incluyeron verificaciones independientes de sintaxis, estructura, rutas e interactividad lógica y se dejaron versiones explícitas en `package.json` junto con los comandos de aceptación. En Netlify o en un equipo con acceso normal a npm, ejecutar:

```bash
npm install
npm run typecheck
npm run build
```

El build exitoso debe crear `out/`, que es la carpeta configurada como *publish directory*.

## Referencias oficiales usadas en las correcciones de contenido

- Ministerio de Minas y Energía — RETIE vigente: Resolución 40284 del 23 de junio de 2026.
- Ministerio de Minas y Energía — RETILAP vigente: Resolución 40286 del 23 de junio de 2026.
- Gestor Normativo CREG — texto compilado RETIE 2026, incluyendo sistema IT en áreas críticas, tierra redundante y criterios de puesta a tierra.
- IEEE Author Center — estructura de abstracts para journals/conferences: un párrafo de hasta 250 palabras, autocontenido y 3–5 keywords/frases.
- NEMA — documentación técnica sobre la no equivalencia bidireccional entre tipos NEMA e índices IP.
