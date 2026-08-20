import { copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const nextCli = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);

await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [nextCli, "build"], {
    stdio: "inherit",
    env: {
      ...process.env,
      CUANTI_STATIC_EXPORT: "1",
    },
  });

  child.once("error", reject);
  child.once("exit", (code) => {
    if (code === 0) resolve();
    else reject(new Error(`next build terminó con código ${code}`));
  });
});

await copyFile(".nojekyll", "out/.nojekyll");
