const fs = require('fs');
const file = 'src/pages/About.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/connecting apps with creators/g, 'connecting brands with creators');
content = content.replace(/Connecting apps with creators/g, 'Connecting brands with creators');
content = content.replace(/consumer mobile apps need massive/g, 'performance brands need massive');
content = content.replace(/connecting consumer apps with diverse/g, 'connecting consumer brands with diverse');

fs.writeFileSync(file, content);
