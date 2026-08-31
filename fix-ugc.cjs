const fs = require('fs');
const file = 'src/pages/UGCCampaigns.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/consumer mobile apps\./g, 'direct-response brands.');
content = content.replace(/tailored for mobile growth\./g, 'tailored for brand growth.');
content = content.replace(/app verticals/g, 'brand verticals');
content = content.replace(/We understand apps need content/g, 'We understand brands need content');
content = content.replace(/Every app is different\./g, 'Every brand is different.');

fs.writeFileSync(file, content);
