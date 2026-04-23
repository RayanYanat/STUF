import sharp from 'sharp';
import fs from 'fs';

async function optimizeImages() {
  try {
    // Hero image optimization
    const heroMobile = await sharp('public/Harrow_club_workshop-mobile.jpg')
      .webp({ quality: 75 })
      .toFile('public/Harrow_club_workshop-mobile.webp');
    console.log('Mobile WebP:', heroMobile);

    const heroDesktop = await sharp('public/Harrow_club_workshop.jpg')
      .webp({ quality: 75 })
      .toFile('public/Harrow_club_workshop.webp');
    console.log('Desktop WebP:', heroDesktop);

    // Create LQIP (tiny blurred version)
    const lqip = await sharp('public/Harrow_club_workshop.jpg')
      .resize(20, 20, { fit: 'cover' })
      .blur(5)
      .toBuffer();
    const lqipBase64 = lqip.toString('base64');
    fs.writeFileSync('public/hero-lqip.txt', `data:image/jpeg;base64,${lqipBase64}`);
    console.log('LQIP created');

    console.log('✓ Image optimization complete');
  } catch (err) {
    console.error('Error:', err);
  }
}

optimizeImages();
