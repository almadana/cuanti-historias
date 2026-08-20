import type { Metadata } from "next";
import Link from "next/link";
import TableStory from "../../../components/TableStory";

export const metadata: Metadata = {
  title: "¿Qué porcentaje de qué?",
  description:
    "Una historia interactiva sobre tablas, prevalencias y porcentajes condicionales con datos de estudiantes uruguayos.",
  openGraph: {
    title: "¿Qué porcentaje de qué? · Cuanti",
    description:
      "Tablas y porcentajes condicionales con datos de estudiantes uruguayos.",
  },
};

export default function PercentagesLesson() {
  return (
    <main className="lesson-page percentages-page">
      <header className="lesson-header">
        <Link className="brand" href="/" aria-label="Cuanti, inicio">
          <span className="brand-dot" aria-hidden="true" />
          <span>cuanti</span>
          <span className="brand-period">.</span>
        </Link>
        <div className="lesson-breadcrumb">
          <Link href="/">Historias</Link>
          <span aria-hidden="true">/</span>
          <span>Tablas</span>
        </div>
        <Link className="close-story" href="/" aria-label="Cerrar la historia">
          <span aria-hidden="true">×</span>
        </Link>
      </header>

      <section className="lesson-intro percentages-intro">
        <div>
          <p className="kicker">Historia 02 · Tablas</p>
          <h1>¿Qué porcentaje de qué?</h1>
          <p>
            Dos preguntas casi idénticas. Una tabla de estudiantes uruguayos.
            Y un denominador que cambia por completo la respuesta.
          </p>
        </div>
        <div className="lesson-intro-meta">
          <span>10–12 min</span>
          <span>datos reales</span>
          <span>6 momentos</span>
        </div>
        <a className="scroll-cue" href="#tabla-paso-1">
          Empezar <span aria-hidden="true">↓</span>
        </a>
      </section>

      <TableStory />

      <section className="lesson-outro">
        <p className="kicker">Lo que te llevás</p>
        <h2>Leer bien un porcentaje es identificar correctamente su 100%.</h2>
        <div className="takeaway-grid">
          <article>
            <span>01</span>
            <h3>Contar no es comparar</h3>
            <p>Los números absolutos dependen del tamaño de cada grupo.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Las filas responden “dentro de”</h3>
            <p>Permiten comparar la prevalencia de una respuesta entre grupos.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Las columnas responden “quiénes”</h3>
            <p>Describen cómo está compuesto el conjunto que dio una respuesta.</p>
          </article>
        </div>
        <div className="next-lesson is-muted">
          <div>
            <small>Próxima historia</small>
            <strong>¿Cómo es una noche típica?</strong>
          </div>
          <span>Distribuciones y estadísticas descriptivas · en preparación</span>
        </div>
        <Link className="secondary-button" href="/">
          Volver al recorrido
        </Link>
      </section>
    </main>
  );
}
