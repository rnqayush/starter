import React from "react";
import { useLocation } from "react-router-dom";
import EcommerceMain from "./pages/EcommerceMain";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import MyEnquiries from "./pages/MyEnquiries";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import SellerDashboard from "./pages/SellerDashboard";

const EcommerceModule = () => {
  const location = useLocation();
  const path = location.pathname;

  // Route based on URL path
  if (path === "/ecommerce") {
    return <EcommerceMain />;
  } else if (path.includes("/seller-dashboard")) {
    return <SellerDashboard />;
  } else if (path.includes("/products") && !path.includes("/product/")) {
    return <Products />;
  } else if (path.includes("/product/")) {
    return <ProductDetail />;
  } else if (path.includes("/cart")) {
    return <Cart />;
  } else if (path.includes("/checkout")) {
    return <Checkout />;
  } else if (path.includes("/order-confirmation")) {
    return <OrderConfirmation />;
  } else if (path.match(/^\/[^/]+$/)) {
    // Single segment path like "/techmart-downtown" - store home
    return <EcommerceMain />;
  } else {
    return <EcommerceMain />;
  }
};

export default EcommerceModule;
