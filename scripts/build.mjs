import { readFile, writeFile, mkdir, rm, readdir, copyFile, cp } from "node:fs/promises";
import path from "node:path";
import { minify } from "html-minifier-terser";
import JavaScriptObfuscator from "javascript-obfuscator";

const args = new Set(process.argv.slice(2));
const obfuscate = args.has("--obfuscate");
const outArg = process.argv.slice(2).find((arg) => arg.startsWith("--out="));
const outDir = outArg ? outArg.slice("--out=".length) : "dist";
const root = process.cwd();
const sourceHtml = path.join(root, "index.html");
const destination = path.join(root, outDir);

const excludedRootFiles = new Set([
  "index.html",
  "README.md",
  "package.json",
  "package-lock.json",
  "npm-shrinkwrap.json"
]);

const deployableExtensions = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".svg",
  ".json", ".txt", ".xml", ".webmanifest"
]);

function isJavaScriptScriptTag(attributes) {
  if (/\bsrc\s*=/.test(attributes)) return false;
  const typeMatch = attributes.match(/\btype\s*=\s*["']([^"']+)["']/i);
  if (!typeMatch) return true;
  const type = typeMatch[1].trim().toLowerCase();
  return type === "text/javascript" || type === "application/javascript" || type === "module";
}

function obfuscateInlineScripts(html) {
  return html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (full, attributes, code) => {
    if (!isJavaScriptScriptTag(attributes) || !code.trim()) return full;

    const result = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      disableConsoleOutput: false,
      identifierNamesGenerator: "hexadecimal",
      renameGlobals: false,
      rotateStringArray: true,
      selfDefending: false,
      simplify: true,
      splitStrings: false,
      stringArray: true,
      stringArrayCallsTransform: false,
      stringArrayEncoding: [],
      stringArrayThreshold: 0.75,
      transformObjectKeys: false,
      unicodeEscapeSequence: false
    });

    return `<script${attributes}>${result.getObfuscatedCode()}</script>`;
  });
}

async function copyDeployableRootFiles() {
  const entries = await readdir(root, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === outDir || entry.name === ".git" || entry.name === ".github" || entry.name === "scripts" || entry.name === "node_modules") {
      continue;
    }

    const source = path.join(root, entry.name);
    const target = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "assets") {
        await cp(source, target, { recursive: true });
      }
      continue;
    }

    if (excludedRootFiles.has(entry.name)) continue;
    if (!deployableExtensions.has(path.extname(entry.name).toLowerCase())) continue;

    await copyFile(source, target);
  }
}

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });

let html = await readFile(sourceHtml, "utf8");

if (obfuscate) {
  html = obfuscateInlineScripts(html);
}

const output = await minify(html, {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  decodeEntities: false,
  keepClosingSlash: true,
  minifyCSS: true,
  minifyJS: obfuscate ? false : true,
  processScripts: ["text/html"],
  removeComments: true,
  removeEmptyAttributes: false,
  removeOptionalTags: false,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: false,
  sortClassName: false,
  useShortDoctype: true
});

await writeFile(path.join(destination, "index.html"), output, "utf8");
await copyDeployableRootFiles();

const beforeBytes = Buffer.byteLength(await readFile(sourceHtml));
const afterBytes = Buffer.byteLength(output);
const saving = beforeBytes > 0 ? ((1 - afterBytes / beforeBytes) * 100).toFixed(1) : "0.0";

console.log(`Build complete: ${outDir}/index.html`);
console.log(`Mode: ${obfuscate ? "minified + JavaScript obfuscation" : "minified"}`);
console.log(`HTML: ${beforeBytes} bytes -> ${afterBytes} bytes (${saving}% smaller)`);
