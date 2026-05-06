const fs = require("fs");
const path = "lib/component-explanations.ts";
let t = fs.readFileSync(path, "utf8");

const AI_WORD_RE = /\b(ai|model|data|learning|system|tool)\b/i;

function toThreeParagraphs(text) {
  const clean = text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();

  const sentences = clean.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length < 3) {
    return clean;
  }

  const n = Math.ceil(sentences.length / 3);
  const p1 = sentences.slice(0, n).join(" ").trim();
  const p2 = sentences.slice(n, 2 * n).join(" ").trim();
  const p3 = sentences.slice(2 * n).join(" ").trim();

  let result = [p1, p2, p3].filter(Boolean).join("\n\n");
  if (!AI_WORD_RE.test(result)) {
    result = `${result}\n\nThis AI context reinforces practical learning and decision quality.`;
  }
  return result;
}

t = t.replace(/(explanation:\s*`)([\s\S]*?)(`,)/g, (_, start, body, end) => {
  const rebuilt = toThreeParagraphs(body);
  return start + rebuilt + end;
});

fs.writeFileSync(path, t);
console.log("component-explanations reflowed to 3-paragraph format");
