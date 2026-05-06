const fs = require('fs');
let c = fs.readFileSync('app/course/module-8/page.tsx', 'utf8');
const n = '\r\n';

const replacements = [
  // Section 0: overview checklist
  [`<Card className="p-5 space-y-2">${n}                {[${n}                  "What makes an AI system an 'agent':`,
   `<Card componentId="m8-module-overview" className="p-5 space-y-2">${n}                {[${n}                  "What makes an AI system an 'agent':`],
  // Section 1: what makes an agent different
  [`<Card className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">What makes an agent different?</h3>`,
   `<Card componentId="m8-what-are-agents" className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">What makes an agent different?</h3>`],
  // Section 2: core execution loop
  [`<Card className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">The core execution loop</h3>`,
   `<Card componentId="m8-how-agents-work" className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">The core execution loop</h3>`],
  // Section 2: map cards for components
  [`<Card key={component} className="p-5">`,
   `<Card key={component} componentId="m8-how-agents-work" className="p-5">`],
  // Section 2: ReAct pattern card
  [`<Card className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">The ReAct pattern`,
   `<Card componentId="m8-how-agents-work" className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">The ReAct pattern`],
  // Section 3: Multi-Agent Systems card
  [`<Card className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Multi-Agent Systems`,
   `<Card componentId="m8-agent-types" className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Multi-Agent Systems`],
  // Section 4: two concrete examples
  [`<Card className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Two concrete examples</h3>`,
   `<Card componentId="m8-agent-applications" className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Two concrete examples</h3>`],
  // Section 4: domain map cards
  [`<Card key={domain} className="p-5">`,
   `<Card key={domain} componentId="m8-agent-applications" className="p-5">`],
  // Section 5: beginner no-code guide
  [`<Card className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Beginner no-code guide:`,
   `<Card componentId="m8-building-agents" className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Beginner no-code guide:`],
  // Section 5: tool map cards
  [`<Card key={tool} className="p-5">`,
   `<Card key={tool} componentId="m8-building-agents" className="p-5">`],
  // Section 5: anatomy of agent workflow
  [`<Card className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Anatomy of a simple agent workflow</h3>`,
   `<Card componentId="m8-building-agents" className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Anatomy of a simple agent workflow</h3>`],
  // Section 5: MCP card
  [`<Card className="p-5 border-blue-500/20 bg-blue-500/5">${n}                <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">The Emerging Standard: Model Context Protocol (MCP)</h3>`,
   `<Card componentId="m8-building-agents" className="p-5 border-blue-500/20 bg-blue-500/5">${n}                <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">The Emerging Standard: Model Context Protocol (MCP)</h3>`],
  // Section 6: risk map cards
  [`<Card key={risk} className="p-5">`,
   `<Card key={risk} componentId="m8-agent-risks" className="p-5">`],
  // Section 6: golden rule
  [`<Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">The Golden Rule for Agent Deployment</h3>`,
   `<Card componentId="m8-agent-risks" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">The Golden Rule for Agent Deployment</h3>`],
  // Section 6: guided exercise
  [`<Card className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Guided Exercise: Design an Agent Workflow</h3>`,
   `<Card componentId="m8-agent-risks" className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Guided Exercise: Design an Agent Workflow</h3>`],
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

fs.writeFileSync('app/course/module-8/page.tsx', c, 'utf8');
console.log('Applied', count, 'replacements');
const withId = (c.match(/<Card [^>]*componentId=/g)||[]).length;
const noId = (c.match(/<Card [^>]*className=/g)||[]).filter(m=>!m.includes('componentId')).length;
console.log('with componentId:', withId, 'without:', noId);
