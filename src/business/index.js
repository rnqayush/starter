import React from "react";
import { useLocation } from "react-router-dom";
import BusinessWebsitesHome from "./pages/BusinessWebsitesHome";
import BusinessWebsitePage from "./pages/BusinessWebsitePage";
import OwnerDashboard from "./pages/OwnerDashboard";

const BusinessModule = () => {
  const location = useLocation();
  const path = location.pathname;

  // Route based on URL path
  if (path === "/business-websites") {
    return <BusinessWebsitesHome />;
  } else if (path.includes("/owner")) {
    // Owner dashboard route like "/business/salon/owner" or "/business/gym/owner"
    return <OwnerDashboard />;
  } else if (path.startsWith("/business/")) {
    // Business website page like "/business/salon" or "/business/gym"
    return <BusinessWebsitePage />;
  } else {
    return <BusinessWebsitesHome />;
  }
};

export default BusinessModule;
