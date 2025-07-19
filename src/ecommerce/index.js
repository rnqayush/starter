import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import StoreHome from "./pages/StoreHome";

const EcommerceModule = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />

      {/* Store-specific routes */}
      <Route path="/:storeId" element={<StoreHome />} />
      <Route path="/:storeId/products" element={<Products />} />
      <Route path="/:storeId/product/:id" element={<ProductDetail />} />
      <Route path="/:storeId/cart" element={<Cart />} />
      <Route path="/:storeId/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default EcommerceModule;
