import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join } from 'path';

const SVG_TEMPLATE = (size: number, fontSize: number, radius: number) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="#000000"/>
  <text x="${size / 2}" y="${size * 0.68}" font-family="Georgia, Times, serif" font-size="${fontSize}" font-weight="bold" fill="white" text-anchor="middle">A&amp;S</text>
</svg>
`;

async function generateFavicons() {
	const appDir = join(process.cwd(), 'app');

	// Generate 32x32 icon
	const icon32 = await sharp(Buffer.from(SVG_TEMPLATE(128, 56, 24)))
		.resize(32, 32)
		.png()
		.toBuffer();
	writeFileSync(join(appDir, 'icon.png'), icon32);
	console.log('Generated icon.png (32x32)');

	// Generate 180x180 apple icon
	const appleIcon = await sharp(Buffer.from(SVG_TEMPLATE(180, 72, 32)))
		.png()
		.toBuffer();
	writeFileSync(join(appDir, 'apple-icon.png'), appleIcon);
	console.log('Generated apple-icon.png (180x180)');

	// Generate favicon.ico (using 32x32 PNG as ICO)
	const favicon = await sharp(Buffer.from(SVG_TEMPLATE(128, 56, 24)))
		.resize(32, 32)
		.png()
		.toBuffer();
	writeFileSync(join(appDir, 'favicon.ico'), favicon);
	console.log('Generated favicon.ico (32x32)');

	console.log('All favicons generated successfully!');
}

generateFavicons().catch(console.error);
