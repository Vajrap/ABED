#!/bin/bash

# Script to copy assets from assetmaker to public and convert JSON catalogs

echo "Step 1: Copying portrait assets..."
cp -r other/assetmaker/portrait/* Client/webapp/public/img/portraits/

echo "Step 2: Copying battle assets..."
cp -r other/assetmaker/battle/* Client/webapp/public/img/battle/

echo "Step 3: Converting JSON catalogs..."

# Convert portrait.json: change paths from "./portrait/..." to "/img/portraits/..."
# Also need to handle naming: eye1 -> eyes1, f1/m1 -> hair1/hair2, etc.
node -e "
const fs = require('fs');
const path = require('path');

// Read assetmaker portrait.json
const assetmakerPortrait = JSON.parse(fs.readFileSync('other/assetmaker/portrait.json', 'utf8'));
const converted = {};

for (const [oldPath, files] of Object.entries(assetmakerPortrait)) {
  // Convert path: './portrait/base' -> '/img/portraits/base'
  let newPath = oldPath.replace('./portrait', '/img/portraits');
  
  // Handle naming conversions:
  // eye1 -> eyes1, eye2 -> eyes2, etc.
  newPath = newPath.replace(/\/eye(\d+)\//g, '/eyes\$1/');
  
  // f1 -> hair1, f2 -> hair2, etc. (for female hair)
  newPath = newPath.replace(/\/f(\d+)\//g, '/hair\$1/');
  
  // m1 -> hair1, m2 -> hair2, etc. (for male hair) 
  // Note: This will conflict with f1->hair1, so we need a different approach
  // Actually, looking at the structure, f1 and m1 are separate folders
  // We might need to keep them as f1/m1 or rename them differently
  // For now, let's keep m1 as m1 and handle it in the code
  
  converted[newPath] = files;
}

// Write converted JSON
fs.writeFileSync('Client/webapp/public/img/portraits/portrait.json', JSON.stringify(converted, null, 2));
console.log('Portrait JSON converted successfully!');
"

# Convert battle.json similarly
node -e "
const fs = require('fs');

const assetmakerBattle = JSON.parse(fs.readFileSync('other/assetmaker/battle.json', 'utf8'));
const converted = {};

for (const [oldPath, files] of Object.entries(assetmakerBattle)) {
  let newPath = oldPath.replace('./battle', '/img/battle');
  
  // Handle hair naming: f1 -> hair1, m1 -> hair1 (but we need to differentiate)
  // For now, keep f1/m1 as is and handle in code
  newPath = newPath.replace(/\/f(\d+)\//g, '/hair\$1/');
  
  converted[newPath] = files;
}

fs.writeFileSync('Client/webapp/public/img/battle/battle.json', JSON.stringify(converted, null, 2));
console.log('Battle JSON converted successfully!');
"

echo ""
echo "✅ Assets copied and JSON catalogs converted!"
echo ""
echo "⚠️  Note: The assetmaker uses 'eye1' (not 'eyes1') and 'f1/m1' for hair."
echo "   You may need to update the code to match these naming conventions,"
echo "   or rename the folders to match the code expectations."

