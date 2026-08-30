const sharp = require('sharp');

async function makeRound() {
  const input = 'public/images/logo.png';
  const output = 'public/images/favicon-round.png';

  const metadata = await sharp(input).metadata();
  const size = Math.min(metadata.width, metadata.height);

  const circleSvg = Buffer.from(`
    <svg viewBox="0 0 ${size} ${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white" />
    </svg>
  `);

  await sharp(input)
    .resize(size, size)
    .composite([{
      input: circleSvg,
      blend: 'dest-in'
    }])
    .png()
    .toFile(output);
  console.log("Done");
}
makeRound();
