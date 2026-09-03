const fs = require('fs');
const glob = require('glob');

const files = [
  ...fs.readdirSync('src/pages').map(f => 'src/pages/' + f),
  ...fs.readdirSync('src/components').map(f => 'src/components/' + f)
].filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/&mdash;/g, '');
  content = content.replace(//g, '');
  content = content.replace(/—/g, '');
  fs.writeFileSync(file, content);
}
console.log('Replaced entities');
