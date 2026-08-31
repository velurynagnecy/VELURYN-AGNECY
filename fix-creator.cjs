const fs = require('fs');
const file = 'src/pages/CreatorPipeline.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/top mobile app brands\./g, 'top performance brands.');
content = content.replace(/native video content for apps\./g, 'native video content for brands.');
content = content.replace(/consumer mobile apps\./g, 'direct-response brands.');
content = content.replace(/We primarily serve mobile apps in Fintech, Dating, Gaming, and Productivity\./g, 'We primarily serve performance brands in E-Commerce, Tech, Health, and Lifestyle.');

fs.writeFileSync(file, content);
