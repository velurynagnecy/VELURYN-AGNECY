const fs = require('fs');
const path = require('path');

const srcDirs = ['src/pages', 'src/components'];
const replacements = [
  [/home-hero\.jpg/g, 'home-hero.webp'],
  [/about-hero\.jpg/g, 'about-hero.webp'],
  [/contact-hero\.jpg/g, 'contact-hero.webp'],
  [/creator-pipeline-hero\.jpg/g, 'creator-pipeline-hero.webp'],
  [/ugc-campaigns-hero\.jpg/g, 'ugc-campaigns-hero.webp'],
  [/how-we-work-hero\.jpg/g, 'how-we-work-hero.webp'],
  [/brands\.jpg/g, 'brands.webp'],
  [/creators\.jpg/g, 'creators.webp'],
  [/editorial1\.jpg/g, 'editorial1.webp'],
  [/editorial2\.jpg/g, 'editorial2.webp'],
  [/hero\.jpg/g, 'hero.webp'],
  [/manifesto\.jpg/g, 'manifesto.webp'],
  [/logo-transparent\.png/g, 'logo-transparent.webp'],
  [/logo\.png/g, 'logo.webp'],
  [/CE\.jpeg/g, 'CE.webp'],
  [/favicon-round\.png/g, 'favicon-round.webp'],
];

for (const dir of srcDirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [pattern, replacement] of replacements) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated: ${filePath}`);
    }
  }
}

// Also check index.html
const indexPath = 'index.html';
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  let changed = false;
  for (const [pattern, replacement] of replacements) {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(indexPath, content);
    console.log(`Updated: ${indexPath}`);
  }
}

console.log('Done updating references.');
