import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaFire, FaEye, FaHeart, FaThumbsUp } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

const RecommendationContainer = styled.div`
  margin: ${theme.spacing.xl} 0;
`;

const RecommendationSection = styled.section`
  margin-bottom: ${theme.spacing.xxl};

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${theme.colors.primary}20;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.primary};
  font-size: 1.2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const SectionSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: ${theme.spacing.xs} 0 0 0;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${theme.spacing.lg};
  }
`;

const RecommendationEngine = ({ 
  currentProduct = null, 
  userBehavior = {}, 
  storeSlug = "",
  maxRecommendations = 4 
}) => {
  const [recommendations, setRecommendations] = useState({
    trending: [],
    similar: [],
    viewed: [],
    collaborative: []
  });

  useEffect(() => {
    generateRecommendations();
  }, [currentProduct, userBehavior]);

  const generateRecommendations = () => {
    // Get trending products (simulate based on high ratings and reviews)
    const trending = products
      .filter(p => p.rating >= 4.5 && p.reviews > 100)
      .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
      .slice(0, maxRecommendations);

    let similar = [];
    let viewed = [];
    let collaborative = [];

    if (currentProduct) {
      // Similar products (same category)
      similar = products
        .filter(p => 
          p.categoryId === currentProduct.categoryId && 
          p.id !== currentProduct.id
        )
        .sort((a, b) => {
          // Sort by price similarity and rating
          const priceDiffA = Math.abs(a.price - currentProduct.price);
          const priceDiffB = Math.abs(b.price - currentProduct.price);
          return priceDiffA - priceDiffB || b.rating - a.rating;
        })
        .slice(0, maxRecommendations);

      // Collaborative filtering (people who viewed this also viewed)
      collaborative = products
        .filter(p => 
          p.id !== currentProduct.id && 
          (p.categoryId === currentProduct.categoryId || 
           Math.abs(p.price - currentProduct.price) < 100)
        )
        .sort((a, b) => b.rating - a.rating)
        .slice(0, maxRecommendations);
    }

    // Recently viewed products (from localStorage)
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    if (recentlyViewed.length > 0) {
      viewed = products
        .filter(p => 
          recentlyViewed.includes(p.id) && 
          (!currentProduct || p.id !== currentProduct.id)
        )
        .slice(0, maxRecommendations);
    }

    setRecommendations({
      trending,
      similar,
      viewed,
      collaborative
    });
  };

  const trackProductView = (productId) => {
    // Track product views for future recommendations
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    const updatedViewed = [productId, ...recentlyViewed.filter(id => id !== productId)].slice(0, 10);
    localStorage.setItem("recentlyViewed", JSON.stringify(updatedViewed));
  };

  const recommendationSections = [
    {
      key: "trending",
      title: "Trending Now",
      subtitle: "Popular products that customers are loving",
      icon: FaFire,
      products: recommendations.trending,
      show: recommendations.trending.length > 0
    },
    {
      key: "similar",
      title: currentProduct ? `Similar to ${currentProduct.name}` : "You Might Like",
      subtitle: "Products that match your interests",
      icon: FaThumbsUp,
      products: recommendations.similar,
      show: recommendations.similar.length > 0 && currentProduct
    },
    {
      key: "viewed",
      title: "Recently Viewed",
      subtitle: "Continue where you left off",
      icon: FaEye,
      products: recommendations.viewed,
      show: recommendations.viewed.length > 0
    },
    {
      key: "collaborative",
      title: "Customers Also Viewed",
      subtitle: "Other products customers looked at",
      icon: FaHeart,
      products: recommendations.collaborative,
      show: recommendations.collaborative.length > 0 && currentProduct
    }
  ];

  // Filter out sections with no products to show
  const visibleSections = recommendationSections.filter(section => section.show);

  if (visibleSections.length === 0) {
    return null;
  }

  return (
    <RecommendationContainer>
      {visibleSections.map((section) => (
        <RecommendationSection key={section.key}>
          <SectionHeader>
            <SectionIcon>
              <section.icon />
            </SectionIcon>
            <div>
              <SectionTitle>{section.title}</SectionTitle>
              <SectionSubtitle>{section.subtitle}</SectionSubtitle>
            </div>
          </SectionHeader>

          <ProductGrid>
            {section.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                storeSlug={storeSlug}
                onClick={() => trackProductView(product.id)}
              />
            ))}
          </ProductGrid>
        </RecommendationSection>
      ))}
    </RecommendationContainer>
  );
};

// Higher-order component for automatic recommendation tracking
export const withRecommendationTracking = (WrappedComponent) => {
  return function RecommendationTrackedComponent(props) {
    useEffect(() => {
      // Track page views for recommendation algorithm
      const currentTime = Date.now();
      const pageViews = JSON.parse(localStorage.getItem("pageViews") || "{}");
      
      const currentPath = window.location.pathname;
      if (!pageViews[currentPath]) {
        pageViews[currentPath] = { count: 0, lastVisit: currentTime };
      }
      
      pageViews[currentPath].count += 1;
      pageViews[currentPath].lastVisit = currentTime;
      
      localStorage.setItem("pageViews", JSON.stringify(pageViews));
    }, []);

    return <WrappedComponent {...props} />;
  };
};

// Utility functions for recommendation system
export const RecommendationUtils = {
  // Get user preferences based on behavior
  getUserPreferences: () => {
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    const enquiries = JSON.parse(localStorage.getItem("userEnquiries") || "[]");
    const pageViews = JSON.parse(localStorage.getItem("pageViews") || "{}");

    // Analyze categories from viewed products
    const viewedProducts = products.filter(p => recentlyViewed.includes(p.id));
    const categoryPreferences = {};
    const priceRanges = [];

    viewedProducts.forEach(product => {
      const category = product.category;
      categoryPreferences[category] = (categoryPreferences[category] || 0) + 1;
      priceRanges.push(product.price);
    });

    // Calculate preferred price range
    const avgPrice = priceRanges.length > 0 
      ? priceRanges.reduce((sum, price) => sum + price, 0) / priceRanges.length 
      : 0;

    return {
      preferredCategories: Object.keys(categoryPreferences)
        .sort((a, b) => categoryPreferences[b] - categoryPreferences[a]),
      averagePriceRange: avgPrice,
      totalViews: recentlyViewed.length,
      totalEnquiries: enquiries.length,
      lastActivity: Math.max(
        ...Object.values(pageViews).map(pv => pv.lastVisit),
        0
      )
    };
  },

  // Get personalized recommendations
  getPersonalizedRecommendations: (maxCount = 8) => {
    const preferences = RecommendationUtils.getUserPreferences();
    
    if (preferences.preferredCategories.length === 0) {
      // New user - show trending products
      return products
        .filter(p => p.featured || p.rating >= 4.5)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, maxCount);
    }

    // Existing user - show based on preferences
    const recommendedProducts = products
      .filter(p => preferences.preferredCategories.includes(p.category))
      .sort((a, b) => {
        // Score based on rating and price similarity
        const priceScore = 1 - Math.abs(p.price - preferences.averagePriceRange) / 1000;
        const ratingScore = b.rating / 5;
        return (ratingScore + priceScore) - (a.rating / 5 + Math.abs(a.price - preferences.averagePriceRange) / 1000);
      })
      .slice(0, maxCount);

    return recommendedProducts;
  },

  // Clear recommendation data (for privacy)
  clearRecommendationData: () => {
    localStorage.removeItem("recentlyViewed");
    localStorage.removeItem("pageViews");
    localStorage.removeItem("userEnquiries");
  }
};

export default RecommendationEngine;
