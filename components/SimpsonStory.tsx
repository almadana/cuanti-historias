"use client";

import { useEffect, useMemo, useState } from "react";

type Department = {
  id: string;
  men: { admitted: number; rejected: number };
  women: { admitted: number; rejected: number };
};

const departments: Department[] = [
  { id: "A", men: { admitted: 512, rejected: 313 }, women: { admitted: 89, rejected: 19 } },
  { id: "B", men: { admitted: 353, rejected: 207 }, women: { admitted: 17, rejected: 8 } },
  { id: "C", men: { admitted: 120, rejected: 205 }, women: { admitted: 202, rejected: 391 } },
  { id: "D", men: { admitted: 138, rejected: 279 }, women: { admitted: 131, rejected: 244 } },
  { id: "E", men: { admitted: 53, rejected: 138 }, women: { admitted: 94, rejected: 299 } },
  { id: "F", men: { admitted: 22, rejected: 351 }, women: { admitted: 24, rejected: 317 } },
];

const steps = [
  "La pregunta",
  "La primera evidencia",
  "Abrir los datos",
  "Ver el patrón",
  "La conclusión",
];

function rate(values: { admitted: number; rejected: number }) {
  return (values.admitted / (values.admitted + values.rejected)) * 100;
}

function sumGroup(group: "men" | "women") {
  return departments.reduce(
    (total, department) => ({
      admitted: total.admitted + department[group].admitted,
      rejected: total.rejected + department[group].rejected,
    }),
    { admitted: 0, rejected: 0 },
  );
}

const totals = {
  men: sumGroup("men"),
  women: sumGroup("women"),
};

function RateBar({
  label,
  value,
  count,
  color,
  delay = 0,
}: {
  label: string;
  value: number;
  count?: string;
  color: "blue" | "pink";
  delay?: number;
}) {
  return (
    <div className="rate-row">
      <div className="rate-label">
        <span className={`legend-dot ${color}`} />
        <span>{label}</span>
        {count && <small>{count}</small>}
      </div>
      <div className="rate-track">
        <span
          className={`rate-fill ${color}`}
          style={{ width: `${value}%`, transitionDelay: `${delay}ms` }}
        />
      </div>
      <strong>{value.toFixed(1).replace(".", ",")}%</strong>
    </div>
  );
}

function OverallPanel() {
  return (
    <div className="viz-view">
      <div className="viz-title-row">
        <div>
          <p>Tasa de admisión</p>
          <h3>Todos los departamentos juntos</h3>
        </div>
        <span className="data-chip">n = 4.526</span>
      </div>
      <div className="large-rate-chart">
        <RateBar
          label="Hombres"
          value={rate(totals.men)}
          count="1.198 admitidos de 2.691"
          color="blue"
        />
        <RateBar
          label="Mujeres"
          value={rate(totals.women)}
          count="557 admitidas de 1.835"
          color="pink"
          delay={100}
        />
      </div>
      <div className="difference-callout">
        <strong>14,1 puntos</strong>
        <span>de diferencia en los datos agregados</span>
      </div>
    </div>
  );
}

function ApplicantPanel() {
  return (
    <div className="viz-view applicant-view">
      <div className="viz-title-row">
        <div>
          <p>Berkeley, 1973</p>
          <h3>4.526 postulaciones a posgrados</h3>
        </div>
        <span className="data-chip">datos reales</span>
      </div>
      <div className="people-groups" aria-hidden="true">
        <div>
          <span className="people-label blue-text">2.691 hombres</span>
          <div className="people-cloud">
            {Array.from({ length: 35 }, (_, index) => (
              <span className="person-dot blue" key={index} />
            ))}
          </div>
        </div>
        <div>
          <span className="people-label pink-text">1.835 mujeres</span>
          <div className="people-cloud">
            {Array.from({ length: 24 }, (_, index) => (
              <span className="person-dot pink" key={index} />
            ))}
          </div>
        </div>
      </div>
      <p className="viz-footnote">
        Cada punto representa aproximadamente 77 postulaciones.
      </p>
    </div>
  );
}

