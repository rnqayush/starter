import React from "react";
import { useParams } from "react-router-dom";
import HotelModule from "../hotel";
import EcommerceModule from "../ecommerce";
import AutomobileModule from "../automobiles";
import WeddingModule from "../weddings";
import { getHotelBySlug } from "../hotel/data/hotels";
import { getVendorBySlug } from "../ecommerce/data/vendors";
import { getVendorBySlug as getAutomobileVendorBySlug } from "../automobiles/data/vendors";
import { getVendorById } from "../weddings/data/vendors";

const SmartRouter = () => {
  const { slug } = useParams();

  // Check if this slug belongs to a hotel
  const hotel = getHotelBySlug(slug);
  if (hotel) {
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

  // If no match found, show 404 or default behavior
  return (
    <div style={{ padding: "4rem", textAlign: "center" }}>
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default SmartRouter;
