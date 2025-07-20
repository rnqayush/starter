import React from "react";
import { useLocation } from "react-router-dom";
import AutomobileMain from "./pages/AutomobileMain";
import StoresListing from "./pages/StoresListing";

const AutomobileModule = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine which component to render
  let ComponentToRender;

  if (path === "/automobiles") {
    ComponentToRender = StoresListing;
  } else if (path === "/auto-dealers") {
    ComponentToRender = StoresListing;
  } else if (path.match(/^\/[^/]+$/)) {
    // Single segment path like "/luxury-auto-gallery" - dealer home
    ComponentToRender = AutomobileMain;
  } else {
    ComponentToRender = StoresListing;
  }

  return <ComponentToRender />;
};

export default AutomobileModule;
