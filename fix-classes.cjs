const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  
  // Fix double classNames
  content = content.replace(/className="([^"]+)"\s+className="([^"]+)"/g, 'className="$1 $2"');
  
  fs.writeFileSync(path.join(pagesDir, file), content);
}
