const fs = require("fs");
const t = fs.readFileSync("components/learning/course-module-page.tsx", "utf8");
const fields = ["scenarioTitle", "scenarioBody", "checklistTitle", "quickCheckPrompt", "quickCheckExplanation"];
for (const f of fields) {
  const re = new RegExp(f + ':\\s*"([^"]+)"', "g");
  const map = new Map();
  let m;
  while ((m = re.exec(t)) !== null) {
    const s = m[1];
    map.set(s, (map.get(s) ?? 0) + 1);
  }
  const dup = [...map.entries()].filter((e) => e[1] > 1);
  console.log(`\n${f} dupes: ${dup.length}`);
  for (const [s, c] of dup.slice(0, 40)) {
    console.log(`${c}x ${s}`);
  }
}
