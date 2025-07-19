import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import {
  FaArrowRight,
  FaShoppingBag,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { ecommerceVendors } from "../data/vendors";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const StoreHeroSection = styled.section`
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
  position: relative;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  position: relative;
  z-index: 2;
`;

const StoreLogo = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto ${theme.spacing.lg};
  border-radius: 50%;
  background: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.xl};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StoreName = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const StoreTagline = styled.p`
  font-size: 1.3rem;
  margin-bottom: ${theme.spacing.lg};
  opacity: 0.95;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const StoreInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    align-items: center;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1rem;

  svg {
    color: ${theme.colors.primary};
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  .stars {
    display: flex;
    gap: 2px;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.lg};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xxl} ${theme.spacing.md};
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.lg};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  margin: 0 auto;
  display: flex;
  width: fit-content;

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

const SpecialtiesSection = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  text-align: center;
`;

const SpecialtiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const SpecialtyCard = styled.div`
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.lg};

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    color: ${theme.colors.gray600};
    font-size: 0.9rem;
  }
`;

const StoreHome = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [storeProducts, setStoreProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Find the store
    const foundStore = ecommerceVendors.find((v) => v.id === storeId);
    setStore(foundStore);

    // Generate mock products for this store based on its specialties
    if (foundStore) {
      const mockProducts = generateStoreProducts(foundStore);
      setStoreProducts(mockProducts);
    }
  }, [storeId]);

  const generateStoreProducts = (store) => {
    const productTemplates = {
      "techmart-downtown": [
        {
          name: "Premium Smartphone",
          price: 899.99,
          category: "Electronics",
          image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
        },
        {
          name: "Wireless Headphones",
          price: 249.99,
          category: "Electronics",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        },
        {
          name: "Smart Watch",
          price: 399.99,
          category: "Electronics",
          image:
            "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&q=80",
        },
        {
          name: "Bluetooth Speaker",
          price: 129.99,
          category: "Electronics",
          image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
        },
        {
          name: "Laptop Computer",
          price: 1299.99,
          category: "Electronics",
          image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
        },
        {
          name: "Gaming Mouse",
          price: 79.99,
          category: "Electronics",
          image:
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
        },
      ],
      "fashion-forward": [
        {
          name: "Designer Dress",
          price: 199.99,
          category: "Fashion",
          image:
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80",
        },
        {
          name: "Leather Handbag",
          price: 299.99,
          category: "Fashion",
          image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
        },
        {
          name: "Casual Sneakers",
          price: 149.99,
          category: "Fashion",
          image:
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
        },
        {
          name: "Elegant Watch",
          price: 459.99,
          category: "Fashion",
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        },
        {
          name: "Summer Jacket",
          price: 179.99,
          category: "Fashion",
          image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
        },
        {
          name: "Stylish Sunglasses",
          price: 89.99,
          category: "Fashion",
          image:
            "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&q=80",
        },
      ],
      "home-essentials": [
        {
          name: "Coffee Maker",
          price: 159.99,
          category: "Home & Kitchen",
          image:
            "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?w=500&q=80",
        },
        {
          name: "Throw Pillows Set",
          price: 49.99,
          category: "Home Decor",
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80",
        },
        {
          name: "Indoor Plant",
          price: 29.99,
          category: "Home & Garden",
          image:
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80",
        },
        {
          name: "Kitchen Knife Set",
          price: 89.99,
          category: "Home & Kitchen",
          image:
            "https://images.unsplash.com/photo-1563135465-3ba3f6a71b59?w=500&q=80",
        },
        {
          name: "Bedding Set",
          price: 119.99,
          category: "Home & Garden",
          image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80",
        },
        {
          name: "Table Lamp",
          price: 79.99,
          category: "Home Decor",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
        },
      ],
      "sports-zone": [
        {
          name: "Running Shoes",
          price: 129.99,
          category: "Sports",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        },
        {
          name: "Yoga Mat",
          price: 39.99,
          category: "Sports",
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80",
        },
        {
          name: "Basketball",
          price: 29.99,
          category: "Sports",
          image:
            "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&q=80",
        },
        {
          name: "Workout Clothes",
          price: 69.99,
          category: "Sports",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
        },
        {
          name: "Protein Shaker",
          price: 19.99,
          category: "Sports",
          image:
            "https://images.unsplash.com/photo-1594737626072-90dc274bc2bd?w=500&q=80",
        },
        {
          name: "Resistance Bands",
          price: 24.99,
          category: "Sports",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
        },
      ],
    };

    const templates = productTemplates[store.id] || [];
    return templates.map((template, index) => ({
      id: `${store.id}-${index + 1}`,
      ...template,
      slug: template.name.toLowerCase().replace(/\s+/g, "-"),
      rating: (4.0 + Math.random() * 1).toFixed(1),
      reviewCount: Math.floor(Math.random() * 500) + 50,
      inStock: true,
      featured: index < 2,
    }));
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added to cart!`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} style={{ color: "#fbbf24" }} />);
    }
    return stars;
  };

  if (!store) {
    return (
      <PageContainer>
        <Navbar
          cartItemsCount={cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
          )}
        />
        <div style={{ padding: "4rem", textAlign: "center" }}>
          <h2>Store not found</h2>
          <Link to="/ecommerce-stores">← Back to Store Listings</Link>
        </div>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Navbar
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        storeName={store.name}
      />

      <StoreHeroSection bgImage={store.image}>
        <HeroContent>
          <StoreLogo>
            <img src={store.logo} alt={`${store.name} logo`} />
          </StoreLogo>
          <StoreName>{store.name}</StoreName>
          <StoreTagline>{store.description}</StoreTagline>

          <StoreInfo>
            <InfoItem>
              <FaMapMarkerAlt />
              <span>
                {store.city}, {store.state}
              </span>
            </InfoItem>
            <Rating>
              <div className="stars">{renderStars(store.rating)}</div>
              <span>
                {store.rating} ({store.reviewCount} reviews)
              </span>
            </Rating>
            <InfoItem>
              <FaPhone />
              <span>{store.phone}</span>
            </InfoItem>
          </StoreInfo>

          <CTAButton to={`/ecommerce/${storeId}/products`}>
            <FaShoppingBag />
            Shop Now
            <FaArrowRight />
          </CTAButton>
        </HeroContent>
      </StoreHeroSection>

      <MainContent>
        <Section>
          <SectionTitle>Featured Products</SectionTitle>
          <ProductsGrid>
            {storeProducts.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </ProductsGrid>
          <ViewAllButton to={`/ecommerce/${storeId}/products`}>
            View All Products
            <FaArrowRight />
          </ViewAllButton>
        </Section>

        <Section>
          <SpecialtiesSection>
            <SectionTitle>Our Specialties</SectionTitle>
            <SpecialtiesGrid>
              {store.specialties.map((specialty, index) => (
                <SpecialtyCard key={index}>
                  <h3>{specialty}</h3>
                  <p>
                    Premium quality {specialty.toLowerCase()} for all your needs
                  </p>
                </SpecialtyCard>
              ))}
            </SpecialtiesGrid>
          </SpecialtiesSection>
        </Section>
      </MainContent>

      <Footer />
    </PageContainer>
  );
};

export default StoreHome;
