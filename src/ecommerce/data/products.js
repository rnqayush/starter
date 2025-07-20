export const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
    description: "Latest gadgets and electronic devices",
  },
  {
    id: 2,
    name: "Fashion",
    slug: "fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80",
    description: "Trendy clothing and accessories",
  },
  {
    id: 3,
    name: "Home & Garden",
    slug: "home-garden",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80",
    description: "Everything for your home and garden",
  },
  {
    id: 4,
    name: "Sports",
    slug: "sports",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
    description: "Sports equipment and activewear",
  },
];

export const products = [
  // Electronics
  {
    id: 1,
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    price: 299.99,
    originalPrice: 399.99,
    category: "electronics",
    categoryId: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80",
    ],
    description:
      "Experience premium sound quality with our top-of-the-line wireless headphones featuring noise cancellation and 30-hour battery life.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge - 5 min for 3 hours playback",
      "Premium comfort fit",
      "Bluetooth 5.0",
    ],
        rating: 4.8,
    reviews: 245,
    stock: 15,
    availability: "in_stock", // in_stock, out_of_stock, limited_stock, pre_order
    featured: true,
    onSale: true,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    price: 199.99,
    category: "electronics",
    categoryId: 1,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80",
    ],
    description:
      "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and water resistance.",
    features: [
      "Heart rate monitoring",
      "Built-in GPS",
      "Water resistant up to 50m",
      "7-day battery life",
      "Sleep tracking",
    ],
        rating: 4.6,
    reviews: 189,
    stock: 23,
    availability: "in_stock",
    featured: true,
  },
  {
    id: 3,
    name: "Wireless Charging Pad",
    slug: "wireless-charging-pad",
    price: 49.99,
    category: "electronics",
    categoryId: 1,
    image:
      "https://images.unsplash.com/photo-1609592706372-7b2b88277d99?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1609592706372-7b2b88277d99?w=500&q=80",
    ],
    description:
      "Fast wireless charging for all Qi-compatible devices with sleek design and LED indicator.",
    features: [
      "Qi wireless charging",
      "Fast charging up to 15W",
      "LED charging indicator",
      "Non-slip design",
      "Universal compatibility",
    ],
        rating: 4.4,
    reviews: 76,
    stock: 45,
    availability: "in_stock",
  },

  // Fashion
  {
    id: 4,
    name: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    price: 89.99,
    category: "fashion",
    categoryId: 2,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    ],
    description:
      "Timeless denim jacket crafted from premium cotton denim. Perfect for layering and casual wear.",
    features: [
      "100% cotton denim",
      "Classic fit",
      "Multiple pockets",
      "Durable construction",
      "Machine washable",
    ],
        rating: 4.7,
    reviews: 134,
    stock: 28,
    availability: "in_stock",
    featured: true,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: 5,
    name: "Luxury Leather Handbag",
    slug: "luxury-leather-handbag",
    price: 249.99,
    originalPrice: 349.99,
    category: "fashion",
    categoryId: 2,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80",
    ],
    description:
      "Elegant leather handbag with spacious interior and premium finishing. Perfect for work or evening out.",
    features: [
      "Genuine leather",
      "Multiple compartments",
      "Adjustable strap",
      "Gold-tone hardware",
      "Dust bag included",
    ],
        rating: 4.9,
    reviews: 87,
    stock: 12,
    availability: "limited_stock",
    onSale: true,
  },
  {
    id: 6,
    name: "Comfortable Sneakers",
    slug: "comfortable-sneakers",
    price: 129.99,
    category: "fashion",
    categoryId: 2,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&q=80",
    ],
    description:
      "Ultra-comfortable sneakers with memory foam insole and breathable mesh upper. Perfect for daily wear.",
    features: [
      "Memory foam insole",
      "Breathable mesh upper",
      "Lightweight design",
      "Slip-resistant sole",
      "Available in multiple colors",
    ],
        rating: 4.5,
    reviews: 203,
    stock: 34,
    availability: "in_stock",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
  },

  // Home & Garden
  {
    id: 7,
    name: "Modern Table Lamp",
    slug: "modern-table-lamp",
    price: 79.99,
    category: "home-garden",
    categoryId: 3,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&q=80",
    ],
    description:
      "Sleek modern table lamp with adjustable brightness and USB charging port. Perfect for any workspace.",
    features: [
      "Adjustable brightness",
      "Built-in USB port",
      "Touch control",
      "LED bulb included",
      "Modern design",
    ],
        rating: 4.6,
    reviews: 98,
    stock: 19,
    availability: "in_stock",
    featured: true,
  },
  {
    id: 8,
    name: "Ceramic Plant Pot Set",
    slug: "ceramic-plant-pot-set",
    price: 39.99,
    category: "home-garden",
    categoryId: 3,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80",
    ],
    description:
      "Beautiful set of 3 ceramic plant pots with drainage holes and saucers. Perfect for indoor plants.",
    features: [
      "Set of 3 pots",
      "Drainage holes",
      "Matching saucers",
      "Easy to clean",
      "Various sizes",
    ],
        rating: 4.3,
    reviews: 156,
    stock: 41,
    availability: "in_stock",
  },

  // Sports
  {
    id: 9,
    name: "Yoga Exercise Mat",
    slug: "yoga-exercise-mat",
    price: 34.99,
    category: "sports",
    categoryId: 4,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80",
    ],
    description:
      "Premium yoga mat with excellent grip and cushioning. Non-slip surface for safe practice.",
    features: [
      "Non-slip surface",
      "6mm thickness",
      "Eco-friendly material",
      "Carrying strap included",
      "Easy to clean",
    ],
        rating: 4.7,
    reviews: 267,
    stock: 52,
    availability: "in_stock",
    featured: true,
  },
  {
    id: 10,
    name: "Resistance Bands Set",
    slug: "resistance-bands-set",
    price: 24.99,
    category: "sports",
    categoryId: 4,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
    ],
    description:
      "Complete set of resistance bands for strength training and rehabilitation. Multiple resistance levels.",
    features: [
      "5 resistance levels",
      "Door anchor included",
      "Comfortable handles",
      "Ankle straps",
      "Carrying bag",
    ],
        rating: 4.4,
    reviews: 189,
    stock: 67,
    availability: "in_stock",
  },
];

