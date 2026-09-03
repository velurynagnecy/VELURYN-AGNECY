const fs = require('fs');

const files = fs.readdirSync('src/pages').map(f => 'src/pages/' + f)
  .concat(fs.readdirSync('src/components').map(f => 'src/components/' + f))
  .filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/direct-response/gi, 'direct response');
  content = content.replace(/high-performing/gi, 'high performing');
  content = content.replace(/fast-growing/gi, 'fast growing');
  content = content.replace(/user-generated/gi, 'user generated');
  content = content.replace(/high-converting/gi, 'high converting');
  content = content.replace(/custom-build/gi, 'custom build');
  fs.writeFileSync(file, content);
}
