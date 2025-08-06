import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaFilter,
  FaSort,
  FaTh,
  FaList,
  FaHome,
  FaSpinner,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VehicleCard from '../components/VehicleCard';
import BackToTop from '../ecommerce/components/BackToTop';
import {
  fetchAutomobileData,
  setFilters,
  clearFilters,
  selectVendor,
  selectCategories,
  selectFilteredVehicles,
  selectLoading,
  selectError,
  selectFilters,
  selectAvailableFilters,
  clearError,
} from '../../store/slices/automobileManagementSlice';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.gray50};
  gap: ${theme.spacing.lg};
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${theme.colors.gray200};
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.gray600};
  text-align: center;
`;

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.xl};
  text-align: center;
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.red600};
  margin-bottom: ${theme.spacing.md};
`;

const ErrorText = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xl};
  max-width: 500px;
`;

const ErrorButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const BackButton = styled.button`
  position: fixed;
  top: ${theme.spacing.xl};
  left: ${theme.spacing.xl};
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  z-index: 1000;
  box-shadow: ${theme.shadows.md};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    transform: translateY(-1px);
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  flex: 1;
`;

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
`;

const FilterSection = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  margin-bottom: ${theme.spacing.xl};
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    align-items: stretch;
  }
`;

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const ViewToggle = styled.div`
  display: flex;
  background: ${theme.colors.gray100};
  border-radius: ${theme.borderRadius.md};
  padding: 4px;
`;

const ViewButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  background: ${props => (props.active ? theme.colors.white : 'transparent')};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props =>
    props.active ? theme.colors.primary : theme.colors.gray600};
  box-shadow: ${props => (props.active ? theme.shadows.sm : 'none')};
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const FilterLabel = styled.label`
  font-weight: 500;
  color: ${theme.colors.gray700};
  font-size: 0.9rem;
`;

const Select = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  cursor: pointer;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const PriceRangeContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;
`;

const PriceInput = styled.input`
  padding: ${theme.spacing.sm};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  width: 100px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    align-items: stretch;
  }
`;