function DepartmentPanel({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  const department = departments.find((item) => item.id === selected) ?? departments[0];
  const womenRate = rate(department.women);
  const menRate = rate(department.men);

  return (
    <div className="viz-view">
      <div className="viz-title-row">
        <div>
          <p>Ahora, por departamento</p>
          <h3>Departamento {department.id}</h3>
        </div>
        <span className={`direction-chip ${womenRate > menRate ? "women" : "men"}`}>
          {womenRate > menRate ? "mayor tasa en mujeres" : "mayor tasa en hombres"}
        </span>
      </div>
      <div className="department-tabs" aria-label="Elegir departamento">
        {departments.map((item) => (
          <button
            className={item.id === selected ? "active" : ""}
            key={item.id}
            onClick={() => onSelect(item.id)}
            type="button"
          >
            {item.id}
          </button>
        ))}
      </div>
      <div className="large-rate-chart compact">
        <RateBar
          label="Hombres"
          value={menRate}
          count={`${department.men.admitted} de ${
            department.men.admitted + department.men.rejected
          }`}
          color="blue"
        />
        <RateBar
          label="Mujeres"
          value={womenRate}
          count={`${department.women.admitted} de ${
            department.women.admitted + department.women.rejected
          }`}
          color="pink"
          delay={100}
        />
      </div>
      <p className="viz-hint">Tocá las letras para recorrer los seis departamentos.</p>
    </div>
  );
}

function AllDepartmentsPanel() {
  return (
    <div className="viz-view">
      <div className="viz-title-row">
        <div>
          <p>La imagen completa</p>
          <h3>Seis comparaciones, no una</h3>
        </div>
        <span className="data-chip">A–F</span>
      </div>
      <div className="small-multiples">
        {departments.map((department) => {
          const menRate = rate(department.men);
          const womenRate = rate(department.women);
          return (
            <div className="mini-department" key={department.id}>
              <strong>{department.id}</strong>
              <div className="mini-bars">
                <span className="mini-bar blue" style={{ width: `${menRate}%` }}>
                  <i>{menRate.toFixed(0)}%</i>
                </span>
                <span className="mini-bar pink" style={{ width: `${womenRate}%` }}>
                  <i>{womenRate.toFixed(0)}%</i>
                </span>
              </div>
              <span className={womenRate > menRate ? "winner pink-text" : "winner blue-text"}>
                {womenRate > menRate ? "M" : "H"} ↑
              </span>
            </div>
          );
        })}
      </div>
      <div className="chart-legend">
        <span><i className="legend-dot blue" /> hombres</span>
        <span><i className="legend-dot pink" /> mujeres</span>
      </div>
    </div>
  );
}

function ExplanationPanel() {
  return (
    <div className="viz-view explanation-view">
      <div className="viz-title-row">
        <div>
          <p>La pieza que faltaba</p>
          <h3>Las postulaciones no se repartieron igual</h3>
        </div>
      </div>
      <div className="flow-comparison">
        <div className="flow-person blue">
          <span>H</span>
          <strong>más postulaciones</strong>
          <small>a departamentos con admisión alta</small>
        </div>
        <div className="flow-arrow" aria-hidden="true">→</div>
        <div className="flow-gate easy">A · B</div>
      </div>
      <div className="flow-comparison">
        <div className="flow-person pink">
          <span>M</span>
          <strong>más postulaciones</strong>
          <small>a departamentos con admisión baja</small>
        </div>
        <div className="flow-arrow" aria-hidden="true">→</div>
        <div className="flow-gate hard">C · D · E · F</div>
      </div>
      <div className="simpson-label">
        <span>Paradoja de Simpson</span>
        <p>Una relación agregada cambia —o se revierte— al considerar otra variable.</p>
      </div>
    </div>
  );
}

export default function SimpsonStory() {
  const [activeStep, setActiveStep] = useState(0);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState("A");
  const [answer, setAnswer] = useState<string | null>(null);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-story-step]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveStep(Number((visible.target as HTMLElement).dataset.storyStep));
        }
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const panel = useMemo(() => {
    if (activeStep === 0) return <ApplicantPanel />;
    if (activeStep === 1) return <OverallPanel />;
    if (activeStep === 2) {
      return (
        <DepartmentPanel
          selected={selectedDepartment}
          onSelect={setSelectedDepartment}
        />
      );
    }
    if (activeStep === 3) return <AllDepartmentsPanel />;
    return <ExplanationPanel />;
  }, [activeStep, selectedDepartment]);

  return (
    <>
      <div className="story-progress" aria-hidden="true">
        <span style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} />
      </div>

      <div className="story-shell">
        <aside className="story-map" aria-label="Progreso de la historia">
          <span className="map-label">En esta historia</span>
          {steps.map((step, index) => (
            <a
              className={index === activeStep ? "active" : ""}
              href={`#paso-${index + 1}`}
              key={step}
            >
              <i>{index + 1}</i>
              <span>{step}</span>
            </a>
          ))}
        </aside>

        <div className="story-copy">
          <section className="story-step" data-story-step="0" id="paso-1">
            <p className="step-number">01 · La pregunta</p>
            <h2>¿Discriminaba Berkeley a las mujeres?</h2>
            <p>
              En 1973, la universidad estudió las postulaciones a sus posgrados.
              Antes de mirar el resultado, queremos que arriesgues una respuesta.
            </p>
            <div className="prediction-box">
              <span>¿Qué esperarías encontrar?</span>
              <div className="choice-row">
                {[
                  ["yes", "Sí, una tasa menor"],
                  ["no", "No, tasas parecidas"],
                  ["unsure", "No tengo idea"],
                ].map(([value, label]) => (
                  <button
                    className={prediction === value ? "selected" : ""}
                    key={value}
                    onClick={() => setPrediction(value)}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
              {prediction && (
                <p className="choice-feedback">
                  Guardamos tu intuición. Ahora veamos qué dicen los datos.
                </p>
              )}
            </div>
          </section>

          <section className="story-step" data-story-step="1" id="paso-2">
            <p className="step-number">02 · La primera evidencia</p>
            <h2>La diferencia parece enorme.</h2>
            <p>
              En los seis departamentos principales, fue admitido el 44,5% de
              los hombres y apenas el 30,4% de las mujeres.
            </p>
            <blockquote>
              Si miráramos solamente este gráfico, la respuesta parecería bastante clara.
            </blockquote>
            <p className="reflection">
              Pero un porcentaje siempre es una parte de algo. ¿Qué estamos
              juntando cuando calculamos estos dos porcentajes?
            </p>
          </section>

          <section className="story-step" data-story-step="2" id="paso-3">
            <p className="step-number">03 · Abrir los datos</p>
            <h2>No había una sola puerta de entrada.</h2>
            <p>
              Las personas se postulaban a departamentos diferentes, y cada
              departamento tenía una tasa de admisión muy distinta.
            </p>
            <p>
              Tocá las letras del gráfico. En cuatro de los seis departamentos,
              la tasa de admisión fue ligeramente mayor para las mujeres.
            </p>
            <div className="concept-note">
              <strong>Nueva variable:</strong>
              <span>departamento al que se postuló cada persona</span>
            </div>
          </section>

          <section className="story-step" data-story-step="3" id="paso-4">
            <p className="step-number">04 · Ver el patrón</p>
            <h2>El resultado global y los resultados parciales cuentan historias diferentes.</h2>
            <p>
              Los departamentos A y B admitían a muchas más personas. Allí se
              concentraron proporcionalmente más postulaciones de hombres.
            </p>
            <p>
              Las mujeres se postularon en mayor proporción a departamentos con
              tasas de admisión mucho más bajas. Al juntar todo, esa diferencia
              entre departamentos desaparece de la tabla, pero no de los
              porcentajes.
            </p>
          </section>

          <section className="story-step" data-story-step="4" id="paso-5">
            <p className="step-number">05 · La conclusión</p>
            <h2>La primera comparación era verdadera, pero incompleta.</h2>
            <p>
              La tasa agregada de admisión de las mujeres fue menor. Eso está en
              los datos. Lo que no podemos hacer es atribuir automáticamente
              esa diferencia a una política de admisión contra ellas.
            </p>
            <div className="final-question">
              <strong>¿Cuál es la mejor conclusión?</strong>
              {[
                ["a", "Berkeley discriminó: la diferencia global alcanza para demostrarlo."],
                ["b", "No hubo ninguna diferencia entre hombres y mujeres."],
                ["c", "La diferencia global mezcla género y departamento; necesitamos considerar ambos."],
              ].map(([value, label]) => (
                <button
                  className={answer === value ? "selected" : ""}
                  key={value}
                  onClick={() => setAnswer(value)}
                  type="button"
                >
                  <span>{value.toUpperCase()}</span>
                  {label}
                </button>
              ))}
              {answer && (
                <p className={answer === "c" ? "answer-correct" : "answer-try"}>
                  {answer === "c"
                    ? "Exacto. La variable departamento cambia la interpretación de la asociación."
                    : "Todavía falta algo: compará el resultado total con los seis departamentos."}
                </p>
              )}
            </div>
          </section>
        </div>

        <aside className="story-viz" aria-live="polite">
          <div className="viz-card" key={activeStep}>
            {panel}
          </div>
          <p className="source-line">
            Fuente: UCBAdmissions, postulaciones a posgrados de UC Berkeley, 1973.
          </p>
        </aside>
      </div>
    </>
  );
}
