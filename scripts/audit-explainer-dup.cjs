const fs = require("fs");
const text = fs.readFileSync("lib/component-explanations.ts", "utf8");
const expRe = /explanation:\s*`([\s\S]*?)`,/g;
const entries = [];
let m;
while ((m = expRe.exec(text)) !== null) entries.push(m[1]);

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
const all4 = new Map();
for (const ex of entries) {
  const words = normalize(ex).split(" ").filter(Boolean);
  for (let i = 0; i <= words.length - 4; i++) {
    const gram = words.slice(i, i + 4).join(" ");
    if (gram.length < 16) continue;
    all4.set(gram, (all4.get(gram) ? all4.get(gram) : 0) + 1);
  }
}
const top = [...all4.entries()].filter(([,c]) => c >= 8).sort((a,b)=>b[1]-a[1]).slice(0,40);
console.log("entries:", entries.length);
console.log("Top repeated 4-grams (>=8):");
for (const [g,c] of top) console.log(c+"x "+g);

const dupTagLines = (text.match(/\b[a-z0-9-]+\s+ai_tag_[^`\n]+/gi) ? text.match(/\b[a-z0-9-]+\s+ai_tag_[^`\n]+/gi) : []).length;
console.log("Tagged boilerplate line matches:", dupTagLines);
