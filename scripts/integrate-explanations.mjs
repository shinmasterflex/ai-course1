/**
 * Integrates COMPONENT_EXPLANATIONS from a separate registry
 * into per-module constants co-located with each module's section content.
 */
import { readFileSync, writeFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const filePath = join(__dirname, "../lib/component-card-content.ts")
const src = readFileSync(filePath, "utf8")
const lines = src.split("\n")

// ── 1. Locate the COMPONENT_EXPLANATIONS block ──────────────────────────────
const CE_START_PATTERN = /^export const COMPONENT_EXPLANATIONS: Record<string, ComponentExplanation> = \{/
const ceStartLine = lines.findIndex((l) => CE_START_PATTERN.test(l))
if (ceStartLine === -1) throw new Error("Could not find COMPONENT_EXPLANATIONS start")

// Find matching closing brace (top-level `};`)
let depth = 0
let ceEndLine = -1
for (let i = ceStartLine; i < lines.length; i++) {
  for (const ch of lines[i]) {
    if (ch === "{") depth++
    if (ch === "}") depth--
  }
  if (depth === 0 && i > ceStartLine) {
    ceEndLine = i
    break
  }
}
if (ceEndLine === -1) throw new Error("Could not find COMPONENT_EXPLANATIONS end")

console.log(`COMPONENT_EXPLANATIONS: lines ${ceStartLine + 1}–${ceEndLine + 1}`)

// ── 2. Extract the raw entries (the body of the object) ─────────────────────
const ceBodyLines = lines.slice(ceStartLine + 1, ceEndLine) // exclude opening/closing lines

// ── 3. Group entries by module number ────────────────────────────────────────
// Each entry starts with a line like:  "m{n}-some-id": {
// We'll collect entry text blocks per module number.
const moduleEntries = new Map() // Map<number, string[]>

for (let m = 0; m <= 10; m++) moduleEntries.set(m, [])

let currentBlock = []
let currentModule = -1
let blockDepth = 0

for (const line of ceBodyLines) {
  // Detect start of a new entry (top-level key at depth 0)
  const keyMatch = line.match(/^\s+"m(\d+)-[^"]+"\s*:\s*\{/)
  const commentMatch = line.match(/^\s+\/\/ MODULE \d/)

  if (keyMatch && blockDepth === 0) {
    // Save previous block if we had one
    if (currentBlock.length > 0 && currentModule !== -1) {
      moduleEntries.get(currentModule).push(...currentBlock)
      currentBlock = []
    }
    currentModule = parseInt(keyMatch[1], 10)
    currentBlock = [line]
    // Count braces
    for (const ch of line) {
      if (ch === "{") blockDepth++
      if (ch === "}") blockDepth--
    }
  } else if (commentMatch) {
    // Section comment – flush current block first
    if (currentBlock.length > 0 && currentModule !== -1) {
      moduleEntries.get(currentModule).push(...currentBlock)
      currentBlock = []
    }
    // Don't reset currentModule; comments just separate sections
    // (we'll skip adding the comment itself – it will be replaced by the co-located structure)
  } else if (currentModule !== -1) {
    currentBlock.push(line)
    for (const ch of line) {
      if (ch === "{") blockDepth++
      if (ch === "}") blockDepth--
    }
  }
}
// Flush last block
if (currentBlock.length > 0 && currentModule !== -1) {
  moduleEntries.get(currentModule).push(...currentBlock)
}

for (const [m, entries] of moduleEntries) {
  // Remove trailing blank lines
  while (entries.length > 0 && entries[entries.length - 1].trim() === "") entries.pop()
  console.log(`Module ${m}: ${entries.length} lines`)
}

// ── 4. Locate each moduleN's section content variable end line ───────────────
// Pattern: `const moduleNSectionLearningContent: Record<string, ...`
const moduleEndLines = new Map() // Map<number, number>  → 0-indexed line number AFTER the variable

for (let m = 0; m <= 10; m++) {
  const startPat = new RegExp(`^const module${m}SectionLearningContent`)
  const startLine = lines.findIndex((l) => startPat.test(l))
  if (startLine === -1) {
    console.warn(`Could not find module${m}SectionLearningContent`)
    continue
  }
  // Find matching `}` at depth 0 (closing brace of the object)
  let d = 0
  let endLine = -1
  for (let i = startLine; i < ceStartLine; i++) {
    for (const ch of lines[i]) {
      if (ch === "{") d++
      if (ch === "}") d--
    }
    if (d === 0 && i > startLine) {
      endLine = i
      break
    }
  }
  if (endLine === -1) {
    console.warn(`Could not find end of module${m}SectionLearningContent`)
    continue
  }
  moduleEndLines.set(m, endLine) // 0-indexed line of the closing `}`
  console.log(`module${m}SectionLearningContent ends at line ${endLine + 1}`)
}

// ── 5. Build replacement ─────────────────────────────────────────────────────
const INDENT = "  "
const newLines = [...lines]

// We'll build the new file by:
// a) Inserting per-module constants AFTER each moduleNSectionLearningContent
// b) Removing the big COMPONENT_EXPLANATIONS block (replace with derived export)

// Process in reverse order of insertion so line numbers stay valid
const insertions = [] // { afterLine: number, content: string }

for (let m = 10; m >= 0; m--) {
  const endLine = moduleEndLines.get(m)
  if (endLine === undefined) continue
  const entries = moduleEntries.get(m)
  if (!entries || entries.length === 0) continue

  const varName = `module${m}ComponentExplanations`
  const insertContent =
    `\nconst ${varName}: Record<string, ComponentExplanation> = {\n` +
    entries.join("\n") +
    `\n}\n`

  insertions.push({ afterLine: endLine, content: insertContent })
}

// Sort insertions by afterLine descending so we can splice without offset issues
insertions.sort((a, b) => b.afterLine - a.afterLine)

// We'll build the final file as a list of segments
let resultLines = [...lines]
for (const { afterLine, content } of insertions) {
  resultLines.splice(afterLine + 1, 0, content)
}

// Now find the new position of the COMPONENT_EXPLANATIONS block (line numbers shifted)
// Recalculate by finding CE_START again
const newCeStart = resultLines.findIndex((l) => CE_START_PATTERN.test(l))
if (newCeStart === -1) throw new Error("Could not re-find COMPONENT_EXPLANATIONS after insertions")

let newCeEnd = -1
let d2 = 0
for (let i = newCeStart; i < resultLines.length; i++) {
  for (const ch of resultLines[i]) {
    if (ch === "{") d2++
    if (ch === "}") d2--
  }
  if (d2 === 0 && i > newCeStart) {
    newCeEnd = i
    break
  }
}
if (newCeEnd === -1) throw new Error("Could not re-find COMPONENT_EXPLANATIONS end after insertions")

// Build the replacement for COMPONENT_EXPLANATIONS:
// A simple merge of all per-module constants
const mergedLines = []
mergedLines.push(`export const COMPONENT_EXPLANATIONS: Record<string, ComponentExplanation> = {`)
for (let m = 0; m <= 10; m++) {
  if (moduleEntries.get(m)?.length > 0) {
    mergedLines.push(`  ...module${m}ComponentExplanations,`)
  }
}
mergedLines.push(`}`)

// Replace the old block with the new merged export
resultLines.splice(newCeStart, newCeEnd - newCeStart + 1, ...mergedLines)

// ── 6. Write out ─────────────────────────────────────────────────────────────
const result = resultLines.join("\n")
writeFileSync(filePath, result, "utf8")
console.log("Done! Wrote updated file.")
