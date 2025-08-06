#!/bin/bash

# Update imports in modules to reflect new folder structure
echo "Updating import paths in modules..."

# Update GlobalStyle imports
find src/modules -name "*.js" -type f -exec sed -i "s|from '../../styles/GlobalStyle'|from '../../../styles/GlobalStyle'|g" {} \;

# Update DummyData imports
find src/modules -name "*.js" -type f -exec sed -i "s|from '../../DummyData'|from '../../../DummyData'|g" {} \;

# Update store imports 
find src/modules -name "*.js" -type f -exec sed -i "s|from '../../store|from '../../../store|g" {} \;

# Update shared component imports
find src/modules -name "*.js" -type f -exec sed -i "s|from '../../components|from '../../../components|g" {} \;

echo "Import paths updated successfully!"
