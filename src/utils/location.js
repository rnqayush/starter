// Location utility functions

export const searchLocationByCity = async (city) => {
  // Mock implementation - in real app this would call a geocoding API
  return {
    city: city,
    lat: 28.6139, // Default to Delhi coordinates
    lng: 77.2090,
    country: 'India'
  };
};

export const updateVendorsWithDistance = (vendors, userLocation) => {
  // Mock implementation - in real app this would calculate actual distances
  return vendors.map(vendor => ({
    ...vendor,
    distance: Math.floor(Math.random() * 50) + 1 // Random distance 1-50 km
  }));
};

export const getDefaultLocation = () => {
  // Default location (Delhi)
  return {
    city: 'Delhi',
    lat: 28.6139,
    lng: 77.2090,
    country: 'India'
  };
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          city: 'Current Location', // In real app, reverse geocode to get city
          country: 'Unknown'
        });
      },
      (error) => {
        // If geolocation fails, return default location
        console.warn('Geolocation failed, using default location:', error);
        resolve(getDefaultLocation());
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  });
};

export const getLocationFromZip = async (zipCode) => {
  // Mock implementation - in real app this would call a geocoding API
  // For now, return a mock location based on zip code
  return {
    city: `City-${zipCode}`,
    lat: 28.6139 + (Math.random() - 0.5) * 2, // Random coordinates around Delhi
    lng: 77.2090 + (Math.random() - 0.5) * 2,
    country: 'India',
    zipCode: zipCode
  };
};
