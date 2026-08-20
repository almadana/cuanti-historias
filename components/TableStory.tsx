"use client";

import { useEffect, useMemo, useState } from "react";

const survey = {
  total: 3162,
  overall: 54.6,
  men: 49.7,
  women: 58.3,
};

const steps = [
  "La pregunta",
  "Un porcentaje",
  "Comparar grupos",
  "Invertir la pregunta",
  "Cambiar el total",
  "La conclusión",
];

type Lens = "counts" | "rows" | "columns";

function pct(value: number) {
  return `${value.toFixed(1).replace(".", ",")}%`;
}

function PersonGrid({
  value,
  color = "green",
  count = 50,
}: {
  value: number;
  color?: "green" | "blue" | "pink";
  count?: number;
}) {
  const filled = Math.round((value / 100) * count);
  return (
    <div className="scaled-people" aria-label={`${pct(value)} destacado`}>
      {Array.from({ length: count }, (_, index) => (
        <span
          className={index < filled ? `filled ${color}` : ""}
          key={index}
        />
      ))}
    </div>
  );
}

function SurveyPanel() {
  return (
    <div className="viz-view table-survey-view">
      <div className="viz-title-row">
        <div>
          <p>Uruguay, 2019</p>
          <h3>Encuesta Mundial de Salud en Estudiantes</h3>
        </div>
        <span className="data-chip">datos reales</span>
      </div>
      <div className="survey-big-number">
        <strong>3.162</strong>
        <span>estudiantes de 13 a 17 años</span>
      </div>
      <div className="survey-facts">
        <div><b>66</b><span>centros educativos seleccionados</span></div>
        <div><b>94%</b><span>respuesta de los centros</span></div>
        <div><b>64%</b><span>respuesta global</span></div>
      </div>
      <p className="viz-footnote">
        Encuesta anónima y autoadministrada. Las estimaciones publicadas fueron
        ponderadas para representar al estudiantado de los cursos incluidos.
      </p>
    </div>
  );
}

function OverallPanel() {
  return (
    <div className="viz-view overall-table-view">
      <div className="viz-title-row">
        <div>
          <p>Primera respuesta</p>
          <h3>Consumo de alcohol en el último mes</h3>
        </div>
        <span className="data-chip">13–17 años</span>
      </div>
      <div className="single-prevalence">
        <strong>{pct(survey.overall)}</strong>
        <PersonGrid value={survey.overall} />
        <p>
          Aproximadamente 55 de cada 100 estudiantes reportaron haber tomado al
          menos una bebida alcohólica durante los 30 días previos.
        </p>
      </div>
      <div className="denominator-tag">
        <span>denominador</span>
        <strong>todo el estudiantado encuestado</strong>
      </div>
    </div>
  );
}

function BySexPanel() {
  return (
    <div className="viz-view">
      <div className="viz-title-row">
        <div>
          <p>Ahora separamos</p>
          <h3>De cada 100 dentro de cada grupo</h3>
        </div>
        <span className="data-chip">prevalencia</span>
      </div>
      <div className="group-prevalences">
        <div className="group-prevalence blue-group">
          <div><span>Varones</span><strong>{pct(survey.men)}</strong></div>
          <PersonGrid value={survey.men} color="blue" />
          <small>≈ 50 de cada 100</small>
        </div>
        <div className="group-prevalence pink-group">
          <div><span>Mujeres</span><strong>{pct(survey.women)}</strong></div>
          <PersonGrid value={survey.women} color="pink" />
          <small>≈ 58 de cada 100</small>
        </div>
      </div>
      <div className="comparison-equation">
        <span>58,3%</span><i>−</i><span>49,7%</span><i>=</i><strong>8,6 puntos</strong>
      </div>
    </div>
  );
}

