#!/bin/bash

# Copy portrait assets from assetmaker to public
echo "Copying portrait assets..."
cp -r other/assetmaker/portrait/* Client/webapp/public/img/portraits/

# Copy battle assets from assetmaker to public
echo "Copying battle assets..."
cp -r other/assetmaker/battle/* Client/webapp/public/img/battle/

echo "Assets copied successfully!"
echo ""
echo "Note: You'll need to update the JSON catalog files to match the actual file structure."
echo "The assetmaker uses 'eye1' but our system expects 'eyes1', and 'f1/m1' for hair instead of 'hair1'."
