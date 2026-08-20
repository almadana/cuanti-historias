import assert from "node:assert/strict";
import test from "node:test";

test("renders the Cuanti home and both interactive lessons", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const env = {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
  const context = {
    waitUntil() {},
    passThroughOnException() {},
  };

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    env,
    context,
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const home = await response.text();
  assert.match(home, /<title>Cuanti — Historias con datos<\/title>/i);
  assert.match(home, /Los números no hablan solos/i);
  assert.match(home, /href=["']\/lecciones\/berkeley["']/i);
  assert.match(home, /href=["']\/lecciones\/porcentajes["']/i);

  const lessonResponse = await worker.fetch(
    new Request("http://localhost/lecciones/berkeley", {
      headers: { accept: "text/html" },
    }),
    env,
    context,
  );

  assert.equal(lessonResponse.status, 200);
  const lesson = await lessonResponse.text();
  assert.match(lesson, /¿Discriminaba Berkeley a las mujeres\?/i);
  assert.match(lesson, /UCBAdmissions/i);

  const percentagesResponse = await worker.fetch(
    new Request("http://localhost/lecciones/porcentajes", {
      headers: { accept: "text/html" },
    }),
    env,
    context,
  );

  assert.equal(percentagesResponse.status, 200);
  const percentages = await percentagesResponse.text();
  assert.match(percentages, /¿Qué porcentaje de qué\?/i);
  assert.match(percentages, /Encuesta Mundial de Salud en Estudiantes/i);
  assert.match(percentages, /54,6%/i);
});
