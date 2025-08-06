#!/usr/bin/env python3

import re

# Read the file
with open('src/weddings/pages/VendorPage.js', 'r') as f:
    content = f.read()

# Replace the vendor ID determination logic
old_pattern = r'''  // Get vendor ID from URL path if not available in params
  const currentPath = window\.location\.pathname;
  const pathSegments = currentPath\.split\('/'\)\.filter\(Boolean\);
  const vendorId = vendorSlug \|\| pathSegments\[pathSegments\.length - 1\];'''

new_code = '''  // Get vendor ID from URL path if not available in params
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);
  
  // For wedding websites accessed via SmartRouter, use the website slug as vendor ID
  // For direct vendor routes, use the vendorSlug parameter
  let vendorId = vendorSlug || pathSegments[pathSegments.length - 1];
  
  // If we have websiteData from SmartRouter, try to find the correct vendor ID
  if (websiteData && websiteData.data && websiteData.data.vendors) {
    const vendorKeys = Object.keys(websiteData.data.vendors);
    if (vendorKeys.length === 1) {
      // Single vendor website - use the only vendor key
      vendorId = vendorKeys[0];
    } else if (vendorKeys.length > 1) {
      // Multiple vendors - try to match by slug or use the first one
      const matchingKey = vendorKeys.find(key => 
        key === vendorId || 
        websiteData.data.vendors[key].slug === vendorId ||
        websiteData.data.vendors[key].id === vendorId
      );
      vendorId = matchingKey || vendorKeys[0];
    }
  }'''

# Replace the pattern
content = re.sub(old_pattern, new_code, content, flags=re.MULTILINE)

# Also improve the vendor data fetching logic
old_vendor_fetch = r'''        // Find vendor by vendorId in the vendors object
        const vendorKey = Object\.keys\(websiteData\.data\.vendors\)\.find\(key => 
          key === vendorId \|\| websiteData\.data\.vendors\[key\]\.id === vendorId
        \);
        
        if \(vendorKey\) \{
          vendorData = websiteData\.data\.vendors\[vendorKey\];
          console\.log\("✅ VendorPage: Found vendor data from websiteData:", vendorData\);
        \} else \{
          console\.log\("⚠️ VendorPage: Vendor not found in websiteData\.data\.vendors for vendorId:", vendorId\);
          console\.log\("Available vendor keys:", Object\.keys\(websiteData\.data\.vendors\)\);
        \}'''

new_vendor_fetch = '''        console.log("🔍 VendorPage: websiteData.data.vendors structure:", websiteData.data.vendors);
        console.log("🔍 VendorPage: Determined vendorId:", vendorId);
        
        // Find vendor by vendorId in the vendors object
        if (websiteData.data.vendors[vendorId]) {
          vendorData = websiteData.data.vendors[vendorId];
          console.log("✅ VendorPage: Found vendor data from websiteData:", vendorData);
        } else {
          console.log("⚠️ VendorPage: Vendor not found in websiteData.data.vendors for vendorId:", vendorId);
          console.log("Available vendor keys:", Object.keys(websiteData.data.vendors));
        }'''

content = re.sub(old_vendor_fetch, new_vendor_fetch, content, flags=re.MULTILINE | re.DOTALL)

# Write the file back
with open('src/weddings/pages/VendorPage.js', 'w') as f:
    f.write(content)

print("Fixed VendorPage.js successfully!")

