import React from "react";
import { useLocation } from "react-router-dom";
import EcommerceHome from "./pages/Home";
import EcommerceMain from "./pages/EcommerceMain";
import StoresListing from "./pages/StoresListing";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import MyEnquiries from "./pages/MyEnquiries";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import SellerDashboard from "./pages/SellerDashboard";
import { NotificationProvider } from "./components/NotificationSystem";

const EcommerceModule = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine which component to render
  let ComponentToRender;

  if (path === "/ecommerce") {
    ComponentToRender = EcommerceHome;
  } else if (path === "/ecommerce-stores") {
    ComponentToRender = StoresListing;
  } else if (path.includes("/seller-dashboard")) {
    ComponentToRender = SellerDashboard;
  } else if (path.includes("/my-enquiries")) {
    ComponentToRender = MyEnquiries;
  } else if (path.includes("/products") && !path.includes("/product/")) {
    ComponentToRender = Products;
  } else if (path.includes("/product/")) {
    ComponentToRender = ProductDetail;
  } else if (path.includes("/cart")) {
    ComponentToRender = Cart;
  } else if (path.includes("/checkout")) {
    ComponentToRender = Checkout;
  } else if (path.includes("/order-confirmation")) {
    ComponentToRender = OrderConfirmation;
  } else if (path.match(/^\/[^/]+$/)) {
    // Single segment path like "/techmart-downtown" - store home
    ComponentToRender = EcommerceMain;
  } else {
    ComponentToRender = EcommerceHome;
  }

  return (
    <NotificationProvider>
      <ComponentToRender />
    </NotificationProvider>
  );
};

export default EcommerceModule;
