import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaTh, FaList, FaTimes } from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGetProductsQuery } from '../../store/api/ecommerceApi';
import { usePaginatedApiData } from '../../hooks/useApiData';
import ErrorMessage from '../../components/shared/ErrorMessage';
import { categories } from '../data/products';

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
  shouldForwardProp: prop => prop !== 'active',
})`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${props =>
    props.active ? theme.colors.primary : theme.colors.white};
  color: ${props => (props.active ? theme.colors.white : theme.colors.gray700)};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props =>
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
  shouldForwardProp: prop => prop !== 'view',
})`
  display: grid;
  grid-template-columns: ${props =>
    props.view === 'list' ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))'};
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

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [sortBy, setSortBy] = useState('name');
  const [view, setView] = useState('grid');

  // Get URL parameters
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  const featured = searchParams.get('featured');
  const sale = searchParams.get('sale');

  // Build API query parameters
  const apiParams = {
    ...(category && { category }),
    ...(searchQuery && { search: searchQuery }),
    ...(featured === 'true' && { featured: true }),
    ...(sale === 'true' && { onSale: true }),
    sortBy: sortBy === 'name' ? 'name' : sortBy,
    sortOrder: sortBy === 'price-high' ? 'desc' : 'asc',
  };

  // Use paginated API data
  const {
    items: products,
    pagination,
    isLoading,
    error,
    refetch,
    updateFilters,
    goToPage
  } = usePaginatedApiData(useGetProductsQuery, apiParams);

  // Update filters when sort changes
  useEffect(() => {
    updateFilters({
      sortBy: sortBy === 'name' ? 'name' : sortBy,
      sortOrder: sortBy === 'price-high' ? 'desc' : 'asc',
    });
  }, [sortBy, updateFilters]);

  const getPageTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (category) {
      const cat = categories.find(c => c.slug === category);
      return cat ? cat.name : 'Products';
    }
    if (featured === 'true') return 'Featured Products';
    if (sale === 'true') return 'Sale Items';
    return 'All Products';
  };

  const getActiveFilters = () => {
    const filters = [];
    if (category) {
      const cat = categories.find(c => c.slug === category);
      if (cat)
        filters.push({ type: 'category', value: cat.name, param: 'category' });
    }
    if (searchQuery)
      filters.push({ type: 'search', value: searchQuery, param: 'search' });
    if (featured === 'true')
      filters.push({ type: 'featured', value: 'Featured', param: 'featured' });
    if (sale === 'true')
      filters.push({ type: 'sale', value: 'On Sale', param: 'sale' });
    return filters;
  };

  const removeFilter = param => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(param);
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const setCategoryFilter = categorySlug => {
    const newParams = new URLSearchParams(searchParams);
    if (categorySlug) {
      newParams.set('category', categorySlug);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const activeFilters = getActiveFilters();

  if (isLoading) {
    return (
      <PageContainer>
        <Navbar />
        <Container>
          <LoadingSpinner text="Loading products..." size="large" />
        </Container>
        <Footer />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Navbar />
        <Container>
          <ErrorMessage
            title="Failed to load products"
            message="We couldn't load the products. Please try again."
            error={error}
            onRetry={refetch}
          />
        </Container>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Navbar />

      <Container>
        <PageHeader>
          <PageTitle>{getPageTitle()}</PageTitle>
          <ResultsInfo>
            Showing {products.length} product
            {products.length !== 1 ? 's' : ''}
            {pagination.total && ` of ${pagination.total}`}
          </ResultsInfo>
        </PageHeader>

        <FiltersBar>
          <FilterGroup>
            <FilterButton
              className={!category ? 'active' : ''}
              onClick={() => setCategoryFilter('')}
            >
              All
            </FilterButton>
            {categories.map(cat => (
              <FilterButton
                key={cat.id}
                className={category === cat.slug ? 'active' : ''}
                onClick={() => setCategoryFilter(cat.slug)}
              >
                {cat.name}
              </FilterButton>
            ))}
          </FilterGroup>

          <FilterGroup>
            <Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </Select>

            <ViewToggle>
              <ViewButton
                active={view === 'grid'}
                onClick={() => setView('grid')}
                title="Grid View"
              >
                <FaTh />
              </ViewButton>
              <ViewButton
                active={view === 'list'}
                onClick={() => setView('list')}
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

        {products.length > 0 ? (
          <ProductsGrid view={view}>
            {products.map(product => (
              <ProductCard
                key={product.id || product._id}
                product={product}
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

export default ProductList;
