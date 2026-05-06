const fs = require('fs');
let c = fs.readFileSync('app/course/module-9/page.tsx', 'utf8');
const n = '\n';

const replacements = [
  // === SECTION 0: m9-module-overview ===
  // "What success looks like" card - unique class
  [`<Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">`,
   `<Card componentId="m9-module-overview" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">`],
  // "What you should be able to do by the end"
  [`<Card className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">What you should be able to do by the end</h3>`,
   `<Card componentId="m9-module-overview" className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">What you should be able to do by the end</h3>`],

  // === SECTION 1: m9-explain-ai ===
  // "A plain-English explanation of AI"
  [`<Card className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">A plain-English explanation of AI</h3>`,
   `<Card componentId="m9-explain-ai" className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">A plain-English explanation of AI</h3>`],
  // grid cards "What goes in / happens / comes out" (key={title}, p-4)
  [`}).map(({ title, body }) => (${n}                  <Card key={title} className="p-4">`,
   `}).map(({ title, body }) => (${n}                  <Card key={title} componentId="m9-explain-ai" className="p-4">`],
  // "30-second teach-back formula"
  [`<Card className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-green">The 30-second teach-back formula</h3>`,
   `<Card componentId="m9-explain-ai" className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-green">The 30-second teach-back formula</h3>`],

  // === SECTION 2: m9-choose-tools ===
  // Tool Selection Table
  [`<Card className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Tool Selection Table:`,
   `<Card componentId="m9-choose-tools" className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Tool Selection Table:`],
  // "A practical toolkit map"
  [`<Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-4 text-brand-orange">A practical toolkit map</h3>`,
   `<Card componentId="m9-choose-tools" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-4 text-brand-orange">A practical toolkit map</h3>`],
  // "When to use a chat assistant"
  [`<Card className="p-5">${n}                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><MessageSquare className="h-4 w-4" />When to use a chat assistant</h3>`,
   `<Card componentId="m9-choose-tools" className="p-5">${n}                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><MessageSquare className="h-4 w-4" />When to use a chat assistant</h3>`],
  // "When to use research tools"
  [`<Card className="p-5">${n}                  <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2"><Search className="h-4 w-4" />When to use research tools</h3>`,
   `<Card componentId="m9-choose-tools" className="p-5">${n}                  <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2"><Search className="h-4 w-4" />When to use research tools</h3>`],
  // workflowToolGroups map
  [`<Card key={category} className="p-5">`,
   `<Card key={category} componentId="m9-choose-tools" className="p-5">`],

  // === SECTION 3: m9-prompting ===
  // "Assistant Prompting Comparison Table"
  [`<Card className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Assistant Prompting Comparison Table</h3>`,
   `<Card componentId="m9-prompting" className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Assistant Prompting Comparison Table</h3>`],
  // "A reliable prompt structure"
  [`<Card className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">A reliable prompt structure</h3>`,
   `<Card componentId="m9-prompting" className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">A reliable prompt structure</h3>`],
  // "One task, three assistants"
  [`<Card className="p-5">${n}                <h3 className="font-semibold mb-4 text-brand-green">One task, three assistants</h3>`,
   `<Card componentId="m9-prompting" className="p-5">${n}                <h3 className="font-semibold mb-4 text-brand-green">One task, three assistants</h3>`],
  // "Prompt upgrade example"
  [`<Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Prompt upgrade example</h3>`,
   `<Card componentId="m9-prompting" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Prompt upgrade example</h3>`],
  // assistant map cards
  [`<Card key={assistant} className="p-4 bg-background">`,
   `<Card key={assistant} componentId="m9-prompting" className="p-4 bg-background">`],

  // === SECTION 4: m9-safety-checks ===
  // "Risk Checklist"
  [`<Card className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Risk Checklist`,
   `<Card componentId="m9-safety-checks" className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Risk Checklist`],
  // Bias card
  [`<Card className="p-5">${n}                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><Shield className="h-4 w-4" />Bias</h3>`,
   `<Card componentId="m9-safety-checks" className="p-5">${n}                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><Shield className="h-4 w-4" />Bias</h3>`],
  // Privacy card
  [`<Card className="p-5">${n}                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><Shield className="h-4 w-4" />Privacy</h3>`,
   `<Card componentId="m9-safety-checks" className="p-5">${n}                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><Shield className="h-4 w-4" />Privacy</h3>`],
  // Misinformation card
  [`<Card className="p-5">${n}                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><Shield className="h-4 w-4" />Misinformation</h3>`,
   `<Card componentId="m9-safety-checks" className="p-5">${n}                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><Shield className="h-4 w-4" />Misinformation</h3>`],
  // "five-question critical thinking filter"
  [`<Card className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">A five-question critical thinking filter</h3>`,
   `<Card componentId="m9-safety-checks" className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">A five-question critical thinking filter</h3>`],
  // "Red flags that should slow you down"
  [`<Card className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Red flags that should slow you down</h3>`,
   `<Card componentId="m9-safety-checks" className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Red flags that should slow you down</h3>`],

  // === SECTION 5: m9-workflows ===
  // "Workflow Blueprint"
  [`<Card className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Workflow Blueprint:`,
   `<Card componentId="m9-workflows" className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Workflow Blueprint:`],
  // "The easiest first workflow recipe"
  [`<Card className="p-5">${n}                <h3 className="font-semibold mb-4 text-brand-green">The easiest first workflow recipe</h3>`,
   `<Card componentId="m9-workflows" className="p-5">${n}                <h3 className="font-semibold mb-4 text-brand-green">The easiest first workflow recipe</h3>`],
  // "Example Workflow: Auto-summarise"
  [`<Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-4 text-brand-orange">Example Workflow:`,
   `<Card componentId="m9-workflows" className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">${n}                <h3 className="font-semibold mb-4 text-brand-orange">Example Workflow:`],
  // workflow type cards (key={title}, p-4, desc)
  [`}).map(({ title, desc }) => (${n}                  <Card key={title} className="p-4">`,
   `}).map(({ title, desc }) => (${n}                  <Card key={title} componentId="m9-workflows" className="p-4">`],

  // === SECTION 6: m9-mini-project ===
  // "Step-by-step capstone project"
  [`<Card className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Step-by-step capstone project`,
   `<Card componentId="m9-mini-project" className="p-5 border-brand-orange/20 bg-brand-orange/5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Step-by-step capstone project`],
  // "Mini-Project: Design One Safe, Useful Workflow"
  [`<Card className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5">${n}                <h3 className="font-semibold mb-3">Mini-Project: Design One Safe`,
   `<Card componentId="m9-mini-project" className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5">${n}                <h3 className="font-semibold mb-3">Mini-Project: Design One Safe`],
  // "Three stronger starter project ideas"
  [`<Card className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Three stronger starter project ideas</h3>`,
   `<Card componentId="m9-mini-project" className="p-5 border-brand-green/20 bg-brand-green/5">${n}                <h3 className="font-semibold mb-3 text-brand-green">Three stronger starter project ideas</h3>`],
  // "Capstone checklist"
  [`<Card className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Capstone checklist</h3>`,
   `<Card componentId="m9-mini-project" className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-orange">Capstone checklist</h3>`],

  // === SECTION 7: m9-next-steps ===
  // "What you can now do"
  [`<Card className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />What you can now do</h3>`,
   `<Card componentId="m9-next-steps" className="p-5">${n}                <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />What you can now do</h3>`],
  // 30-day challenge cards (key={item}, p-4)
  [`<Card key={item} className="p-4">`,
   `<Card key={item} componentId="m9-next-steps" className="p-4">`],
  // resource cards (key={category}, p-4)
  [`<Card key={category} className="p-4">`,
   `<Card key={category} componentId="m9-next-steps" className="p-4">`],
  // closing card "You are ready to use AI"
  [`<Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 text-center">`,
   `<Card componentId="m9-next-steps" className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 text-center">`],
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

fs.writeFileSync('app/course/module-9/page.tsx', c, 'utf8');
console.log('Applied', count, 'replacements');
const withId = (c.match(/<Card [^>]*componentId=/g)||[]).length;
const noId = (c.match(/<Card [^>]*className=/g)||[]).filter(m=>!m.includes('componentId')).length;
console.log('with componentId:', withId, 'without:', noId);
