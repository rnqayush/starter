import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaTh, FaList, FaTimes } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { products, categories, getProductsByCategory } from "../data/products";
import { getVendorByIdOrSlug } from "../data/vendors";

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

const ResultsInfo = styled.p`
  color: ${theme.colors.gray600};
  font-size: 1rem;
`;

const FiltersBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.gray700};
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }

  &.active {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
  }
`;

const Select = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  color: ${theme.colors.gray700};
  font-weight: 500;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ViewToggle = styled.div`
  display: flex;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

const ViewButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.white};
  color: ${(props) =>
    props.active ? theme.colors.white : theme.colors.gray700};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.active ? theme.colors.primaryDark : theme.colors.gray100};
  }
`;

const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const ActiveFilter = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
`;

const RemoveFilterButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.white};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;

const ProductsGrid = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "view",
})`
  display: grid;
  grid-template-columns: ${(props) =>
    props.view === "list" ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))"};
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${theme.spacing.lg};
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray600};

  h3 {
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.gray900};
  }

  p {
    font-size: 1rem;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const ClearFiltersButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [view, setView] = useState("grid");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storeSlug, setStoreSlug] = useState("");
  const [vendor, setVendor] = useState(null);

  // Detect store slug from URL
  useEffect(() => {
    const path = location.pathname;
    if (path !== "/ecommerce/products") {
      // Extract store slug from URL like "/techmart-downtown/products"
      const pathSegments = path.split("/").filter(Boolean);
      const slug = pathSegments[0];
      const vendor = getVendorByIdOrSlug(slug);
      if (vendor) {
        setStoreSlug(vendor.slug);
      }
    }
  }, [location.pathname]);

  // Get URL parameters
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search");
  const featured = searchParams.get("featured");
  const sale = searchParams.get("sale");

  useEffect(() => {
    setLoading(true);
    let result = [...products];

    // Filter by category
    if (category) {
      result = getProductsByCategory(category);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      );
    }

    // Filter by featured
    if (featured === "true") {
      result = result.filter((product) => product.featured);
    }

    // Filter by sale
    if (sale === "true") {
      result = result.filter((product) => product.onSale);
    }

    // Sort products
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(result);
    setLoading(false);
  }, [category, searchQuery, featured, sale, sortBy]);

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

  const getPageTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (category) {
      const cat = categories.find((c) => c.slug === category);
      return cat ? cat.name : "Products";
    }
    if (featured === "true") return "Featured Products";
    if (sale === "true") return "Sale Items";
    return "All Products";
  };

  const getActiveFilters = () => {
    const filters = [];
    if (category) {
      const cat = categories.find((c) => c.slug === category);
      if (cat)
        filters.push({ type: "category", value: cat.name, param: "category" });
    }
    if (searchQuery)
      filters.push({ type: "search", value: searchQuery, param: "search" });
    if (featured === "true")
      filters.push({ type: "featured", value: "Featured", param: "featured" });
    if (sale === "true")
      filters.push({ type: "sale", value: "On Sale", param: "sale" });
    return filters;
  };

  const removeFilter = (param) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(param);
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const setCategoryFilter = (categorySlug) => {
    const newParams = new URLSearchParams(searchParams);
    if (categorySlug) {
      newParams.set("category", categorySlug);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  };

  const activeFilters = getActiveFilters();

  if (loading) {
    return (
      <PageContainer>
        <Navbar
          cartItemsCount={cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
          )}
        />
        <LoadingSpinner fullPage text="Loading products..." />
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
          <PageTitle>{getPageTitle()}</PageTitle>
          <ResultsInfo>
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </ResultsInfo>
        </PageHeader>

        <FiltersBar>
          <FilterGroup>
            <FilterButton
              className={!category ? "active" : ""}
              onClick={() => setCategoryFilter("")}
            >
              All
            </FilterButton>
            {categories.map((cat) => (
              <FilterButton
                key={cat.id}
                className={category === cat.slug ? "active" : ""}
                onClick={() => setCategoryFilter(cat.slug)}
              >
                {cat.name}
              </FilterButton>
            ))}
          </FilterGroup>

          <FilterGroup>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </Select>

            <ViewToggle>
              <ViewButton
                active={view === "grid"}
                onClick={() => setView("grid")}
                title="Grid View"
              >
                <FaTh />
              </ViewButton>
              <ViewButton
                active={view === "list"}
                onClick={() => setView("list")}
                title="List View"
              >
                <FaList />
              </ViewButton>
            </ViewToggle>
          </FilterGroup>
        </FiltersBar>

        {activeFilters.length > 0 && (
          <ActiveFilters>
            {activeFilters.map((filter, index) => (
              <ActiveFilter key={index}>
                {filter.value}
                <RemoveFilterButton onClick={() => removeFilter(filter.param)}>
                  <FaTimes />
                </RemoveFilterButton>
              </ActiveFilter>
            ))}
            <ClearFiltersButton onClick={clearAllFilters}>
              Clear All
            </ClearFiltersButton>
          </ActiveFilters>
        )}

        {filteredProducts.length > 0 ? (
          <ProductsGrid view={view}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                storeSlug={storeSlug}
              />
            ))}
          </ProductsGrid>
        ) : (
          <NoResults>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search terms</p>
            <ClearFiltersButton onClick={clearAllFilters}>
              Clear All Filters
            </ClearFiltersButton>
          </NoResults>
        )}
      </Container>

      <Footer />
    </PageContainer>
  );
};

export default Products;
