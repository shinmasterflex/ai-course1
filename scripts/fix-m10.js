const fs = require('fs');
let c = fs.readFileSync('app/course/module-10/page.tsx', 'utf8');
const n = '\r\n';

const replacements = [
  // Section 0: overview checklist
  [`<Card className="p-5 space-y-2">${n}                {[${n}                  "Current frontiers:`,
   `<Card componentId="m10-module-overview" className="p-5 space-y-2">${n}                {[${n}                  "Current frontiers:`],

  // Section 1: frontiers map card
  [`<Card key={area} className="p-5">`,
   `<Card key={area} componentId="m10-current-frontiers" className="p-5">`],

  // Section 2: agi - narrow AI vs AGI
  [`<Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-4 text-brand-orange">Narrow AI today vs AGI concept</h3>`,
   `<Card componentId="m10-agi" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-4 text-brand-orange">Narrow AI today vs AGI concept</h3>`],

  // Section 2: agi - Why uncertainty is normal
  [`<Card className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Why uncertainty is normal (not a failure)</h3>`,
   `<Card componentId="m10-agi" className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Why uncertainty is normal (not a failure)</h3>`],

  // Section 2: agi - no-hype stance
  [`<Card className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-green">A no-hype stance you can use</h3>`,
   `<Card componentId="m10-agi" className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-green">A no-hype stance you can use</h3>`],

  // Section 3: governance - challenge map cards
  [`<Card key={challenge} className="p-5">`,
   `<Card key={challenge} componentId="m10-governance" className="p-5">`],

  // Section 3: governance - practitioners
  [`<Card className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">What this means for practitioners</h3>`,
   `<Card componentId="m10-governance" className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">What this means for practitioners</h3>`],

  // Section 4: careers - technical pathways
  [`<Card className="p-5 border-brand-green/20 bg-brand-green/5">${n}                  <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2"><Briefcase className="h-4 w-4" />Technical pathways</h3>`,
   `<Card componentId="m10-careers" className="p-5 border-brand-green/20 bg-brand-green/5">${n}                  <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2"><Briefcase className="h-4 w-4" />Technical pathways</h3>`],

  // Section 4: careers - non-technical pathways
  [`<Card className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><Shield className="h-4 w-4" />Non-technical pathways</h3>`,
   `<Card componentId="m10-careers" className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><Shield className="h-4 w-4" />Non-technical pathways</h3>`],

  // Section 4: careers - CTA framework
  [`<Card className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">How to stay relevant: the C-T-A framework</h3>`,
   `<Card componentId="m10-careers" className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">How to stay relevant: the C-T-A framework</h3>`],

  // Section 5: personal-strategy - Part 1
  [`<Card className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Part 1: Clarify your direction</h3>`,
   `<Card componentId="m10-personal-strategy" className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Part 1: Clarify your direction</h3>`],

  // Section 5: personal-strategy - Part 2
  [`<Card className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Part 2: Build a timeline</h3>`,
   `<Card componentId="m10-personal-strategy" className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Part 2: Build a timeline</h3>`],

  // Section 5: personal-strategy - Part 3
  [`<Card className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Part 3: Define your operating cadence</h3>`,
   `<Card componentId="m10-personal-strategy" className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Part 3: Define your operating cadence</h3>`],

  // Section 5: personal-strategy - strategy prompt
  [`<Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">`,
   `<Card componentId="m10-personal-strategy" className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">`],
];

let count = 0;
for (const [from, to] of replacements) {
  if (c.includes(from)) {
    c = c.replace(from, to);
    count++;
  } else {
    console.log('NOT FOUND:', from.substring(0, 100));
  }
}

fs.writeFileSync('app/course/module-10/page.tsx', c, 'utf8');
console.log('Applied', count, 'replacements');
const withId = (c.match(/<Card [^>]*componentId=/g)||[]).length;
const noId = (c.match(/<Card [^>]*className=/g)||[]).filter(m=>!m.includes('componentId')).length;
console.log('with componentId:', withId, 'without:', noId);
