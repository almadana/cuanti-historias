import type { Metadata } from "next";
import Link from "next/link";
import SimpsonStory from "../../../components/SimpsonStory";

export const metadata: Metadata = {
  title: "¿Discriminaba Berkeley?",
  description:
    "Una historia interactiva sobre porcentajes, variables ocultas y la paradoja de Simpson.",
  openGraph: {
    title: "¿Discriminaba Berkeley? · Cuanti",
    description:
      "Una historia interactiva sobre porcentajes, variables ocultas y la paradoja de Simpson.",
  },
};

export default function BerkeleyLesson() {
  return (
    <main className="lesson-page">
      <header className="lesson-header">
        <Link className="brand" href="/" aria-label="Cuanti, inicio">
          <span className="brand-dot" aria-hidden="true" />
          <span>cuanti</span>
          <span className="brand-period">.</span>
        </Link>
        <div className="lesson-breadcrumb">
          <Link href="/">Historias</Link>
          <span aria-hidden="true">/</span>
          <span>Ciencia y datos</span>
        </div>
        <Link className="close-story" href="/" aria-label="Cerrar la historia">
          <span aria-hidden="true">×</span>
        </Link>
      </header>

      <section className="lesson-intro">
        <div>
          <p className="kicker">Historia 01 · Ciencia y datos</p>
          <h1>¿Discriminaba Berkeley a las mujeres?</h1>
          <p>
            Una comparación convincente. Una variable escondida. Y una buena
            razón para desconfiar de la primera conclusión.
          </p>
        </div>
        <div className="lesson-intro-meta">
          <span>8–10 min</span>
          <span>datos reales</span>
          <span>5 momentos</span>
        </div>
        <a className="scroll-cue" href="#paso-1">
          Empezar <span aria-hidden="true">↓</span>
        </a>
      </section>

      <SimpsonStory />

      <section className="lesson-outro">
        <p className="kicker">Lo que te llevás</p>
        <h2>Antes de explicar una diferencia, preguntá qué quedó escondido al agrupar.</h2>
        <div className="takeaway-grid">
          <article>
            <span>01</span>
            <h3>Un porcentaje necesita denominador</h3>
            <p>Preguntá siempre: ¿porcentaje de qué conjunto?</p>
          </article>
          <article>
            <span>02</span>
            <h3>Agregar puede ocultar estructura</h3>
            <p>Los subgrupos pueden mostrar un patrón diferente del total.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Asociación no es explicación</h3>
            <p>Una diferencia observada no identifica por sí sola su causa.</p>
          </article>
        </div>
        <div className="next-lesson">
          <div>
            <small>Próxima historia</small>
            <strong>¿Qué porcentaje de qué?</strong>
          </div>
          <span>Tablas y adolescentes uruguayos · en preparación</span>
        </div>
        <Link className="secondary-button" href="/">
          Volver al recorrido
        </Link>
      </section>
    </main>
  );
}
