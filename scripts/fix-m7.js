const fs = require('fs');
let c = fs.readFileSync('app/course/module-7/page.tsx', 'utf8');

const n = '\r\n';

const replacements = [
  [`<Card className="p-5 space-y-2">${n}                {[${n}                  "How AI is changing the workplace right now",`,
   `<Card componentId="m7-module-overview" className="p-5 space-y-2">${n}                {[${n}                  "How AI is changing the workplace right now",`],
  [`<Card className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Your first workplace use should pass this test</h3>`,
   `<Card componentId="m7-workplace-ai" className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Your first workplace use should pass this test</h3>`],
  [`<Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-4 text-brand-orange">The Three-Category Framework</h3>`,
   `<Card componentId="m7-future-jobs" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-4 text-brand-orange">The Three-Category Framework</h3>`],
  [`<Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-4 text-brand-orange">The Individual AI Strategy Framework</h3>`,
   `<Card componentId="m7-business-strategy" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-4 text-brand-orange">The Individual AI Strategy Framework</h3>`],
  [`<Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">${n}                <h3 className="font-semibold mb-4 text-brand-orange">How to Champion AI at Your Organisation</h3>`,
   `<Card componentId="m7-business-strategy" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">${n}                <h3 className="font-semibold mb-4 text-brand-orange">How to Champion AI at Your Organisation</h3>`],
  [`<Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">${n}                <h3 className="font-semibold mb-4 text-brand-orange flex items-center gap-2"><Target className="h-5 w-5" />The Task Analysis Matrix</h3>`,
   `<Card componentId="m7-opportunities" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">${n}                <h3 className="font-semibold mb-4 text-brand-orange flex items-center gap-2"><Target className="h-5 w-5" />The Task Analysis Matrix</h3>`],
  [`<Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><PenTool className="h-4 w-4" />Your Turn: Apply the Framework</h3>`,
   `<Card componentId="m7-opportunities" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><PenTool className="h-4 w-4" />Your Turn: Apply the Framework</h3>`],
  [`<Card className="p-5 bg-gradient-to-br from-blue-50 to-brand-green/5 dark:from-blue-950/30 dark:to-brand-green/10">`,
   `<Card componentId="m7-role-transformation" className="p-5 bg-gradient-to-br from-blue-50 to-brand-green/5 dark:from-blue-950/30 dark:to-brand-green/10">`],
  [`<Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">${n}                <h3 className="font-semibold mb-4 text-brand-orange flex items-center gap-2"><Zap className="h-5 w-5" />The Exercise (takes 30 minutes)</h3>`,
   `<Card componentId="m7-workflow-redesign" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">${n}                <h3 className="font-semibold mb-4 text-brand-orange flex items-center gap-2"><Zap className="h-5 w-5" />The Exercise (takes 30 minutes)</h3>`],
  [`<Card className="p-5 border-blue-500/20 bg-blue-500/5">${n}                <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-3">Example: Sales Outreach Workflow Redesign</h3>`,
   `<Card componentId="m7-workflow-redesign" className="p-5 border-blue-500/20 bg-blue-500/5">${n}                <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-3">Example: Sales Outreach Workflow Redesign</h3>`],
  [`<Card className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5 border-brand-green/20">${n}                <h3 className="font-bold text-brand-orange mb-3">Now your turn:</h3>`,
   `<Card componentId="m7-workflow-redesign" className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5 border-brand-green/20">${n}                <h3 className="font-bold text-brand-orange mb-3">Now your turn:</h3>`],
  [`<Card className="p-5 bg-gradient-to-br from-green-50 to-brand-green/10 dark:from-green-950/20 dark:to-brand-green/5 border border-brand-green/20">`,
   `<Card componentId="m7-workflow-redesign" className="p-5 bg-gradient-to-br from-green-50 to-brand-green/10 dark:from-green-950/20 dark:to-brand-green/5 border border-brand-green/20">`],
  [`<Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">${n}                <h3 className="font-semibold mb-3 text-brand-green">A practical 90-day career plan</h3>`,
   `<Card componentId="m7-building-skills" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">${n}                <h3 className="font-semibold mb-3 text-brand-green">A practical 90-day career plan</h3>`],
];

let count = 0;
for (const [from, to] of replacements) {
  if (c.includes(from)) {
    c = c.replace(from, to);
    count++;
  } else {
    console.log('NOT FOUND:', from.substring(0, 80));
  }
}

fs.writeFileSync('app/course/module-7/page.tsx', c, 'utf8');
console.log('Applied', count, 'replacements');

const withId = (c.match(/<Card [^>]*componentId=/g) ? c.match(/<Card [^>]*componentId=/g) : []).length;
const withoutId = (c.match(/<Card [^>]*className=/g) ? c.match(/<Card [^>]*className=/g) : []).filter(m=>!m.includes('componentId')).length;
console.log('with componentId:', withId, 'without:', withoutId);
