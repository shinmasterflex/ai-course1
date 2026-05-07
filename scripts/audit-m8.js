const fs = require('fs');
let c = fs.readFileSync('app/course/module-8/page.tsx', 'utf8');

const n = '\r\n';

// First check what's there
const noId = (c.match(/<Card [^>]*className=/g) ? c.match(/<Card [^>]*className=/g) : []).filter(m=>!m.includes('componentId'));
console.log('Cards without componentId:', noId.length);
noId.forEach(m => console.log(' ', m.substring(0,80)));
