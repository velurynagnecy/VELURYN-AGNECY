const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');
content = content.replace(/<div style=\{\{\s*position: 'relative',\s*zIndex: 1,\s*display: 'grid',\s*gridTemplateColumns: '[^']+',\s*gap: '4rem',\s*padding: '0 4rem',\s*maxWidth: '1400px',\s*margin: '0 auto'\s*\}\}>/m, '<div className="footer-grid">');
fs.writeFileSync('src/components/Footer.tsx', content);
