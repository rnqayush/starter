import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaMapMarkerAlt,
  FaSearch,
  FaLocationArrow,
  FaHome,
  FaCar,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import StoreCard from '../../components/shared/StoreCard';
import { automobileVendors } from '../data/vendors';
import {
  getCurrentLocation,
  getLocationFromZip,
  searchLocationByCity,
  updateVendorsWithDistance,
  getDefaultLocation,
} from '../../utils/location';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const NavHeader = styled.div`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  border-bottom: 1px solid ${theme.colors.gray200};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const BackButton = styled.button`
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

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  flex: 1;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
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

const LocationDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.primary};
  font-weight: 600;
`;

const SearchSection = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.xl};
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: ${theme.spacing.md};
  align-items: end;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 3rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.gray500};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
  font-size: 1.1rem;
`;

const LocationButton = styled.button`
  background: ${theme.colors.gray100};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  white-space: nowrap;

  &:hover {
    background: ${theme.colors.gray200};
    border-color: ${theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SearchButton = styled.button`
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
  white-space: nowrap;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const FiltersSection = styled.div`
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

const FilterButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  background: ${props =>
    props.active ? theme.colors.primary : theme.colors.white};
  color: ${props => (props.active ? theme.colors.white : theme.colors.gray700)};
  border: 2px solid
    ${props => (props.active ? theme.colors.primary : theme.colors.gray200)};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const SortSelect = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.gray600};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.sm};
  }
`;

const StoresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray600};

  .spinner {
    margin-bottom: ${theme.spacing.lg};
    font-size: 2rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
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

const AutomobileStoresListing = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [locationLoading, setLocationLoading] = useState(false);

  const loadStoresForLocation = useCallback(location => {
    const vendorsWithDistance = updateVendorsWithDistance(
      automobileVendors,
      location
    );
    setStores(vendorsWithDistance);
    setFilteredStores(vendorsWithDistance);
    setLoading(false);
  }, []);

  const initializeLocation = useCallback(async () => {
    setLoading(true);
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      loadStoresForLocation(location);
    } catch (error) {
      console.error('Failed to get location:', error);
      const defaultLocation = getDefaultLocation();
      setCurrentLocation(defaultLocation);
      loadStoresForLocation(defaultLocation);
    }
  }, [loadStoresForLocation]);

  const handleLocationSearch = async e => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLocationLoading(true);
    try {
      let newLocation;

      if (/^\d{5}$/.test(searchTerm.trim())) {
        newLocation = await getLocationFromZip(searchTerm.trim());
      } else {
        newLocation = await searchLocationByCity(searchTerm.trim());
      }

      setCurrentLocation(newLocation);
      loadStoresForLocation(newLocation);
      setSearchTerm('');
    } catch (error) {
      alert('Location not found. Please try a different city or ZIP code.');
    } finally {
      setLocationLoading(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    setLocationLoading(true);
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      loadStoresForLocation(location);
    } catch (error) {
      alert(
        'Unable to get your current location. Please check your browser settings.'
      );
    } finally {
      setLocationLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = [...stores];

    if (activeFilter === 'featured') {
      filtered = filtered.filter(store => store.featured);
    }

    switch (sortBy) {
      case 'distance':
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredStores(filtered);
  }, [stores, activeFilter, sortBy]);

  useEffect(() => {
    initializeLocation();
  }, [initializeLocation]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  if (loading) {
    return (
      <PageContainer>
        <NavHeader>
          <NavContent>
            <Logo>
              <FaCar /> Auto Dealers
            </Logo>
            <BackButton onClick={() => navigate('/')}>
              <FaHome />
              Back to Home
            </BackButton>
          </NavContent>
        </NavHeader>
        <LoadingState>
          <div className="spinner">🚗</div>
          <h3>Finding auto dealers near you...</h3>
          <p>Please wait while we locate nearby dealerships.</p>
        </LoadingState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <NavHeader>
        <NavContent>
          <Logo>
            <FaCar /> Auto Dealers
          </Logo>
          <BackButton onClick={() => navigate('/')}>
            <FaHome />
            Back to Home
          </BackButton>
        </NavContent>
      </NavHeader>

      <Container>
        <PageHeader>
          <PageTitle>Auto Dealers Near You</PageTitle>
          <PageSubtitle>
            Find the perfect vehicle from trusted dealerships in your area
          </PageSubtitle>
          {currentLocation && (
            <LocationDisplay>
              <FaMapMarkerAlt />
              <span>
                {currentLocation.city}, {currentLocation.state}
                {currentLocation.isDefault && ' (Default Location)'}
              </span>
            </LocationDisplay>
          )}
        </PageHeader>

        <SearchSection>
          <SearchForm onSubmit={handleLocationSearch}>
            <SearchInputContainer>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Enter city name or ZIP code..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </SearchInputContainer>

            <LocationButton
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={locationLoading}
            >
              <FaLocationArrow />
              Use My Location
            </LocationButton>

            <SearchButton type="submit" disabled={locationLoading}>
              {locationLoading ? 'Searching...' : 'Search'}
            </SearchButton>
          </SearchForm>
        </SearchSection>

        <FiltersSection>
          <FilterGroup>
            <FilterButton
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            >
              All Dealers
            </FilterButton>
            <FilterButton
              active={activeFilter === 'featured'}
              onClick={() => setActiveFilter('featured')}
            >
              Featured
            </FilterButton>
          </FilterGroup>

          <FilterGroup>
            <SortSelect
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
            </SortSelect>
          </FilterGroup>
        </FiltersSection>

        <ResultsInfo>
          <span>
            {filteredStores.length} dealer
            {filteredStores.length !== 1 ? 's' : ''} found
          </span>
        </ResultsInfo>

        {filteredStores.length > 0 ? (
          <StoresGrid>
            {filteredStores.map(store => (
              <StoreCard key={store.id} store={store} category="automobiles" />
            ))}
          </StoresGrid>
        ) : (
          <EmptyState>
            <h3>No dealers found</h3>
            <p>
              Try searching for a different location or adjusting your filters.
            </p>
          </EmptyState>
        )}
      </Container>
    </PageContainer>
  );
};

export default AutomobileStoresListing;
