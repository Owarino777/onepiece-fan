import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PLACEHOLDER_DIR = path.join(process.cwd(), 'public', 'cards', 'placeholders');

async function generatePlaceholders() {
  // Créer le dossier s'il n'existe pas
  if (!fs.existsSync(PLACEHOLDER_DIR)) {
    fs.mkdirSync(PLACEHOLDER_DIR, { recursive: true });
  }

  // Générer le placeholder par défaut
  await sharp({
    create: {
      width: 400,
      height: 560,
      channels: 4,
      background: { r: 200, g: 200, b: 200, alpha: 1 }
    }
  })
    .webp()
    .toFile(path.join(PLACEHOLDER_DIR, 'card-placeholder.webp'));

  // Générer le dos de carte
  await sharp({
    create: {
      width: 400,
      height: 560,
      channels: 4,
      background: { r: 50, g: 50, b: 50, alpha: 1 }
    }
  })
    .webp()
    .toFile(path.join(PLACEHOLDER_DIR, 'card-back.webp'));
}

generatePlaceholders(); 