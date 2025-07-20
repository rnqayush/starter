import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaShoppingCart,
  FaArrowLeft,
  FaTruck,
  FaTags,
  FaTimes,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  flex: 1;
`;

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(-4px);
  }
`;

const CartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 80px 1fr;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.lg};
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 80px;
  }
`;

const ItemDetails = styled.div`
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.sm};
    line-height: 1.3;
  }

  .category {
    color: ${theme.colors.gray500};
    font-size: 0.9rem;
    margin-bottom: ${theme.spacing.sm};
    text-transform: capitalize;
  }

  .size {
    color: ${theme.colors.gray600};
    font-size: 0.9rem;
    margin-bottom: ${theme.spacing.sm};
  }

  .price {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${theme.colors.primary};
  }
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  align-items: flex-end;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

const QuantityButton = styled.button`
  background: ${theme.colors.gray100};
  border: none;
  padding: ${theme.spacing.sm};
  color: ${theme.colors.gray700};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;

  &:hover {
    background: ${theme.colors.gray200};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.span`
  padding: ${theme.spacing.sm};
  text-align: center;
  width: 40px;
  font-weight: 600;
  background: ${theme.colors.white};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.error};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.error};
    color: ${theme.colors.white};
  }
`;

const CartSummary = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.xl};
  height: fit-content;
  position: sticky;
  top: ${theme.spacing.xl};
`;

const SummaryTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
`;

const SummaryRow = styled.div.withConfig({
  shouldForwardProp: (prop) => !["large", "bold"].includes(prop),
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  font-size: ${(props) => (props.large ? "1.1rem" : "0.9rem")};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  color: ${(props) =>
    props.bold ? theme.colors.gray900 : theme.colors.gray600};

  &.total {
    font-size: 1.2rem;
    font-weight: 600;
    padding-top: ${theme.spacing.md};
    border-top: 1px solid ${theme.colors.gray200};
    color: ${theme.colors.gray900};
  }
`;

const PromoSection = styled.div`
  margin: ${theme.spacing.lg} 0;
  padding: ${theme.spacing.lg} 0;
  border-top: 1px solid ${theme.colors.gray200};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const PromoInput = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const PromoCodeInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ApplyButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const ShippingInfo = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};

  .shipping-option {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
    font-size: 0.9rem;
    color: ${theme.colors.gray700};

    &:last-child {
      margin-bottom: 0;
    }
  }

  .free-shipping {
    color: ${theme.colors.success};
    font-weight: 600;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  &:disabled {
    background: ${theme.colors.gray400};
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};

  .icon {
    font-size: 4rem;
    color: ${theme.colors.gray300};
    margin-bottom: ${theme.spacing.lg};
  }

  h2 {
    font-size: 1.5rem;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.gray600};
    margin-bottom: ${theme.spacing.xl};
  }
`;