export const getProductsByCategory = (categorySlug) => {
  return products.filter((product) => product.category === categorySlug);
};

export const getProductById = (id) => {
  return products.find((product) => product.id === parseInt(id));
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};

export const getOnSaleProducts = () => {
  return products.filter((product) => product.onSale);
};

export const getProductsByAvailability = (availability) => {
  return products.filter((product) => product.availability === availability);
};

export const updateProductAvailability = (productId, availability) => {
  const productIndex = products.findIndex((product) => product.id === productId);
  if (productIndex !== -1) {
    products[productIndex].availability = availability;
    // Auto-update stock based on availability
    switch (availability) {
      case "out_of_stock":
        products[productIndex].stock = 0;
        break;
      case "limited_stock":
        if (products[productIndex].stock > 10) {
          products[productIndex].stock = Math.floor(Math.random() * 10) + 1;
        }
        break;
      case "pre_order":
        products[productIndex].stock = 0;
        break;
      default:
        break;
    }
    return products[productIndex];
  }
  return null;
};

export const getAvailabilityStatus = (product) => {
  if (!product) return "unknown";

  if (product.availability === "out_of_stock" || product.stock === 0) {
    return "out_of_stock";
  } else if (product.availability === "limited_stock" || product.stock <= 10) {
    return "limited_stock";
  } else if (product.availability === "pre_order") {
    return "pre_order";
  } else {
    return "in_stock";
  }
};

export const getAvailabilityLabel = (availability) => {
  switch (availability) {
    case "in_stock":
      return "In Stock";
    case "out_of_stock":
      return "Out of Stock";
    case "limited_stock":
      return "Limited Stock";
    case "pre_order":
      return "Pre Order";
    default:
      return "Unknown";
  }
};

export const getAvailabilityColor = (availability) => {
  switch (availability) {
    case "in_stock":
      return "#10b981"; // green
    case "out_of_stock":
      return "#ef4444"; // red
    case "limited_stock":
      return "#f59e0b"; // yellow
    case "pre_order":
      return "#3b82f6"; // blue
    default:
      return "#6b7280"; // gray
  }
};
