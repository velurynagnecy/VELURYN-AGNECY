
const fs = require('fs');
let text = fs.readFileSync('src/pages/Contact.tsx', 'utf8');

// 1. Remove Breadcrumb Cutout
text = text.replace(/\{\/\* Breadcrumb Cutout \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '</div>\n      </div>');

// 2. Remove Decorative red dot
text = text.replace(/\{\/\* Decorative red dot \*\/\}[\s\S]*?<\/div>/, '');

// 3. Change borderRadius
text = text.replace(/borderRadius: '24px'/g, 'borderRadius: \\'16px\\''.replace(/'/g, ''));

fs.writeFileSync('src/pages/Contact.tsx', text);

