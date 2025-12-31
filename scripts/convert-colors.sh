#!/bin/bash

# Script to convert pink/rose colors to black/white theme

FILES=$(find components app -name "*.tsx" -type f)

for file in $FILES; do
  echo "Processing: $file"

  # Hex color replacements
  sed -i '' 's/#c7174e/#000000/g' "$file"
  sed -i '' 's/#e91e63/#1a1a1a/g' "$file"
  sed -i '' 's/#ff6b9d/#2d2d2d/g' "$file"
  sed -i '' 's/#f06292/#404040/g' "$file"
  sed -i '' 's/#f8bbd0/#e5e5e5/g' "$file"
  sed -i '' 's/#fce4ec/#f5f5f5/g' "$file"
  sed -i '' 's/#d81b60/#1a1a1a/g' "$file"

  # Tailwind class replacements
  sed -i '' 's/text-gradient-rose/text-gradient-bw/g' "$file"
  sed -i '' 's/\[#4a5568\]/#666666/g' "$file"

  # Gradient replacements
  sed -i '' 's/from-\[#c7174e\]/from-black/g' "$file"
  sed -i '' 's/to-\[#e91e63\]/to-charcoal/g' "$file"
  sed -i '' 's/via-\[#e91e63\]/via-dark/g' "$file"
  sed -i '' 's/to-\[#ff6b9d\]/to-gray-dark/g' "$file"
  sed -i '' 's/from-\[#fce4ec\]/from-pearl/g' "$file"
  sed -i '' 's/via-\[#f8bbd0\]/via-silver/g' "$file"
  sed -i '' 's/to-\[#fce4ec\]/to-pearl/g' "$file"

  # Specific color references
  sed -i '' 's/text-\[#c7174e\]/text-black/g' "$file"
  sed -i '' 's/text-\[#e91e63\]/text-dark/g' "$file"
  sed -i '' 's/text-\[#2d2d2d\]/text-charcoal/g' "$file"
  sed -i '' 's/bg-\[#c7174e\]/bg-black/g' "$file"
  sed -i '' 's/bg-\[#e91e63\]/bg-dark/g' "$file"
  sed -i '' 's/bg-\[#ff6b9d\]/bg-charcoal/g' "$file"
  sed -i '' 's/border-\[#e91e63\]/border-black/g' "$file"
  sed -i '' 's/hover:text-\[#c7174e\]/hover:text-black/g' "$file"
  sed -i '' 's/hover:border-\[#e91e63\]/hover:border-black/g' "$file"
  sed -i '' 's/ring-\[#e91e63\]/ring-black/g' "$file"

  # Pink class replacements
  sed -i '' 's/bg-pink-600/bg-black/g' "$file"
  sed -i '' 's/bg-pink-700/bg-charcoal/g' "$file"
  sed -i '' 's/hover:bg-pink-700/hover:bg-gray-dark/g' "$file"
  sed -i '' 's/text-pink-600/text-black/g' "$file"
  sed -i '' 's/text-pink-700/text-black/g' "$file"
  sed -i '' 's/hover:text-pink-600/hover:text-black/g' "$file"
  sed -i '' 's/hover:text-pink-700/hover:text-black/g' "$file"
  sed -i '' 's/border-pink-200/border-gray-lighter/g' "$file"
  sed -i '' 's/border-pink-600/border-black/g' "$file"
  sed -i '' 's/from-pink-50/from-pearl/g' "$file"
  sed -i '' 's/to-rose-50/to-silver/g' "$file"
  sed -i '' 's/bg-pink-50/bg-pearl/g' "$file"
  sed -i '' 's/bg-pink-100/bg-silver/g' "$file"
  sed -i '' 's/text-pink-300/text-gray-light/g' "$file"
  sed -i '' 's/group-hover:text-pink-300/group-hover:text-gray/g' "$file"

  # Shadow color replacements in rgba
  sed -i '' 's/rgba(199, 23, 78,/rgba(0, 0, 0,/g' "$file"
  sed -i '' 's/rgba(231, 30, 99,/rgba(0, 0, 0,/g' "$file"
  sed -i '' 's/rgba(233, 30, 99,/rgba(0, 0, 0,/g' "$file"
  sed -i '' 's/rgba(255, 107, 157,/rgba(0, 0, 0,/g' "$file"
done

echo "Color conversion complete!"
