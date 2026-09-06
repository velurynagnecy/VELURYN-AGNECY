const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'images');

async function optimize() {
  const files = fs.readdirSync(imgDir);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
    
    const inputPath = path.join(imgDir, file);
    const baseName = path.basename(file, ext);
    const outputPath = path.join(imgDir, baseName + '.webp');
    
    // Skip if webp already exists
    if (fs.existsSync(outputPath)) {
      console.log(`SKIP ${file} (webp exists)`);
      continue;
    }
    
    const stats = fs.statSync(inputPath);
    const sizeKB = Math.round(stats.size / 1024);
    
    try {
      // Logo/favicon: keep high quality, resize to reasonable dimensions
      if (file.includes('logo') || file.includes('favicon')) {
        await sharp(inputPath)
          .resize({ width: 512, withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(outputPath);
      }
      // Hero images: resize to 1920px wide, quality 80
      else if (file.includes('hero')) {
        await sharp(inputPath)
          .resize({ width: 1920, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(outputPath);
      }
      // Other images: resize to 1200px wide, quality 80
      else {
        await sharp(inputPath)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);
      }
      
      const newStats = fs.statSync(outputPath);
      const newSizeKB = Math.round(newStats.size / 1024);
      const savings = Math.round((1 - newSizeKB / sizeKB) * 100);
      console.log(`${file} (${sizeKB}KB) -> ${baseName}.webp (${newSizeKB}KB) [${savings}% smaller]`);
    } catch (err) {
      console.error(`ERROR ${file}: ${err.message}`);
    }
  }
  
  console.log('\nDone! Now update references in source files.');
}

optimize();
