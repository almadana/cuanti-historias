# Cuanti — Historias con datos

Prototipo de una nueva serie de lecciones interactivas para Métodos y Técnicas
Cuantitativas, Facultad de Psicología, Universidad de la República.

La propuesta cambia la estructura «explicación + editor» por pequeñas
investigaciones:

1. una pregunta real;
2. una predicción del estudiante;
3. datos que se pueden explorar;
4. una complicación o sorpresa;
5. una herramienta estadística;
6. una conclusión argumentada.

## Estado

- Portada y recorrido general.
- Primera historia completa: **¿Discriminaba Berkeley?**
- Datos reales de UCBAdmissions.
- Narrativa por scroll, predicción inicial, exploración por departamento y
  pregunta de cierre.
- Diseño responsive y navegación por teclado.

## Identidad visual

El sitio mantiene el sistema visual de Cuanti:

- Poppins para títulos y Roboto para cuerpo;
- violeta #4b00f9;
- morados #8c7ddc y #b4a5fa;
- verde #c8fab4;
- azul #4a74f5 y rosa #d14a90 para comparaciones;
- fondos blancos, bordes visibles y formas geométricas simples.

## Desarrollo

Requiere Node.js 22 o superior. Los comandos principales son:

- npm install
- npm run dev
- npm run lint
- npm test

## Estructura principal

- app/page.tsx: portada y recorrido.
- app/lecciones/berkeley/page.tsx: primera lección.
- components/SimpsonStory.tsx: narrativa e interactividad.
- app/globals.css: sistema visual y diseño responsive.
