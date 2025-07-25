import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaFilter, FaSort, FaTh, FaList, FaHome } from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VehicleCard from '../components/VehicleCard';
import BackToTop from '../../ecommerce/components/BackToTop';
import {
  automobileVehicles as vehicles,
  automobileCategories as categories,
  getVehiclesByCategory,
  getAutomobileVendorByIdOrSlug as getVendorByIdOrSlug,
} from '../../DummyData';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
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
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedDealer, setSelectedDealer] = useState(null);
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    make: searchParams.get('make') || '',
    condition: searchParams.get('condition') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sort') || 'name',
  });
  const [viewMode, setViewMode] = useState('grid');

  const makes = [...new Set(vehicles.map(v => v.make))].sort();
  const conditions = [...new Set(vehicles.map(v => v.condition))].sort();

  useEffect(() => {
    // Get dealer data from URL
    const path = location.pathname;
    let dealer = null;

    if (path !== '/automobiles/vehicles') {
      const pathSegments = path.split('/').filter(Boolean);
      const dealerSlug = pathSegments[0];
      dealer = getVendorByIdOrSlug(dealerSlug);
    }

    if (dealer) {
      setSelectedDealer(dealer);
    } else {
      // If no dealer found, redirect to dealer listing
      navigate('/auto-dealers');
      return;
    }
  }, [location.pathname, navigate]);

  const applyFilters = useCallback(() => {
    let filtered = [...vehicles];

    // Category filter
    if (filters.category) {
      filtered = getVehiclesByCategory(filters.category);
    }

    // Make filter
    if (filters.make) {
      filtered = filtered.filter(v => v.make === filters.make);
    }

    // Condition filter
    if (filters.condition) {
      filtered = filtered.filter(v => v.condition === filters.condition);
    }

    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(v => v.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(v => v.price <= parseInt(filters.maxPrice));
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'year-new':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'year-old':
        filtered.sort((a, b) => a.year - b.year);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredVehicles(filtered);
  }, [filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL params
    const newParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newParams.set(k, v);
    });
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      make: '',
      condition: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
    };
    setFilters(clearedFilters);
    setSearchParams({});
  };

  const handleBackToDealer = () => {
    if (selectedDealer) {
      navigate(`/${selectedDealer.slug}`);
    } else {
      navigate('/auto-dealers');
    }
  };

  if (!selectedDealer) {
    return null; // Will redirect
  }

  const dealerTheme = selectedDealer.theme || {};

  return (
    <PageContainer>
      <BackButton onClick={handleBackToDealer}>
        <FaHome />
        Back to {selectedDealer.name}
      </BackButton>

      <Navbar
        dealerName={selectedDealer.name}
        dealerLogo={selectedDealer.logo}
        dealerSlug={selectedDealer.slug}
        theme={dealerTheme}
      />

      <Container>
        <PageHeader>
          <PageTitle>Vehicle Inventory</PageTitle>
          <PageSubtitle>
            Browse our complete selection of vehicles at {selectedDealer.name}
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
                value={filters.category}
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
                value={filters.make}
                onChange={e => handleFilterChange('make', e.target.value)}
              >
                <option value="">All Makes</option>
                {makes.map(make => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </Select>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Condition</FilterLabel>
              <Select
                value={filters.condition}
                onChange={e => handleFilterChange('condition', e.target.value)}
              >
                <option value="">All Conditions</option>
                {conditions.map(condition => (
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
                  value={filters.minPrice}
                  onChange={e => handleFilterChange('minPrice', e.target.value)}
                />
                <span>-</span>
                <PriceInput
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={e => handleFilterChange('maxPrice', e.target.value)}
                />
              </PriceRangeContainer>
            </FilterGroup>
          </FilterGrid>

          {Object.values(filters).some(v => v && v !== 'name') && (
            <div style={{ marginTop: theme.spacing.lg, textAlign: 'center' }}>
              <ClearFiltersButton onClick={clearFilters}>
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
              value={filters.sortBy}
              onChange={e => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
            </Select>
          </SortContainer>
        </ResultsHeader>

        {filteredVehicles.length > 0 ? (
          <VehiclesGrid viewMode={viewMode}>
            {filteredVehicles.map(vehicle => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                dealerSlug={selectedDealer.slug}
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
            <ClearFiltersButton onClick={clearFilters}>
              Clear All Filters
            </ClearFiltersButton>
          </EmptyState>
        )}
      </Container>

      <Footer
        dealerSlug={selectedDealer.slug}
        dealer={selectedDealer}
        theme={dealerTheme}
      />
      <BackToTop />
    </PageContainer>
  );
};

export default Vehicles;
