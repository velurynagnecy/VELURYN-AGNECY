const fs = require('fs');
const file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/Connecting Apps with Creators/g, 'Connecting Brands with Creators');
content = content.replace(/consumer mobile app brands/g, 'direct-response brands');
content = content.replace(/mobile apps.+built on conversion/g, 'direct-response brands — built on conversion');
content = content.replace(/your app vertical/g, 'your brand vertical');
content = content.replace(/top-tier mobile apps/g, 'top-tier brands');
content = content.replace(/fast-growing apps across Fintech, Dating, and Productivity/g, 'fast-growing brands across E-Commerce, Health, and Tech');

fs.writeFileSync(file, content);
