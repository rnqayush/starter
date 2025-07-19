import React from "react";
import { Routes, Route } from "react-router-dom";
import EcommerceMain from "./pages/EcommerceMain";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import StoreHome from "./pages/StoreHome";

const EcommerceModule = () => {
  return (
    <Routes>
      {/* Main ecommerce route with dynamic vendor */}
      <Route path="/" element={<EcommerceMain />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />

      {/* Legacy store-specific routes (for backward compatibility) */}
      <Route path="/:storeId" element={<StoreHome />} />
      <Route path="/:storeId/products" element={<Products />} />
      <Route path="/:storeId/product/:id" element={<ProductDetail />} />
      <Route path="/:storeId/cart" element={<Cart />} />
      <Route path="/:storeId/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default EcommerceModule;
