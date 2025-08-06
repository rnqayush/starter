#!/bin/bash

# Fix import paths for modules that moved from src/ to src/modules/
echo "Fixing import paths for modules..."

# Find all JS files in modules directory and fix relative paths
find src/modules -name "*.js" -type f -exec sed -i '' \
  -e "s|from '\.\./\.\./styles/|from '../../../styles/|g" \
  -e "s|from '\.\./\.\./DummyData|from '../../../DummyData|g" \
  -e "s|from '\.\./\.\./store/|from '../../../store/|g" \
  -e "s|from '\.\./\.\./utils/|from '../../../utils/|g" \
  -e "s|from '\.\./\.\./components/|from '../../../components/|g" \
  {} \;

echo "Import paths fixed!"
