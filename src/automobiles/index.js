import React from "react";
import { useLocation } from "react-router-dom";
import AutomobileMain from "./pages/AutomobileMain";
import StoresListing from "./pages/StoresListing";
import Vehicles from "./pages/Vehicles";
import VehicleDetail from "./pages/VehicleDetail";
import Wishlist from "./pages/Wishlist";

const AutomobileModule = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine which component to render
  let ComponentToRender;

  if (path === "/automobiles") {
    ComponentToRender = StoresListing;
  } else if (path === "/auto-dealers") {
    ComponentToRender = StoresListing;
  } else if (path.includes("/vehicles") && !path.includes("/vehicle/")) {
    ComponentToRender = Vehicles;
  } else if (path.includes("/vehicle/")) {
    ComponentToRender = VehicleDetail;
  } else if (path.includes("/wishlist")) {
    ComponentToRender = Wishlist;
  } else if (path.match(/^\/[^/]+$/)) {
    // Single segment path like "/luxury-auto-gallery" - dealer home
    ComponentToRender = AutomobileMain;
  } else {
    ComponentToRender = StoresListing;
  }

  return <ComponentToRender />;
};

export default AutomobileModule;