const ShopButton = styled(Link)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    // Mock cart items for demonstration
    {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "electronics",
      price: 299.99,
      originalPrice: 399.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      quantity: 1,
      stock: 15,
    },
    {
      id: 4,
      name: "Classic Denim Jacket",
      category: "fashion",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&q=80",
      quantity: 2,
      selectedSize: "M",
      stock: 28,
    },
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const updateQuantity = (id, selectedSize, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === selectedSize
          ? {
              ...item,
              quantity: Math.max(1, Math.min(item.stock, newQuantity)),
            }
          : item,
      ),
    );
  };

  const removeItem = (id, selectedSize) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize),
      ),
    );
  };

  const applyPromoCode = () => {
    // Mock promo code logic
    const validCodes = {
      SAVE10: { type: "percentage", value: 10, description: "10% off" },
      WELCOME: { type: "fixed", value: 20, description: "$20 off" },
      FREESHIP: { type: "shipping", value: 0, description: "Free shipping" },
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        ...validCodes[promoCode.toUpperCase()],
      });
      setPromoCode("");
    } else {
      alert("Invalid promo code");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;

    const subtotal = calculateSubtotal();
    if (appliedPromo.type === "percentage") {
      return subtotal * (appliedPromo.value / 100);
    } else if (appliedPromo.type === "fixed") {
      return Math.min(appliedPromo.value, subtotal);
    }
    return 0;
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (appliedPromo?.type === "shipping" || subtotal >= 99) {
      return 0;
    }
    return 9.99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateShipping();
  };

    const handleEnquireAll = () => {
    // Since this is an enquiry system, we'll convert cart to enquiries
    navigate("/ecommerce/my-enquiries");
  };

  if (cartItems.length === 0) {
    return (
      <PageContainer>
        <Navbar cartItemsCount={0} />

        <Container>
          <PageHeader>
            <BackLink to="/ecommerce/products">
              <FaArrowLeft />
              Continue Shopping
            </BackLink>
          </PageHeader>

          <EmptyCart>
            <FaShoppingCart className="icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <ShopButton to="/ecommerce/products">
              Start Shopping
              <FaShoppingCart />
            </ShopButton>
          </EmptyCart>
        </Container>

        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Navbar
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <Container>
        <PageHeader>
          <BackLink to="/ecommerce/products">
            <FaArrowLeft />
            Continue Shopping
          </BackLink>
          <PageTitle>Shopping Cart ({cartItems.length} items)</PageTitle>
        </PageHeader>

        <CartContainer>
          <CartItems>
            {cartItems.map((item, index) => (
              <CartItem
                key={`${item.id}-${item.selectedSize || "no-size"}-${index}`}
              >
                <ItemImage src={item.image} alt={item.name} />

                <ItemDetails>
                  <h3>{item.name}</h3>
                  <div className="category">
                    {item.category.replace("-", " ")}
                  </div>
                  {item.selectedSize && (
                    <div className="size">Size: {item.selectedSize}</div>
                  )}
                  <div className="price">
                    ${item.price}
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span
                        style={{
                          marginLeft: "8px",
                          fontSize: "0.9rem",
                          color: theme.colors.gray500,
                          textDecoration: "line-through",
                        }}
                      >
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>
                </ItemDetails>

                <ItemActions>
                  <QuantityControls>
                    <QuantityButton
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.selectedSize,
                          item.quantity - 1,
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </QuantityButton>
                    <QuantityInput>{item.quantity}</QuantityInput>
                    <QuantityButton
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.selectedSize,
                          item.quantity + 1,
                        )
                      }
                      disabled={item.quantity >= item.stock}
                    >
                      <FaPlus />
                    </QuantityButton>
                  </QuantityControls>

                  <RemoveButton
                    onClick={() => removeItem(item.id, item.selectedSize)}
                    title="Remove item"
                  >
                    <FaTrash />
                  </RemoveButton>
                </ItemActions>
              </CartItem>
            ))}
          </CartItems>

          <CartSummary>
            <SummaryTitle>Order Summary</SummaryTitle>

            <SummaryRow>
              <span>
                Subtotal (
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </SummaryRow>

            {appliedPromo && (
              <SummaryRow style={{ color: theme.colors.success }}>
                <span>
                  Discount ({appliedPromo.description})
                  <button
                    onClick={removePromoCode}
                    style={{
                      marginLeft: "8px",
                      background: "none",
                      border: "none",
                      color: theme.colors.error,
                      cursor: "pointer",
                    }}
                  >
                    <FaTimes />
                  </button>
                </span>
                <span>-${calculateDiscount().toFixed(2)}</span>
              </SummaryRow>
            )}

            <PromoSection>
              <div
                style={{ marginBottom: theme.spacing.sm, fontWeight: "600" }}
              >
                <FaTags style={{ marginRight: theme.spacing.sm }} />
                Promo Code
              </div>
              <PromoInput>
                <PromoCodeInput
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <ApplyButton onClick={applyPromoCode}>Apply</ApplyButton>
              </PromoInput>
              <div style={{ fontSize: "0.8rem", color: theme.colors.gray500 }}>
                Try: SAVE10, WELCOME, or FREESHIP
              </div>
            </PromoSection>

            <ShippingInfo>
              <div className="shipping-option">
                <FaTruck />
                <span>Shipping</span>
                <span style={{ marginLeft: "auto" }}>
                  {calculateShipping() === 0 ? (
                    <span className="free-shipping">FREE</span>
                  ) : (
                    `$${calculateShipping().toFixed(2)}`
                  )}
                </span>
              </div>
              {calculateShipping() > 0 && (
                <div
                  style={{ fontSize: "0.8rem", color: theme.colors.gray600 }}
                >
                  Free shipping on orders over $99
                </div>
              )}
            </ShippingInfo>

            <SummaryRow className="total">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </SummaryRow>

                        <CheckoutButton onClick={handleEnquireAll}>
              Enquire About All Items
              <FaEnvelope />
            </CheckoutButton>

            <div
              style={{
                textAlign: "center",
                marginTop: theme.spacing.md,
                fontSize: "0.8rem",
                color: theme.colors.gray500,
              }}
            >
              Secure checkout with SSL encryption
            </div>
          </CartSummary>
        </CartContainer>
      </Container>

      <Footer />
    </PageContainer>
  );
};

export default Cart;
