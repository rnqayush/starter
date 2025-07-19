// Mock data for seller dashboard

export const dashboardStats = {
  totalSales: {
    value: 45280,
    currency: "USD",
    change: 12.5,
    period: "vs last month",
  },
  totalOrders: {
    value: 342,
    change: 8.2,
    period: "vs last month",
  },
  totalProducts: {
    value: 156,
    change: 5.1,
    period: "vs last month",
  },
  averageOrderValue: {
    value: 132.46,
    currency: "USD",
    change: -2.1,
    period: "vs last month",
  },
};

export const salesTrendData = [
  { date: "2024-01-01", sales: 1200, orders: 15 },
  { date: "2024-01-02", sales: 1850, orders: 22 },
  { date: "2024-01-03", sales: 980, orders: 12 },
  { date: "2024-01-04", sales: 2100, orders: 28 },
  { date: "2024-01-05", sales: 1600, orders: 18 },
  { date: "2024-01-06", sales: 2350, orders: 31 },
  { date: "2024-01-07", sales: 1900, orders: 24 },
  { date: "2024-01-08", sales: 2800, orders: 35 },
  { date: "2024-01-09", sales: 2200, orders: 29 },
  { date: "2024-01-10", sales: 1750, orders: 21 },
  { date: "2024-01-11", sales: 3100, orders: 38 },
  { date: "2024-01-12", sales: 2650, orders: 33 },
  { date: "2024-01-13", sales: 1950, orders: 25 },
  { date: "2024-01-14", sales: 2450, orders: 30 },
];

export const sellerProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299.99,
    stock: 24,
    sold: 156,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
    createdAt: "2024-01-15",
    revenue: 46798.44,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 199.99,
    stock: 18,
    sold: 89,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80",
    createdAt: "2024-01-10",
    revenue: 17799.11,
  },
  {
    id: 3,
    name: "Classic Denim Jacket",
    category: "Fashion",
    price: 89.99,
    stock: 0,
    sold: 67,
    status: "out_of_stock",
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=100&q=80",
    createdAt: "2024-01-05",
    revenue: 6029.33,
  },
  {
    id: 4,
    name: "Luxury Leather Handbag",
    category: "Fashion",
    price: 249.99,
    stock: 12,
    sold: 43,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&q=80",
    createdAt: "2024-01-12",
    revenue: 10749.57,
  },
  {
    id: 5,
    name: "Modern Table Lamp",
    category: "Home & Garden",
    price: 79.99,
    stock: 31,
    sold: 78,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    createdAt: "2024-01-08",
    revenue: 6239.22,
  },
  {
    id: 6,
    name: "Yoga Exercise Mat",
    category: "Sports",
    price: 34.99,
    stock: 45,
    sold: 134,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&q=80",
    createdAt: "2024-01-03",
    revenue: 4688.66,
  },
];

export const sellerOrders = [
  {
    id: "ORD-2024-001",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    products: [
      { name: "Premium Wireless Headphones", quantity: 1, price: 299.99 },
    ],
    total: 299.99,
    status: "completed",
    paymentStatus: "paid",
    orderDate: "2024-01-15",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-2024-002",
    customerName: "Mike Chen",
    customerEmail: "mike.chen@email.com",
    products: [
      { name: "Smart Fitness Watch", quantity: 1, price: 199.99 },
      { name: "Yoga Exercise Mat", quantity: 1, price: 34.99 },
    ],
    total: 234.98,
    status: "shipped",
    paymentStatus: "paid",
    orderDate: "2024-01-14",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
  },
  {
    id: "ORD-2024-003",
    customerName: "Emily Davis",
    customerEmail: "emily.d@email.com",
    products: [{ name: "Luxury Leather Handbag", quantity: 1, price: 249.99 }],
    total: 249.99,
    status: "processing",
    paymentStatus: "paid",
    orderDate: "2024-01-14",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
  },
  {
    id: "ORD-2024-004",
    customerName: "David Wilson",
    customerEmail: "david.w@email.com",
    products: [{ name: "Modern Table Lamp", quantity: 2, price: 79.99 }],
    total: 159.98,
    status: "pending",
    paymentStatus: "pending",
    orderDate: "2024-01-13",
    shippingAddress: "321 Elm St, Houston, TX 77001",
  },
  {
    id: "ORD-2024-005",
    customerName: "Lisa Anderson",
    customerEmail: "lisa.a@email.com",
    products: [
      { name: "Classic Denim Jacket", quantity: 1, price: 89.99 },
      { name: "Yoga Exercise Mat", quantity: 1, price: 34.99 },
    ],
    total: 124.98,
    status: "cancelled",
    paymentStatus: "refunded",
    orderDate: "2024-01-12",
    shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
  },
];

export const categoryRevenueData = [
  { category: "Electronics", revenue: 64597.55, percentage: 52.1 },
  { category: "Fashion", revenue: 16778.9, percentage: 13.5 },
  { category: "Sports", revenue: 4688.66, percentage: 3.8 },
  { category: "Home & Garden", revenue: 6239.22, percentage: 5.0 },
  { category: "Others", revenue: 31695.67, percentage: 25.6 },
];

export const bestSellingProducts = [
  { name: "Premium Wireless Headphones", sold: 156, revenue: 46798.44 },
  { name: "Yoga Exercise Mat", sold: 134, revenue: 4688.66 },
  { name: "Smart Fitness Watch", sold: 89, revenue: 17799.11 },
  { name: "Modern Table Lamp", sold: 78, revenue: 6239.22 },
  { name: "Classic Denim Jacket", sold: 67, revenue: 6029.33 },
  { name: "Luxury Leather Handbag", sold: 43, revenue: 10749.57 },
];

export const productCategories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Books",
  "Beauty",
  "Health",
  "Automotive",
  "Toys",
  "Other",
];

export const recentActivity = [
  {
    id: 1,
    type: "order",
    message: "New order received from Sarah Johnson",
    time: "2 minutes ago",
    icon: "shopping-cart",
  },
  {
    id: 2,
    type: "product",
    message: "Premium Wireless Headphones is running low on stock",
    time: "1 hour ago",
    icon: "exclamation-triangle",
  },
  {
    id: 3,
    type: "payment",
    message: "Payment of $299.99 confirmed",
    time: "3 hours ago",
    icon: "credit-card",
  },
  {
    id: 4,
    type: "review",
    message: "New 5-star review for Smart Fitness Watch",
    time: "5 hours ago",
    icon: "star",
  },
];
