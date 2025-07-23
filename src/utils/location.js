// Location utilities for getting user location and searching

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      error => {
        // Fallback to default location (San Francisco)

        resolve({
          lat: 37.7749,
          lng: -122.4194,
          accuracy: null,
          isDefault: true,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};

export const getLocationFromZip = async zipCode => {
  // Mock implementation - in a real app, you'd use a geocoding API
  const zipToLocation = {
    94102: { city: 'San Francisco', state: 'CA', lat: 37.7749, lng: -122.4194 },
    94103: { city: 'San Francisco', state: 'CA', lat: 37.7849, lng: -122.4094 },
    94104: { city: 'San Francisco', state: 'CA', lat: 37.7749, lng: -122.4194 },
    94105: { city: 'San Francisco', state: 'CA', lat: 37.7949, lng: -122.3994 },
    94106: { city: 'San Francisco', state: 'CA', lat: 37.7649, lng: -122.4294 },
    94107: { city: 'San Francisco', state: 'CA', lat: 37.7649, lng: -122.4294 },
    10001: { city: 'New York', state: 'NY', lat: 40.7128, lng: -74.006 },
    90210: { city: 'Los Angeles', state: 'CA', lat: 34.0522, lng: -118.2437 },
    60601: { city: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298 },
    33101: { city: 'Miami', state: 'FL', lat: 25.7617, lng: -80.1918 },
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const location = zipToLocation[zipCode];
      if (location) {
        resolve(location);
      } else {
        reject(new Error('Zip code not found'));
      }
    }, 500); // Simulate API delay
  });
};

export const searchLocationByCity = async cityName => {
  // Mock implementation - in a real app, you'd use a geocoding API
  const cityToLocation = {
    'san francisco': {
      city: 'San Francisco',
      state: 'CA',
      lat: 37.7749,
      lng: -122.4194,
    },
    'new york': { city: 'New York', state: 'NY', lat: 40.7128, lng: -74.006 },
    'los angeles': {
      city: 'Los Angeles',
      state: 'CA',
      lat: 34.0522,
      lng: -118.2437,
    },
    chicago: { city: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298 },
    miami: { city: 'Miami', state: 'FL', lat: 25.7617, lng: -80.1918 },
    seattle: { city: 'Seattle', state: 'WA', lat: 47.6062, lng: -122.3321 },
    denver: { city: 'Denver', state: 'CO', lat: 39.7392, lng: -104.9903 },
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const location = cityToLocation[cityName.toLowerCase()];
      if (location) {
        resolve(location);
      } else {
        reject(new Error('City not found'));
      }
    }, 500); // Simulate API delay
  });
};

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 3959; // Radius of the Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in miles
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

export const updateVendorsWithDistance = (vendors, userLocation) => {
  return vendors
    .map(vendor => ({
      ...vendor,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        vendor.coordinates.lat,
        vendor.coordinates.lng
      ),
    }))
    .sort((a, b) => a.distance - b.distance);
};

export const getDefaultLocation = () => ({
  city: 'San Francisco',
  state: 'CA',
  lat: 37.7749,
  lng: -122.4194,
  isDefault: true,
});

// Utility function to generate URL-friendly slugs from text
export const generateSlug = text => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') // Replace spaces and special characters with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};
