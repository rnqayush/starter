// Temporary redirect to centralized data - this file will be removed later
export * from '../../DummyData';

// Export specific seller data components for backward compatibility
export const {
  dashboardStats,
  storeStatus,
  lowStockAlerts,
  topPerformingProducts,
  salesTrendData,
  sellerProducts,
  sellerOrders,
  categoryRevenueData,
  bestSellingProducts,
  productCategories,
  recentActivity,
} = require('../../DummyData').sellerDashboardData;
