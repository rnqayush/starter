#!/bin/bash

# Script to fix all import paths in moved modules

echo "Starting comprehensive import path fixes..."

# Define the files that need fixing (based on the Agent's analysis)
declare -a files=(
  "src/modules/automobiles/components/BulkImportTab.js"
  "src/modules/automobiles/components/CategoryCard.js"
  "src/modules/automobiles/components/CategoryManagement.js"
  "src/modules/automobiles/components/CategoriesSectionEdit.js"
  "src/modules/automobiles/components/CustomersTab.js"
  "src/modules/automobiles/components/CustomSectionEdit.js"
  "src/modules/automobiles/components/DashboardTab.js"
  "src/modules/automobiles/components/DealerSettingsTab.js"
  "src/modules/automobiles/components/EnhancedDealerSidebar.js"
  "src/modules/automobiles/components/EnquiriesTab.js"
  "src/modules/automobiles/components/EnquiryModal.js"
  "src/modules/automobiles/components/FeaturedSectionEdit.js"
  "src/modules/automobiles/components/FinancingTab.js"
  "src/modules/automobiles/components/Footer.js"
  "src/modules/automobiles/components/FooterSectionEdit.js"
  "src/modules/automobiles/components/HeroSectionEdit.js"
  "src/modules/automobiles/components/Navbar.js"
  "src/modules/automobiles/components/PromotionsTab.js"
  "src/modules/automobiles/components/SalesOrdersTab.js"
  "src/modules/automobiles/components/SectionOrderEdit.js"
  "src/modules/automobiles/components/ServiceAppointmentsTab.js"
  "src/modules/automobiles/components/SpecialOffersSectionEdit.js"
  "src/modules/automobiles/components/TradeInsTab.js"
  "src/modules/automobiles/components/VehicleCard.js"
  "src/modules/automobiles/components/VehicleInventoryTab.js"
  "src/modules/automobiles/pages/AutomobileMain.js"
  "src/modules/automobiles/pages/DealerDashboard.js"
  "src/modules/automobiles/pages/VehicleDetail.js"
  "src/modules/automobiles/pages/Vehicles.js"
  "src/modules/automobiles/pages/Wishlist.js"
)

# Fix imports for each file
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing imports in $file..."
    
    # Fix styles imports
    sed -i '' "s|from '../../styles/GlobalStyle'|from '../../../styles/GlobalStyle'|g" "$file"
    sed -i '' "s|from '../../styles/|from '../../../styles/|g" "$file"
    
    # Fix DummyData imports  
    sed -i '' "s|from '../../DummyData'|from '../../../DummyData'|g" "$file"
    sed -i '' "s|from '../../DummyData/|from '../../../DummyData/|g" "$file"
    
    # Fix store imports
    sed -i '' "s|from '../../store/|from '../../../store/|g" "$file"
    
    # Fix utils imports
    sed -i '' "s|from '../../utils/|from '../../../utils/|g" "$file"
    
    # Fix components imports
    sed -i '' "s|from '../../components/|from '../../../components/|g" "$file"
    
  else
    echo "File not found: $file"
  fi
done

echo "Import path fixes completed!"
