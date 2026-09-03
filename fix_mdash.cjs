const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/ &mdash; /g, ' ');
  content = content.replace(/&mdash;/g, '');
  fs.writeFileSync(filePath, content);
}

replaceInFile('src/pages/About.tsx');
replaceInFile('src/pages/CreatorPipeline.tsx');
replaceInFile('src/pages/UGCCampaigns.tsx');
