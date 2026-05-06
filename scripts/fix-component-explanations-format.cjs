const fs = require("fs");
const path = "lib/component-explanations.ts";
let t = fs.readFileSync(path, "utf8");

// Remove leftover inline tag tokens inside explanations.
t = t.replace(/\b(?:ai|metric|owner|review)_tag_[a-z0-9-]+\b/gi, "");

// Normalize each explanation to keep explicit paragraph spacing.
t = t.replace(/(explanation:\s*`)([\s\S]*?)(`,)/g, (_, start, body, end) => {
  let b = body
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // If paragraphs were collapsed to single newlines, restore blank lines between lines.
  if (!/\n\n/.test(b) && /\n/.test(b)) {
    const lines = b.split("\n").map((line) => line.trim()).filter(Boolean);
    b = lines.join("\n\n");
  }

  // Ensure at least 3 paragraph blocks when possible by splitting long single block into 3 sentences groups.
  const paras = b.split(/\n\n/).map((p) => p.trim()).filter(Boolean);
  if (paras.length < 3) {
    const sentences = b.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (sentences.length >= 6) {
      const n = Math.ceil(sentences.length / 3);
      b = [
        sentences.slice(0, n).join(" "),
        sentences.slice(n, 2 * n).join(" "),
        sentences.slice(2 * n).join(" "),
      ].map((p) => p.trim()).filter(Boolean).join("\n\n");
    }
  }

  // Clean common leftover artifacts after token removal.
  b = b
    .replace(/\b(Using|From|At this point|Inside this concept|Within this context|In operational terms|The|this lesson element)\s+[a-z0-9-]+\s*\./gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\n\n\s+/g, "\n\n")
    .trim();

  return start + b + end;
});

fs.writeFileSync(path, t);
console.log("component-explanations paragraph formatting restored");
