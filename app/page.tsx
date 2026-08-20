import Link from "next/link";

const lessons = [
  {
    number: "01",
    eyebrow: "Ciencia y datos",
    title: "¿Discriminaba Berkeley?",
    description:
      "Una diferencia evidente, seis departamentos y una conclusión que cambia cuando miramos mejor.",
    href: "/lecciones/berkeley",
    tone: "violet",
    available: true,
  },
  {
    number: "02",
    eyebrow: "Tablas",
    title: "¿Qué porcentaje de qué?",
    description:
      "Adolescentes uruguayos, prevalencias y dos maneras muy distintas de leer la misma tabla.",
    href: "/lecciones/porcentajes",
    tone: "green",
    available: true,
  },
  {
    number: "03",
    eyebrow: "Describir datos",
    title: "¿Cómo es una noche típica?",
    description:
      "Sueño estudiantil: del montón de observaciones a la media, la mediana y la dispersión.",
    tone: "blue",
    available: false,
  },
  {
    number: "04",
    eyebrow: "Correlación",
    title: "¿Dormir menos implica más estrés?",
    description:
      "Dibujar una predicción, abrir los datos y descubrir cuánto puede cambiar una relación.",
    tone: "pink",
    available: false,
  },
  {
    number: "05",
    eyebrow: "Muestreo",
    title: "¿A quiénes les preguntamos?",
    description:
      "Muchas muestras posibles, estimaciones distintas y una pregunta incómoda sobre el sesgo.",
    tone: "yellow",
    available: false,
  },
  {
    number: "06",
    eyebrow: "Inferencia",
    title: "¿Puede haber sido azar?",
    description:
      "Reordenar los datos para construir, paso a paso, un mundo donde no hay efecto.",
    tone: "violet",
    available: false,
  },
];

function BrandMark() {
  return (
    <Link className="brand" href="/" aria-label="Cuanti, inicio">
      <span className="brand-dot" aria-hidden="true" />
      <span>cuanti</span>
      <span className="brand-period">.</span>
    </Link>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <BrandMark />
        <div className="header-context">Métodos y Técnicas Cuantitativas</div>
        <a className="small-link" href="#lecciones">
          Ver historias <span aria-hidden="true">↓</span>
        </a>
      </header>

      <section className="home-hero">
        <div className="hero-copy">
          <p className="kicker">Historias interactivas con datos reales</p>
          <h1>
            Los números no hablan solos.
            <span> Hay que hacerles buenas preguntas.</span>
          </h1>
          <p className="hero-lead">
            Mirá, tocá y poné a prueba tus intuiciones. Cada historia empieza
            con una pregunta y construye la herramienta estadística cuando de
            verdad hace falta.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/lecciones/berkeley">
              Empezar la primera historia
              <span aria-hidden="true">→</span>
            </Link>
            <span className="hero-meta">8–10 minutos · sin fórmulas previas</span>
          </div>
        </div>

        <div
          className="hero-visual"
          aria-label="Una misma colección de datos vista de tres maneras"
        >
          <div className="visual-caption">Los mismos datos, otra mirada</div>
          <div className="data-cloud" aria-hidden="true">
            {Array.from({ length: 30 }, (_, index) => (
              <span
                key={index}
                className={`data-dot ${
                  index % 5 === 0 || index % 7 === 0 ? "pink" : "blue"
                }`}
                style={{
                  left: `${8 + ((index * 23) % 84)}%`,
                  top: `${8 + ((index * 37) % 78)}%`,
                  animationDelay: `${(index % 8) * 90}ms`,
                }}
              />
            ))}
            <div className="question-bubble">¿Qué ves?</div>
          </div>
          <div className="visual-tabs" aria-hidden="true">
            <span className="active">personas</span>
            <span>tabla</span>
            <span>gráfico</span>
          </div>
        </div>
      </section>

      <section className="method-strip" aria-label="Cómo funcionan las historias">
        <div>
          <span className="method-number">1</span>
          <h2>Arriesgá</h2>
          <p>Elegí una respuesta antes de conocer el resultado.</p>
        </div>
        <div>
          <span className="method-number">2</span>
          <h2>Explorá</h2>
          <p>Ordená, filtrá o remezclá observaciones reales.</p>
        </div>
        <div>
          <span className="method-number">3</span>
          <h2>Decidí</h2>
          <p>Usá la estadística para sostener una conclusión.</p>
        </div>
      </section>

      <section className="lessons-section" id="lecciones">
        <div className="section-heading">
          <div>
            <p className="kicker">El recorrido</p>
            <h2>Una pregunta nueva cada semana</h2>
          </div>
          <p>
            Las historias se conectan: primero aprendemos a mirar, después a
            comparar y finalmente a decidir cuánto podemos concluir.
          </p>
        </div>

        <div className="lesson-grid">
          {lessons.map((lesson) => {
            const content = (
              <>
                <div className="lesson-card-top">
                  <span className="lesson-number">{lesson.number}</span>
                  <span className="lesson-status">
                    {lesson.available ? "Disponible" : "Próximamente"}
                  </span>
                </div>
                <p className="lesson-eyebrow">{lesson.eyebrow}</p>
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
                <span className="lesson-arrow" aria-hidden="true">
                  {lesson.available ? "Abrir historia →" : "· · ·"}
                </span>
              </>
            );

            return lesson.available ? (
              <Link
                href={lesson.href}
                className={`lesson-card ${lesson.tone}`}
                key={lesson.number}
              >
                {content}
              </Link>
            ) : (
              <article
                className={`lesson-card ${lesson.tone} is-locked`}
                key={lesson.number}
              >
                {content}
              </article>
            );
          })}
        </div>
      </section>

      <footer className="site-footer">
        <BrandMark />
        <p>Aprender estadística es aprender a mirar evidencia.</p>
        <a href="https://cuanti.psico.edu.uy" rel="noreferrer">
          cuanti.psico.edu.uy
        </a>
      </footer>
    </main>
  );
}
