import React from "react";
import { useParams, useLocation } from "react-router-dom";
import HotelModule from "../hotel";
import EcommerceModule from "../ecommerce";
import AutomobileModule from "../automobiles";
import WeddingModule from "../weddings";
import BusinessModule from "../business";
import { getHotelBySlug } from "../hotel/data/hotels";
import { getVendorBySlug } from "../ecommerce/data/vendors";
import { getVendorBySlug as getAutomobileVendorBySlug } from "../automobiles/data/vendors";
import { getVendorById } from "../weddings/data/vendors";
import { getBusinessTemplate } from "../business/data/businessTemplates";

const SmartRouter = () => {
  const { slug } = useParams();
  const location = useLocation();

  // Check if this is an owner route (for business templates only, hotels have their own route)
  const isOwnerRoute = location.pathname.includes('/owner');

  // Check if this slug belongs to a hotel (hotels have their own /owner route, so only handle non-owner hotel routes here)
  const hotel = getHotelBySlug(slug);
  if (hotel && !isOwnerRoute) {
    return <HotelModule />;
  }

    // Check if this slug belongs to an ecommerce store
  const vendor = getVendorBySlug(slug);
  if (vendor) {
    return <EcommerceModule />;
  }

    // Check if this slug belongs to an automobile dealer
  const automobileDealer = getAutomobileVendorBySlug(slug);
  if (automobileDealer) {
    return <AutomobileModule />;
  }

  // Check if this slug belongs to a wedding vendor
  const weddingVendor = getVendorById(slug);
  if (weddingVendor) {
    return <WeddingModule />;
  }

  // Check if this slug belongs to a business template
  const businessTemplate = getBusinessTemplate(slug);
  if (businessTemplate) {
    return <BusinessModule />;
  }

  // If no match found, show 404 or default behavior
  return (
    <div style={{ padding: "4rem", textAlign: "center" }}>
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default SmartRouter;
