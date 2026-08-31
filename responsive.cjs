const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  
  // Replace inline section padding with className
  content = content.replace(/style=\{\{\s*padding:\s*'8rem 4rem',/g, 'className="section-padding" style={{');
  
  // Replace inline hero padding with className
  content = content.replace(/style=\{\{\s*position:\s*'relative',\s*overflow:\s*'hidden',\s*isolation:\s*'isolate',\s*paddingTop:\s*'160px',\s*paddingBottom:\s*'120px',\s*paddingLeft:\s*'4rem',\s*paddingRight:\s*'4rem',/g, 'className="hero-padding" style={{ position: \\"relative\\", overflow: \\"hidden\\", isolation: \\"isolate\\",');

  // Replace grid-2col
  content = content.replace(/style=\{\{\s*display:\s*'grid',\s*gridTemplateColumns:\s*'repeat\(auto-fit, minmax\(400px, 1fr\)\)',/g, 'className="grid-2col" style={{');

  // Replace grid-3col
  content = content.replace(/style=\{\{\s*display:\s*'grid',\s*gridTemplateColumns:\s*'repeat\(auto-fit, minmax\(300px, 1fr\)\)',/g, 'className="grid-3col" style={{');
  
  fs.writeFileSync(path.join(pagesDir, file), content);
}
