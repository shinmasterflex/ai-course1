const fs = require('fs');
let c = fs.readFileSync('app/course/module-9/page.tsx', 'utf8');

const fixes = [
  [
    '                ].map(({ title, body }) => (\n                  <Card key={title} className="p-4">',
    '                ].map(({ title, body }) => (\n                  <Card key={title} componentId="m9-explain-ai" className="p-4">'
  ],
  [
    '                ].map(({ title, desc }) => (\n                  <Card key={title} className="p-4">',
    '                ].map(({ title, desc }) => (\n                  <Card key={title} componentId="m9-workflows" className="p-4">'
  ],
];

let count = 0;
for (const [from, to] of fixes) {
  if (c.includes(from)) { c = c.replace(from, to); count++; }
  else console.log('NOT FOUND:', from.substring(0, 80));
}

fs.writeFileSync('app/course/module-9/page.tsx', c, 'utf8');
console.log('Applied', count, 'fixes');
const withId = (c.match(/<Card [^>]*componentId=/g)||[]).length;
const noId = (c.match(/<Card [^>]*className=/g)||[]).filter(m=>!m.includes('componentId')).length;
console.log('with:', withId, 'without:', noId);