function ReverseQuestionPanel({
  femaleShare,
  onChange,
}: {
  femaleShare: number;
  onChange: (value: number) => void;
}) {
  const total = 1000;
  const women = Math.round((femaleShare / 100) * total);
  const men = total - women;
  const womenYes = Math.round(women * (survey.women / 100));
  const menYes = Math.round(men * (survey.men / 100));
  const allYes = womenYes + menYes;
  const womenAmongYes = (womenYes / allYes) * 100;

  return (
    <div className="viz-view reverse-view">
      <div className="viz-title-row">
        <div>
          <p>Laboratorio de denominadores</p>
          <h3>¿Quiénes componen el grupo que respondió “sí”?</h3>
        </div>
        <span className="data-chip">simulación</span>
      </div>
      <label className="base-rate-control">
        <span>
          Mujeres en el grupo
          <strong>{femaleShare}%</strong>
        </span>
        <input
          aria-label="Porcentaje de mujeres en el grupo"
          max="80"
          min="20"
          onChange={(event) => onChange(Number(event.target.value))}
          type="range"
          value={femaleShare}
        />
        <small><i>20%</i><i>80%</i></small>
      </label>
      <div className="composition-bars">
        <div>
          <span>Todo el grupo</span>
          <div className="split-bar" aria-label={`${femaleShare}% mujeres y ${100 - femaleShare}% varones`}>
            <i className="pink" style={{ width: `${femaleShare}%` }} />
            <i className="blue" style={{ width: `${100 - femaleShare}%` }} />
          </div>
          <small>{women} mujeres · {men} varones</small>
        </div>
        <div>
          <span>Entre quienes respondieron “sí”</span>
          <div className="split-bar emphasized">
            <i className="pink" style={{ width: `${womenAmongYes}%` }} />
            <i className="blue" style={{ width: `${100 - womenAmongYes}%` }} />
          </div>
          <small>{womenYes} mujeres · {menYes} varones</small>
        </div>
      </div>
      <div className="changing-answer">
        <strong>{pct(womenAmongYes)}</strong>
        <span>de quienes respondieron “sí” serían mujeres en esta simulación</span>
      </div>
    </div>
  );
}

function ConditionalTablePanel({
  lens,
  setLens,
  femaleShare,
}: {
  lens: Lens;
  setLens: (value: Lens) => void;
  femaleShare: number;
}) {
  const total = 1000;
  const women = Math.round((femaleShare / 100) * total);
  const men = total - women;
  const counts = {
    menYes: Math.round(men * (survey.men / 100)),
    womenYes: Math.round(women * (survey.women / 100)),
  };
  const menNo = men - counts.menYes;
  const womenNo = women - counts.womenYes;
  const yesTotal = counts.menYes + counts.womenYes;
  const noTotal = menNo + womenNo;

  const cell = (value: number, rowTotal: number, columnTotal: number) => {
    if (lens === "counts") return value.toString();
    if (lens === "rows") return pct((value / rowTotal) * 100);
    return pct((value / columnTotal) * 100);
  };

  return (
    <div className="viz-view conditional-view">
      <div className="viz-title-row">
        <div>
          <p>Una tabla, tres lecturas</p>
          <h3>Elegí qué total vale 100%</h3>
        </div>
        <span className="data-chip">n = 1.000</span>
      </div>
      <div className="lens-tabs">
        <button className={lens === "counts" ? "active" : ""} onClick={() => setLens("counts")} type="button">
          cantidades
        </button>
        <button className={lens === "rows" ? "active" : ""} onClick={() => setLens("rows")} type="button">
          % por fila
        </button>
        <button className={lens === "columns" ? "active" : ""} onClick={() => setLens("columns")} type="button">
          % por columna
        </button>
      </div>
      <div className={`conditional-table ${lens}`} role="table" aria-label="Consumo de alcohol por sexo">
        <div className="table-head" role="row">
          <span />
          <strong>Respondió sí</strong>
          <strong>Respondió no</strong>
          <strong>Total</strong>
        </div>
        <div className="table-data-row men-row" role="row">
          <strong>Varones</strong>
          <span>{cell(counts.menYes, men, yesTotal)}</span>
          <span>{cell(menNo, men, noTotal)}</span>
          <b>{lens === "rows" ? "100%" : men}</b>
        </div>
        <div className="table-data-row women-row" role="row">
          <strong>Mujeres</strong>
          <span>{cell(counts.womenYes, women, yesTotal)}</span>
          <span>{cell(womenNo, women, noTotal)}</span>
          <b>{lens === "rows" ? "100%" : women}</b>
        </div>
        <div className="table-data-row total-row" role="row">
          <strong>Total</strong>
          <span>{lens === "columns" ? "100%" : yesTotal}</span>
          <span>{lens === "columns" ? "100%" : noTotal}</span>
          <b>{total}</b>
        </div>
      </div>
      <p className="lens-explanation">
        {lens === "counts" && "Vemos casos: cuántas personas hay en cada cruce."}
        {lens === "rows" && "Cada fila suma 100%: preguntamos qué ocurrió dentro de cada grupo."}
        {lens === "columns" && "Cada columna suma 100%: preguntamos quiénes componen cada respuesta."}
      </p>
    </div>
  );
}

