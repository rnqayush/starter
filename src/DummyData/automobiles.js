// Automobile data and utility functions
import automobileData from './automobiles.json';

// Extract data from the JSON structure
const { vendor, categories, vehicles } = automobileData.data;

// Export the data arrays
export const automobileCategories = categories;
export const automobileVehicles = vehicles;
export const automobileVendors = [vendor]; // Wrap vendor in array for consistency

// Vendor utility functions
export const getVendorsByLocation = (location) => {
  return automobileVendors.filter(vendor => 
    vendor.contact?.address?.city?.toLowerCase().includes(location.toLowerCase()) ||
    vendor.contact?.address?.state?.toLowerCase().includes(location.toLowerCase())
  );
};

export const getVendorById = (id) => {
  return automobileVendors.find(vendor => vendor.id === id);
};

export const getVendorBySlug = (slug) => {
  return automobileVendors.find(vendor => vendor.slug === slug);
};

export const getVendorByIdOrSlug = (identifier) => {
  return getVendorById(identifier) || getVendorBySlug(identifier);
};

export const getFeaturedVendors = () => {
  return automobileVendors.filter(vendor => vendor.settings?.featured === true);
};

export const searchVendors = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return automobileVendors.filter(vendor =>
    vendor.name.toLowerCase().includes(term) ||
    vendor.businessInfo?.description?.toLowerCase().includes(term) ||
    vendor.specialties?.some(specialty => specialty.toLowerCase().includes(term))
  );
};

// Vehicle utility functions
export const getVehiclesByCategory = (categoryId) => {
  return automobileVehicles.filter(vehicle => vehicle.category.id === categoryId);
};

export const getVehicleById = (id) => {
  return automobileVehicles.find(vehicle => vehicle.id === id);
};

export const getFeaturedVehicles = () => {
  return automobileVehicles.filter(vehicle => vehicle.featured === true);
};

export const getOnSaleVehicles = () => {
  return automobileVehicles.filter(vehicle => vehicle.pricing?.onSale === true);
};

export const getVehiclesByAvailability = (status) => {
  return automobileVehicles.filter(vehicle => vehicle.availability?.status === status);
};

export const getVehiclesByCondition = (condition) => {
  return automobileVehicles.filter(vehicle => vehicle.condition === condition);
};

export const getVehiclesByMake = (make) => {
  return automobileVehicles.filter(vehicle => 
    vehicle.make.toLowerCase() === make.toLowerCase()
  );
};

export const getVehiclesByPriceRange = (min, max) => {
  return automobileVehicles.filter(vehicle => {
    const price = vehicle.pricing?.price || 0;
    return price >= min && price <= max;
  });
};

// Availability utility functions
export const getAvailabilityStatus = (vehicle) => {
  return vehicle.availability?.status || 'unknown';
};

export const getAvailabilityLabel = (status) => {
  const labels = {
    'in_stock': 'In Stock',
    'limited_stock': 'Limited Stock',
    'out_of_stock': 'Out of Stock',
    'pre_order': 'Pre-Order',
    'sold': 'Sold'
  };
  return labels[status] || 'Unknown';
};

export const getAvailabilityColor = (status) => {
  const colors = {
    'in_stock': '#10b981',
    'limited_stock': '#f59e0b',
    'out_of_stock': '#ef4444',
    'pre_order': '#3b82f6',
    'sold': '#6b7280'
  };
  return colors[status] || '#6b7280';
};

// Export complete data for easy access
export const getCompleteAutomobileData = () => automobileData.data;
