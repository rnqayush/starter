#!/bin/bash

echo "Starting manual import fixes..."

# Fix automobiles module
echo "Fixing automobiles module..."

# Fix styles imports
for file in src/modules/automobiles/components/*.js src/modules/automobiles/pages/*.js; do
    if [ -f "$file" ]; then
        # Fix styles import
        if grep -q "from '../../styles/GlobalStyle'" "$file"; then
            echo "Fixing styles in $file"
            sed -i.bak "s|from '../../styles/GlobalStyle'|from '../../../styles/GlobalStyle'|g" "$file"
        fi
        
        # Fix store imports
        if grep -q "from '../../store/slices/" "$file"; then
            echo "Fixing store in $file"
            sed -i.bak "s|from '../../store/slices/|from '../../../store/slices/|g" "$file"
        fi
        
        # Fix DummyData imports
        if grep -q "from '../../DummyData" "$file"; then
            echo "Fixing DummyData in $file"
            sed -i.bak "s|from '../../DummyData|from '../../../DummyData|g" "$file"
        fi
        
        # Fix components imports
        if grep -q "from '../../components/" "$file"; then
            echo "Fixing components in $file"
            sed -i.bak "s|from '../../components/|from '../../../components/|g" "$file"
        fi
        
        # Fix cross-module imports
        if grep -q "from '../../ecommerce/" "$file"; then
            echo "Fixing cross-module ecommerce in $file"
            sed -i.bak "s|from '../../ecommerce/|from '../ecommerce/|g" "$file"
        fi
    fi
done

echo "Import fixes completed!"
