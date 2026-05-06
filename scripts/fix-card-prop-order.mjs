import { readFileSync, writeFileSync, existsSync } from 'fs';

for (let m = 2; m <= 10; m++) {
  const path = `app/course/module-${m}/page.tsx`;
  if (!existsSync(path)) continue;
  let content = readFileSync(path, 'utf8');
  const before = (content.match(/<Card className="[^"]*" componentId="[^"]*"/g) || []).length;
  content = content.replace(
    /<Card className="([^"]*)" componentId="([^"]*)"/g,
    '<Card componentId="$2" className="$1"'
  );
  writeFileSync(path, content);
  console.log(`module-${m}: fixed ${before} card(s)`);
}
