import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const animationsRoot = path.join(__dirname, "../app/animations");

function escapeForTemplateLiteral(str) {
  return str
    .replace(/\r\n/g, "\n")
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function findImportedStylePaths(tsxContent, componentDir) {
  const re =
    /import\s+["'](\.\/[^"']+\.(?:css|module\.css))["']/g;
  const files = [];
  let m;
  while ((m = re.exec(tsxContent))) {
    const abs = path.join(componentDir, m[1].replace(/^\.\//, ""));
    if (fs.existsSync(abs)) files.push(abs);
  }
  return files;
}

function syncDir(dir) {
  const folderName = path.basename(dir);
  const tsxPath = path.join(dir, `${folderName}.tsx`);
  if (!fs.existsSync(tsxPath)) return null;

  const tsx = fs.readFileSync(tsxPath, "utf8");
  const stylePaths = findImportedStylePaths(tsx, dir);
  let combinedCss = "";
  if (stylePaths.length === 1) {
    combinedCss = fs.readFileSync(stylePaths[0], "utf8").replace(/\r\n/g, "\n").trimEnd();
  } else if (stylePaths.length > 1) {
    combinedCss = stylePaths
      .map((p) =>
        fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n").trimEnd(),
      )
      .join("\n\n");
  }

  const codeJsPath = path.join(dir, `${folderName}.code.js`);
  let out = `const code = \`${escapeForTemplateLiteral(tsx)}\`;\n\nexport default code;\n`;
  if (combinedCss) {
    out += `\nexport const css = \`${escapeForTemplateLiteral(combinedCss)}\`;\n`;
  }
  fs.writeFileSync(codeJsPath, out);
  return { rel: path.relative(animationsRoot, codeJsPath), hasCss: Boolean(combinedCss) };
}

function walkCategory(category) {
  const base = path.join(animationsRoot, category);
  if (!fs.existsSync(base)) return [];
  const out = [];
  for (const name of fs.readdirSync(base)) {
    const dir = path.join(base, name);
    if (!fs.statSync(dir).isDirectory()) continue;
    const r = syncDir(dir);
    if (r) out.push(r);
  }
  return out;
}

const text = walkCategory("text");
const components = walkCategory("components");
console.log("Synced", text.length + components.length, "code.js files");
for (const r of [...text, ...components]) {
  console.log(r.rel, r.hasCss ? "+css" : "");
}
