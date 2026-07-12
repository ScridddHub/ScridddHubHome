const fs = require('fs');
const path = require('path');

// Dynamically import sharp to support both local execution and install checks
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Error: "sharp" is not installed. Please run "npm install sharp" first.');
  process.exit(1);
}

const publicDir = path.join(__dirname, '../public');
const optimisedDir = path.join(publicDir, 'optimised');

// Create optimised directory if it doesn't exist
if (!fs.existsSync(optimisedDir)) {
  fs.mkdirSync(optimisedDir, { recursive: true });
}

// Find all frame folders in public
const items = fs.readdirSync(publicDir);
const frameFolders = items.filter(item => {
  const fullPath = path.join(publicDir, item);
  return fs.statSync(fullPath).isDirectory() && /^frame\d+/.test(item) && item !== 'optimised';
});

console.log(`Found ${frameFolders.length} folders to optimize:`, frameFolders);

async function optimizeFolder(folderName) {
  const sourceFolder = path.join(publicDir, folderName);
  const targetFolder = path.join(optimisedDir, folderName);

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  const files = fs.readdirSync(sourceFolder).filter(f => f.endsWith('.png'));
  console.log(`Optimizing ${files.length} PNGs in "${folderName}" -> "${targetFolder}"...`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const sourceFilePath = path.join(sourceFolder, file);
    const targetFileName = file.replace('.png', '.webp');
    const targetFilePath = path.join(targetFolder, targetFileName);

    if (fs.existsSync(targetFilePath)) {
      // Skip if already optimized to save time
      continue;
    }

    try {
      await sharp(sourceFilePath)
        .webp({ quality: 75 })
        .toFile(targetFilePath);
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err);
    }
  }
  console.log(`✓ Completed "${folderName}"`);
}

async function run() {
  for (const folder of frameFolders) {
    await optimizeFolder(folder);
  }
  console.log('\n🎉 All folders successfully optimized to WebP inside public/optimised/!');
}

run();