const ResultsCount = styled.h2`
  font-size: 1.3rem;
  color: ${theme.colors.gray900};
  font-weight: 600;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const VehiclesGrid = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'viewMode',
})`
  display: grid;
  grid-template-columns: ${props =>
    props.viewMode === 'list'
      ? '1fr'
      : 'repeat(auto-fill, minmax(350px, 1fr))'};
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const EmptyState = styled.div`
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

const Vehicles = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Redux selectors
  const vendor = useSelector(selectVendor);
  const categories = useSelector(selectCategories);
  const filteredVehicles = useSelector(selectFilteredVehicles);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters);
  const availableFilters = useSelector(selectAvailableFilters);

  const [viewMode, setViewMode] = useState('grid');
  const [vendorSlug, setVendorSlug] = useState(null);

  useEffect(() => {
    // Get vendor slug from URL
    const path = location.pathname;
    let slug = null;

    if (path !== '/automobiles/vehicles') {
      const pathSegments = path.split('/').filter(Boolean);
      slug = pathSegments[0];
    }

    if (!slug) {
      navigate('/auto-dealers');
      return;
    }

    setVendorSlug(slug);

    // Only fetch data if we don't have vendor data yet
    if (!vendor || vendor.slug !== slug) {
      dispatch(fetchAutomobileData(slug));
    }

    // Apply URL search params to filters
    const urlFilters = {
      category: searchParams.get('category') || '',
      make: searchParams.get('make') || '',
      condition: searchParams.get('condition') || '',
      priceRange: {
        min: parseInt(searchParams.get('minPrice')) || 0,
        max: parseInt(searchParams.get('maxPrice')) || 500000,
      },
      sortBy: searchParams.get('sort') || 'featured',
    };

    dispatch(setFilters(urlFilters));
  }, [location.pathname, navigate, dispatch, vendor, searchParams]);

  const handleFilterChange = (key, value) => {
    let newFilters = { ...filters };

    if (key === 'minPrice' || key === 'maxPrice') {
      newFilters.priceRange = {
        ...newFilters.priceRange,
        [key === 'minPrice' ? 'min' : 'max']:
          parseInt(value) || (key === 'minPrice' ? 0 : 500000),
      };
    } else {
      newFilters[key] = value;
    }

    dispatch(setFilters(newFilters));

    // Update URL params
    const newParams = new URLSearchParams();
    if (newFilters.category) newParams.set('category', newFilters.category);
    if (newFilters.make) newParams.set('make', newFilters.make);
    if (newFilters.condition) newParams.set('condition', newFilters.condition);
    if (newFilters.priceRange.min > 0)
      newParams.set('minPrice', newFilters.priceRange.min.toString());
    if (newFilters.priceRange.max < 500000)
      newParams.set('maxPrice', newFilters.priceRange.max.toString());
    if (newFilters.sortBy !== 'featured')
      newParams.set('sort', newFilters.sortBy);

    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setSearchParams({});
  };

  const handleBackToDealer = () => {
    if (vendor) {
      navigate(`/${vendor.slug}`);
    } else {
      navigate('/auto-dealers');
    }
  };

  const handleRetry = () => {
    if (vendorSlug) {
      dispatch(clearError());
      dispatch(fetchAutomobileData(vendorSlug));
    }
  };

  // Show loading state
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading vehicle inventory...</LoadingText>
      </LoadingContainer>
    );
  }

  // Show error state
  if (error) {
    return (
      <ErrorContainer>
        <ErrorTitle>Something went wrong</ErrorTitle>
        <ErrorText>{error}</ErrorText>
        <ErrorButton onClick={handleRetry}>
          <FaSpinner />
          Try Again
        </ErrorButton>
      </ErrorContainer>
    );
  }

  // Show fallback if no vendor data
  if (!vendor) {
    return (
      <ErrorContainer>
        <ErrorTitle>Dealer Not Found</ErrorTitle>
        <ErrorText>
          The dealer you're looking for doesn't exist or may have been removed.
        </ErrorText>
        <ErrorButton onClick={() => navigate('/auto-dealers')}>
          <FaHome />
          Browse Dealers
        </ErrorButton>
      </ErrorContainer>
    );
  }

  const dealerTheme = vendor.theme || {};
  const hasActiveFilters =
    filters.category ||
    filters.make ||
    filters.condition ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 500000 ||
    filters.sortBy !== 'featured';

  return (
    <PageContainer>
      <BackButton onClick={handleBackToDealer}>
        <FaHome />
        Back to {vendor.name}
      </BackButton>

      <Navbar
        dealerName={vendor.name}
        dealerLogo={vendor.businessInfo?.logo || vendor.logo}
        dealerSlug={vendor.slug}
        theme={dealerTheme}
      />

      <Container>
        <PageHeader>
          <PageTitle>Vehicle Inventory</PageTitle>
          <PageSubtitle>
            Browse our complete selection of vehicles at {vendor.name}
          </PageSubtitle>
        </PageHeader>

        <FilterSection>
          <FilterHeader>
            <FilterTitle>
              <FaFilter />
              Filter & Search
            </FilterTitle>
            <ViewToggle>
              <ViewButton
                active={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
              >
                <FaTh />
                Grid
              </ViewButton>
              <ViewButton
                active={viewMode === 'list'}
                onClick={() => setViewMode('list')}
              >
                <FaList />
                List
              </ViewButton>
            </ViewToggle>
          </FilterHeader>

          <FilterGrid>
            <FilterGroup>
              <FilterLabel>Category</FilterLabel>
              <Select
                value={filters.category || ''}
                onChange={e => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Make</FilterLabel>
              <Select
                value={filters.make || ''}
                onChange={e => handleFilterChange('make', e.target.value)}
              >
                <option value="">All Makes</option>
                {availableFilters.makes?.map(make => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </Select>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Condition</FilterLabel>
              <Select
                value={filters.condition || ''}
                onChange={e => handleFilterChange('condition', e.target.value)}
              >
                <option value="">All Conditions</option>
                {availableFilters.conditions?.map(condition => (
                  <option key={condition} value={condition}>
                    {condition.charAt(0).toUpperCase() + condition.slice(1)}
                  </option>
                ))}
              </Select>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Price Range</FilterLabel>
              <PriceRangeContainer>
                <PriceInput
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange?.min || ''}
                  onChange={e => handleFilterChange('minPrice', e.target.value)}
                />
                <span>-</span>
                <PriceInput
                  type="number"
                  placeholder="Max"
                  value={
                    filters.priceRange?.max === 500000
                      ? ''
                      : filters.priceRange?.max || ''
                  }
                  onChange={e => handleFilterChange('maxPrice', e.target.value)}
                />
              </PriceRangeContainer>
            </FilterGroup>
          </FilterGrid>

          {hasActiveFilters && (
            <div style={{ marginTop: theme.spacing.lg, textAlign: 'center' }}>
              <ClearFiltersButton onClick={handleClearFilters}>
                Clear All Filters
              </ClearFiltersButton>
            </div>
          )}
        </FilterSection>

        <ResultsHeader>
          <ResultsCount>
            {filteredVehicles.length} Vehicle
            {filteredVehicles.length !== 1 ? 's' : ''} Found
          </ResultsCount>
          <SortContainer>
            <FaSort />
            <Select
              value={filters.sortBy || 'featured'}
              onChange={e => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="featured">Featured First</option>
              <option value="name">Sort by Name</option>
              <option value="price">Price: Low to High</option>
              <option value="year">Year: Newest First</option>
              <option value="rating">Highest Rated</option>
            </Select>
          </SortContainer>
        </ResultsHeader>

        {filteredVehicles.length > 0 ? (
          <VehiclesGrid viewMode={viewMode}>
            {filteredVehicles.map(vehicle => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                dealerSlug={vendor.slug}
              />
            ))}
          </VehiclesGrid>
        ) : (
          <EmptyState>
            <h3>No vehicles found</h3>
            <p>
              Try adjusting your filters or search criteria to find more
              vehicles.
            </p>
            <ClearFiltersButton onClick={handleClearFilters}>
              Clear All Filters
            </ClearFiltersButton>
          </EmptyState>
        )}
      </Container>

      <Footer dealerSlug={vendor.slug} dealer={vendor} theme={dealerTheme} />
      <BackToTop />
    </PageContainer>
  );
};

export default Vehicles;
