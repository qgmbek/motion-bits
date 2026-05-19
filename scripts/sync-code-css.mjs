import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "../app/animations/components");

const pairs = [
  ["CodeGrid", "CodeGrid.css"],
  ["BorderShard", "BorderShard.css"],
  ["GradientCard", "GradientCard.css"],
  ["ScrambleScreen", "ScrambleScreen.css"],
  ["LudwigHover", "LudwigHover.css"],
];

for (const [name, cssFile] of pairs) {
  const codePath = path.join(base, name, `${name}.code.js`);
  const cssPath = path.join(base, name, cssFile);
  let content = fs.readFileSync(codePath, "utf8");
  content = content.replace(/\nexport const css = `[\s\S]*?`;\s*$/m, "");
  const css = fs.readFileSync(cssPath, "utf8").trimEnd();
  const escaped = css
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
  const updated = `${content.trimEnd()}\n\nexport const css = \`${escaped}\`;\n`;
  fs.writeFileSync(codePath, updated);
  console.log("Updated", name);
}