function SummaryPanel() {
  return (
    <div className="viz-view summary-table-view">
      <div className="viz-title-row">
        <div>
          <p>Dos preguntas</p>
          <h3>Las palabras cambian el denominador</h3>
        </div>
      </div>
      <div className="question-pair">
        <div>
          <span>P(respuesta sí | mujer)</span>
          <strong>58,3%</strong>
          <p>Entre las mujeres, ¿qué porcentaje respondió “sí”?</p>
        </div>
        <div>
          <span>P(mujer | respuesta sí)</span>
          <strong>depende</strong>
          <p>Entre quienes respondieron “sí”, ¿qué porcentaje son mujeres?</p>
        </div>
      </div>
      <div className="golden-rule">
        <span>Regla de oro</span>
        <strong>Antes de leer un porcentaje, encontrá el conjunto que representa el 100%.</strong>
      </div>
    </div>
  );
}

export default function TableStory() {
  const [activeStep, setActiveStep] = useState(0);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [femaleShare, setFemaleShare] = useState(54);
  const [lens, setLens] = useState<Lens>("counts");
  const [answer, setAnswer] = useState<string | null>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-table-step]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveStep(Number((visible.target as HTMLElement).dataset.tableStep));
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const panel = useMemo(() => {
    if (activeStep === 0) return <SurveyPanel />;
    if (activeStep === 1) return <OverallPanel />;
    if (activeStep === 2) return <BySexPanel />;
    if (activeStep === 3) {
      return <ReverseQuestionPanel femaleShare={femaleShare} onChange={setFemaleShare} />;
    }
    if (activeStep === 4) {
      return <ConditionalTablePanel femaleShare={femaleShare} lens={lens} setLens={setLens} />;
    }
    return <SummaryPanel />;
  }, [activeStep, femaleShare, lens]);

  return (
    <>
      <div className="story-progress table-progress" aria-hidden="true">
        <span style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} />
      </div>
      <div className="story-shell table-story-shell">
        <aside className="story-map" aria-label="Progreso de la historia">
          <span className="map-label">En esta historia</span>
          {steps.map((step, index) => (
            <a className={index === activeStep ? "active" : ""} href={`#tabla-paso-${index + 1}`} key={step}>
              <i>{index + 1}</i><span>{step}</span>
            </a>
          ))}
        </aside>

        <div className="story-copy">
          <section className="story-step" data-table-step="0" id="tabla-paso-1">
            <p className="step-number">01 · La pregunta</p>
            <h2>¿Quiénes reportaron más consumo de alcohol?</h2>
            <p>
              En 2019, 3.162 estudiantes uruguayos de 13 a 17 años participaron
              en una encuesta nacional de salud. Una pregunta fue si habían
              tomado alcohol durante los 30 días anteriores.
            </p>
            <div className="prediction-box">
              <span>¿Qué grupo pensás que mostró el porcentaje mayor?</span>
              <div className="choice-row">
                {[
                  ["men", "Varones"],
                  ["women", "Mujeres"],
                  ["same", "Muy parecidos"],
                ].map(([value, label]) => (
                  <button className={prediction === value ? "selected" : ""} key={value} onClick={() => setPrediction(value)} type="button">
                    {label}
                  </button>
                ))}
              </div>
              {prediction && <p className="choice-feedback">Anotado. Empecemos por el porcentaje general.</p>}
            </div>
          </section>

          <section className="story-step" data-table-step="1" id="tabla-paso-2">
            <p className="step-number">02 · Un porcentaje</p>
            <h2>El 54,6% respondió que sí.</h2>
            <p>
              Esta cifra resume a todo el estudiantado incluido en la
              estimación. Es una respuesta válida para “¿qué porcentaje del
              total reportó consumo?”.
            </p>
            <blockquote>
              Pero todavía no responde nuestra pregunta sobre los grupos.
            </blockquote>
            <p className="reflection">
              Para comparar necesitamos que el 100% sea, primero, todos los
              varones y, después, todas las mujeres.
            </p>
          </section>

          <section className="story-step" data-table-step="2" id="tabla-paso-3">
            <p className="step-number">03 · Comparar grupos</p>
            <h2>Ahora el total cambia dos veces.</h2>
            <p>
              Entre los estudiantes varones, el 49,7% reportó consumo. Entre
              las estudiantes mujeres, el porcentaje fue 58,3%.
            </p>
            <div className="concept-note">
              <strong>Prevalencia dentro del grupo</strong>
              <span>casos que respondieron “sí” / total de ese grupo</span>
            </div>
            <p>
              Podemos decir que la prevalencia fue 8,6 puntos porcentuales
              mayor entre las mujeres. Pero cuidado: todavía no dijimos quiénes
              componen el conjunto de personas que respondió “sí”.
            </p>
          </section>

          <section className="story-step" data-table-step="3" id="tabla-paso-4">
            <p className="step-number">04 · Invertir la pregunta</p>
            <h2>“Entre las mujeres” no es lo mismo que “entre quienes tomaron”.</h2>
            <p>
              Ahora preguntamos: de todas las personas que reportaron consumo,
              ¿qué porcentaje son mujeres?
            </p>
            <p>
              Las tasas de 49,7% y 58,3% no alcanzan para responder. También
              necesitamos saber cuántas personas hay en cada grupo.
            </p>
            <div className="interaction-cue">
              <strong>Probalo en el gráfico.</strong>
              <span>Cambiá la proporción de mujeres. Las prevalencias quedan fijas, pero la composición cambia.</span>
            </div>
          </section>

          <section className="story-step" data-table-step="4" id="tabla-paso-5">
            <p className="step-number">05 · Cambiar el total</p>
            <h2>La misma tabla puede responder tres preguntas.</h2>
            <p>
              Los conteos muestran cuántas personas hay. Los porcentajes por
              fila comparan prevalencias dentro de cada grupo. Los porcentajes
              por columna muestran quiénes componen cada respuesta.
            </p>
            <p>
              Tocá los tres botones de la tabla. Los números cambian porque
              cambia el conjunto que definimos como 100%.
            </p>
          </section>

          <section className="story-step" data-table-step="5" id="tabla-paso-6">
            <p className="step-number">06 · La conclusión</p>
            <h2>Un porcentaje siempre es condicional a un conjunto.</h2>
            <p>
              La frase “el 58,3% de las mujeres reportó consumo” tiene un
              significado preciso. No significa que el 58,3% de quienes
              reportaron consumo sean mujeres.
            </p>
            <div className="final-question">
              <strong>¿Qué significa exactamente 58,3%?</strong>
              {[
                ["a", "De todas las personas que tomaron alcohol, 58,3% eran mujeres."],
                ["b", "De cada 100 mujeres, aproximadamente 58 reportaron consumo."],
                ["c", "El 58,3% de toda la muestra eran mujeres que tomaron alcohol."],
              ].map(([value, label]) => (
                <button className={answer === value ? "selected" : ""} key={value} onClick={() => setAnswer(value)} type="button">
                  <span>{value.toUpperCase()}</span>{label}
                </button>
              ))}
              {answer && (
                <p className={answer === "b" ? "answer-correct" : "answer-try"}>
                  {answer === "b"
                    ? "Exacto. El denominador es el total de estudiantes mujeres."
                    : "Buscá qué conjunto representa el 100% en el gráfico por grupos."}
                </p>
              )}
            </div>
          </section>
        </div>

        <aside className="story-viz" aria-live="polite">
          <div className="viz-card table-viz-card" key={activeStep}>{panel}</div>
          <p className="source-line">
            Fuente:{" "}
            <a
              href="https://www.who.int/publications/m/item/2019-gshs-fact-sheet-uruguay"
              rel="noreferrer"
              target="_blank"
            >
              OMS y MSP, Encuesta Mundial de Salud en Estudiantes, Uruguay 2019
            </a>.
          </p>
        </aside>
      </div>
    </>
  );
}
