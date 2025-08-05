// Legacy Wedding API file - now uses the new API structure
// This file is maintained for backward compatibility
// Please use src/api/services/weddingService for new code

import { weddingService } from '../api/services';

// Re-export all functions from the new wedding service
export const getStaticWeddingVendors = weddingService.getStaticWeddingVendors.bind(weddingService);
export const getStaticWeddingBookings = weddingService.getStaticWeddingBookings.bind(weddingService);
export const getVendorById = weddingService.getVendorById.bind(weddingService);
export const getVendorByIdAsync = weddingService.getVendorByIdAsync.bind(weddingService);
export const getVendorsByLocation = weddingService.getVendorsByLocation.bind(weddingService);
export const getVendorsByLocationAsync = weddingService.getVendorsByLocationAsync.bind(weddingService);
export const getFeaturedVendors = weddingService.getFeaturedVendors.bind(weddingService);
export const getFeaturedVendorsAsync = weddingService.getFeaturedVendorsAsync.bind(weddingService);
export const searchVendors = weddingService.searchVendors.bind(weddingService);
export const searchVendorsAsync = weddingService.searchVendorsAsync.bind(weddingService);
export const getWeddingVendors = weddingService.getWeddingVendors.bind(weddingService);
export const getWeddingBookings = weddingService.getWeddingBookings.bind(weddingService);
export const getBookingsByVendorId = weddingService.getBookingsByVendorId.bind(weddingService);
export const getBookingsByUserId = weddingService.getBookingsByUserId.bind(weddingService);
export const createBooking = weddingService.createBooking.bind(weddingService);
export const updateVendor = weddingService.updateVendor.bind(weddingService);
export const updateVendorSections = weddingService.updateVendorSections.bind(weddingService);
export const getVendorStats = weddingService.getVendorStats.bind(weddingService);
export const createWeddingWebsite = weddingService.createWeddingWebsite.bind(weddingService);

// Additional exports
export const getVendorsObject = weddingService.getVendorsObject.bind(weddingService);
export const getSections = weddingService.getSections.bind(weddingService);
export const getWebsiteTemplates = weddingService.getWebsiteTemplates.bind(weddingService);
export const getDefaultSectionOrder = weddingService.getDefaultSectionOrder.bind(weddingService);
export const getDefaultSectionVisibility = weddingService.getDefaultSectionVisibility.bind(weddingService);

// Legacy compatibility exports
export const weddingVendors = weddingService.getStaticWeddingVendors();
export const getWeddingVendorById = weddingService.getVendorById.bind(weddingService);
export const getWeddingFeaturedVendors = weddingService.getFeaturedVendors.bind(weddingService);
export const getWeddingVendorsByLocation = weddingService.getVendorsByLocation.bind(weddingService);
export const searchWeddingVendors = weddingService.searchVendors.bind(weddingService);

// Default export
export default {
  getStaticWeddingVendors,
  getStaticWeddingBookings,
  getVendorById,
  getVendorByIdAsync,
  getVendorsByLocation,
  getVendorsByLocationAsync,
  getFeaturedVendors,
  getFeaturedVendorsAsync,
  searchVendors,
  searchVendorsAsync,
  getWeddingVendors,
  getWeddingBookings,
  getBookingsByVendorId,
  getBookingsByUserId,
  createBooking,
  updateVendor,
  updateVendorSections,
  getVendorStats,
  createWeddingWebsite,
  getVendorsObject,
  getSections,
  getWebsiteTemplates,
  getDefaultSectionOrder,
  getDefaultSectionVisibility,
  weddingVendors,
  getWeddingVendorById,
  getWeddingFeaturedVendors,
  getWeddingVendorsByLocation,
  searchWeddingVendors,
};
