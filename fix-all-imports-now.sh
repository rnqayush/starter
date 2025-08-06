#!/bin/bash

echo "Fixing all import paths in modules..."

# Fix all styles imports
find src/modules -name "*.js" -type f -exec sed -i "s|from '../../styles/|from '../../../styles/|g" {} \;

# Fix all DummyData imports
find src/modules -name "*.js" -type f -exec sed -i "s|from '../../DummyData|from '../../../DummyData|g" {} \;

# Fix all store imports
find src/modules -name "*.js" -type f -exec sed -i "s|from '../../store/|from '../../../store/|g" {} \;

# Fix all utils imports
find src/modules -name "*.js" -type f -exec sed -i "s|from '../../utils/|from '../../../utils/|g" {} \;

# Fix all components imports
find src/modules -name "*.js" -type f -exec sed -i "s|from '../../components/|from '../../../components/|g" {} \;

# Fix cross-module imports
find src/modules -name "*.js" -type f -exec sed -i "s|from '../ecommerce/|from '../ecommerce/|g" {} \;

echo "Import path fixes completed!"
