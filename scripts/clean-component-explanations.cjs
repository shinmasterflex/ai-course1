const fs = require("fs");
const path = "lib/component-explanations.ts";
let t = fs.readFileSync(path, "utf8");

const stripLineIfTagBoilerplate = (line) => {
  const l = line.trim().toLowerCase();
  if (!l) return line;
  const hasTagWords = l.includes("ai_tag_") || l.includes("metric_tag_") || l.includes("owner_tag_") || l.includes("review_tag_");
  if (!hasTagWords) return line;
  const noPunc = l.replace(/[.,;:!?()\[\]{}"']/g, " ").replace(/\s+/g, " ").trim();
  if (noPunc.length < 220) return "";
  return line;
};

// Clean each explanation block independently.
t = t.replace(/(explanation:\s*`)([\s\S]*?)(`,)/g, (_, start, body, end) => {
  const lines = body.split("\n");
  const cleaned = [];
  for (const line of lines) {
    const next = stripLineIfTagBoilerplate(line);
    if (next !== "") cleaned.push(next);
  }

  // Collapse duplicate consecutive non-empty lines.
  const dedup = [];
  for (const line of cleaned) {
    const prev = dedup[dedup.length - 1];
    if (prev && prev.trim().length > 0 && line.trim().length > 0 && prev.trim() === line.trim()) {
      continue;
    }
    dedup.push(line);
  }

  // Normalize excessive blank lines.
  const normalized = dedup.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  return start + normalized + end;
});

fs.writeFileSync(path, t);
console.log("component-explanations cleaned");
