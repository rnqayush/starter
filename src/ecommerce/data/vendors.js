export const ecommerceVendors = [
  {
    id: "techmart-downtown",
    name: "TechMart Downtown",
    slug: "techmart-downtown",
    category: "ecommerce",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    rating: 4.8,
    reviewCount: 1245,
    address: "123 Tech Street, Downtown District",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    distance: 0.8,
    description:
      "Your premier destination for cutting-edge electronics and gadgets. From smartphones to smart home devices.",
    specialties: ["Electronics", "Gadgets", "Smart Home", "Mobile Accessories"],
    phone: "+1 (555) 123-TECH",
    email: "info@techmart-downtown.com",
    website: "www.techmart-downtown.com",
    hours: {
      monday: "9:00 AM - 9:00 PM",
      tuesday: "9:00 AM - 9:00 PM",
      wednesday: "9:00 AM - 9:00 PM",
      thursday: "9:00 AM - 9:00 PM",
      friday: "9:00 AM - 10:00 PM",
      saturday: "10:00 AM - 10:00 PM",
      sunday: "11:00 AM - 8:00 PM",
    },
    theme: {
      primaryColor: "#1e40af",
      secondaryColor: "#3b82f6",
      backgroundColor: "#f8fafc",
      textColor: "#1f2937",
    },
    featured: true,
  },
  {
    id: "fashion-forward",
    name: "Fashion Forward",
    slug: "fashion-forward",
    category: "ecommerce",
    logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    rating: 4.6,
    reviewCount: 892,
    address: "456 Style Avenue, Fashion Quarter",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    coordinates: { lat: 37.7849, lng: -122.4094 },
    distance: 1.2,
    description:
      "Trendy fashion for the modern individual. Discover the latest styles and timeless classics.",
    specialties: ["Women's Fashion", "Men's Fashion", "Accessories", "Shoes"],
    phone: "+1 (555) 456-STYLE",
    email: "hello@fashionforward.com",
    website: "www.fashionforward.com",
    hours: {
      monday: "10:00 AM - 8:00 PM",
      tuesday: "10:00 AM - 8:00 PM",
      wednesday: "10:00 AM - 8:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 9:00 PM",
      saturday: "10:00 AM - 9:00 PM",
      sunday: "12:00 PM - 6:00 PM",
    },
    theme: {
      primaryColor: "#be185d",
      secondaryColor: "#ec4899",
      backgroundColor: "#fdf2f8",
      textColor: "#1f2937",
    },
    featured: false,
  },
  {
    id: "home-essentials",
    name: "Home Essentials",
    slug: "home-essentials",
    category: "ecommerce",
    logo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    rating: 4.7,
    reviewCount: 654,
    address: "789 Garden Road, Suburb Plaza",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    coordinates: { lat: 37.7949, lng: -122.3994 },
    distance: 2.1,
    description:
      "Everything you need to make your house a home. From furniture to decor and garden essentials.",
    specialties: ["Furniture", "Home Decor", "Garden", "Kitchen"],
    phone: "+1 (555) 789-HOME",
    email: "contact@homeessentials.com",
    website: "www.homeessentials.com",
    hours: {
      monday: "8:00 AM - 7:00 PM",
      tuesday: "8:00 AM - 7:00 PM",
      wednesday: "8:00 AM - 7:00 PM",
      thursday: "8:00 AM - 7:00 PM",
      friday: "8:00 AM - 8:00 PM",
      saturday: "9:00 AM - 8:00 PM",
      sunday: "10:00 AM - 6:00 PM",
    },
    theme: {
      primaryColor: "#059669",
      secondaryColor: "#10b981",
      backgroundColor: "#f0fdf4",
      textColor: "#1f2937",
    },
    featured: true,
  },
  {
    id: "sports-zone",
    name: "Sports Zone",
    category: "ecommerce",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    rating: 4.9,
    reviewCount: 1876,
    address: "321 Athletic Drive, Sports Complex",
    city: "San Francisco",
    state: "CA",
    zipCode: "94107",
    coordinates: { lat: 37.7649, lng: -122.4294 },
    distance: 1.5,
    description:
      "Your ultimate destination for sports equipment, activewear, and fitness gear.",
    specialties: [
      "Sports Equipment",
      "Activewear",
      "Fitness Gear",
      "Outdoor Recreation",
    ],
    phone: "+1 (555) 321-SPORT",
    email: "info@sportszone.com",
    website: "www.sportszone.com",
    hours: {
      monday: "6:00 AM - 9:00 PM",
      tuesday: "6:00 AM - 9:00 PM",
      wednesday: "6:00 AM - 9:00 PM",
      thursday: "6:00 AM - 9:00 PM",
      friday: "6:00 AM - 10:00 PM",
      saturday: "7:00 AM - 10:00 PM",
      sunday: "8:00 AM - 8:00 PM",
    },
    theme: {
      primaryColor: "#dc2626",
      secondaryColor: "#ef4444",
      backgroundColor: "#fef2f2",
      textColor: "#1f2937",
    },
    featured: false,
  },
];

export const getVendorsByLocation = (city, state) => {
  return ecommerceVendors.filter(
    (vendor) =>
      vendor.city.toLowerCase() === city.toLowerCase() &&
      vendor.state.toLowerCase() === state.toLowerCase(),
  );
};

export const getVendorById = (id) => {
  return ecommerceVendors.find((vendor) => vendor.id === id);
};

export const getFeaturedVendors = () => {
  return ecommerceVendors.filter((vendor) => vendor.featured);
};

export const searchVendors = (query) => {
  const searchTerm = query.toLowerCase();
  return ecommerceVendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm) ||
      vendor.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm),
      ) ||
      vendor.description.toLowerCase().includes(searchTerm),
  );
};
