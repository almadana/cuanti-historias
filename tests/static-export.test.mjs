import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

test("genera las tres páginas y el marcador de GitHub Pages", async () => {
  await Promise.all([
    access("out/index.html"),
    access("out/lecciones/berkeley/index.html"),
    access("out/lecciones/porcentajes/index.html"),
    access("out/.nojekyll"),
  ]);
});

test("la portada usa rutas compatibles con el subdirectorio de Pages", async () => {
  const home = await readFile("out/index.html", "utf8");

  assert.match(home, /Los números no hablan solos/i);
  assert.match(home, /lecciones\/berkeley/i);

  if (basePath) {
    assert.ok(home.includes(`${basePath}/_next/`));
    assert.ok(home.includes(`${basePath}/lecciones/berkeley`));
    assert.ok(!home.includes('href="/_next/'));
  }
});

test("las lecciones conservan su contenido interactivo", async () => {
  const [berkeley, porcentajes] = await Promise.all([
    readFile("out/lecciones/berkeley/index.html", "utf8"),
    readFile("out/lecciones/porcentajes/index.html", "utf8"),
  ]);

  assert.match(berkeley, /¿Discriminaba Berkeley a las mujeres\?/i);
  assert.match(berkeley, /UCBAdmissions/i);
  assert.match(porcentajes, /¿Qué porcentaje de qué\?/i);
  assert.match(porcentajes, /estudiantes uruguayos/i);
});
