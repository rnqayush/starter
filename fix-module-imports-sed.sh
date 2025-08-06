#!/bin/bash

echo "Fixing import paths in modules..."

# Find all JavaScript files in modules directory
find src/modules -name "*.js" -type f | while read file; do
    echo "Processing: $file"
    
    # Fix styles imports
    sed -i "s|from '../../styles/|from '../../../styles/|g" "$file"
    
    # Fix store/slices imports  
    sed -i "s|from '../../store/slices/|from '../../../store/slices/|g" "$file"
    
    # Fix DummyData imports
    sed -i "s|from '../../DummyData'|from '../../../DummyData'|g" "$file"
    sed -i "s|from '../../DummyData/|from '../../../DummyData/|g" "$file"
    
    # Fix utils imports
    sed -i "s|from '../../utils/|from '../../../utils/|g" "$file"
    
    # Fix shared components imports
    sed -i "s|from '../../components/shared/|from '../../../components/shared/|g" "$file"
    sed -i "s|from '../../components/auth/|from '../../../components/auth/|g" "$file"
    sed -i "s|from '../../components/user/|from '../../../components/user/|g" "$file"
    
    # Fix cross-module imports (these should stay relative within modules)
    sed -i "s|from '../../ecommerce/|from '../ecommerce/|g" "$file"
    sed -i "s|from '../../hotel/|from '../hotel/|g" "$file"
    sed -i "s|from '../../automobiles/|from '../automobiles/|g" "$file"
    sed -i "s|from '../../business/|from '../business/|g" "$file"
    sed -i "s|from '../../weddings/|from '../weddings/|g" "$file"
done

echo "Import path fixes completed!"
