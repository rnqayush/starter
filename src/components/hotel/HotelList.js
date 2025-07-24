import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaStar, FaWifi, FaParking, FaSwimmingPool, FaUtensils } from 'react-icons/fa';
import { useGetHotelsQuery } from '../../store/api/hotelApi';
import { 
  selectSearchQuery, 
  selectActiveFilters, 
  selectCurrentPage, 
  selectItemsPerPage,
  selectSortBy,
  selectSortOrder,
  setCurrentPage,
  updateFilter,
  setSearchQuery
} from '../../store/slices/uiSlice';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';
import { theme } from '../../styles/GlobalStyle';
import { Button } from '../shared/Button';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const Header = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
`;

const SearchAndFilters = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 300px;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
`;

const FilterSelect = styled.select`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const HotelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const HotelCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const HotelImage = styled.div`
  height: 200px;
  background: ${props => props.image ? `url(${props.image})` : theme.colors.gray200};
  background-size: cover;
  background-position: center;
  position: relative;
`;

const PriceTag = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
`;

const HotelContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const HotelName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const HotelLocation = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.md};
  
  svg {
    color: ${theme.colors.primary};
  }
`;

const HotelRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  
  .stars {
    display: flex;
    gap: 2px;
  }
  
  .rating-text {
    color: ${theme.colors.gray600};
    font-size: 0.9rem;
  }
`;

const Amenities = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  
  svg {
    color: ${theme.colors.gray500};
    font-size: 1.1rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

const PageButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray300};
  background: ${props => props.active ? theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : theme.colors.gray700};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background: ${props => props.active ? theme.colors.primary : theme.colors.gray50};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const HotelList = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const activeFilters = useSelector(selectActiveFilters);
  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  // Build query parameters
  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery,
    sortBy,
    sortOrder,
    ...activeFilters
  };

  const {
    data: hotelsData,
    isLoading,
    error,
    refetch
  } = useGetHotelsQuery(queryParams);

  const hotels = hotelsData?.data?.hotels || [];
  const totalPages = hotelsData?.data?.totalPages || 1;
  const totalCount = hotelsData?.data?.total || 0;

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleFilterChange = (key, value) => {
    dispatch(updateFilter({ key, value }));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        color={i < rating ? '#fbbf24' : '#e5e7eb'}
      />
    ));
  };

  if (isLoading) {
    return <LoadingSpinner size="large" text="Loading hotels..." />;
  }

  if (error) {
    return <ErrorMessage onRetry={refetch} />;
  }

  return (
    <Container>
      <Header>
        <Title>Find Your Perfect Stay</Title>
        <p>Discover amazing hotels with great amenities and service</p>
      </Header>

      <SearchAndFilters>
        <SearchInput
          type="text"
          placeholder="Search hotels by name or location..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        
        <FilterSelect
          value={activeFilters.location || ''}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
          <option value="Miami">Miami</option>
        </FilterSelect>

        <FilterSelect
          value={activeFilters.priceRange || ''}
          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="0-100">$0 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="200-300">$200 - $300</option>
          <option value="300+">$300+</option>
        </FilterSelect>

        <FilterSelect
          value={activeFilters.rating || ''}
          onChange={(e) => handleFilterChange('rating', e.target.value)}
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
        </FilterSelect>
      </SearchAndFilters>

      {hotels.length === 0 ? (
        <ErrorMessage
          title="No Hotels Found"
          message="No hotels match your current search criteria. Try adjusting your filters."
          showRetry={false}
        />
      ) : (
        <>
          <div style={{ marginBottom: theme.spacing.lg, color: theme.colors.gray600 }}>
            Showing {hotels.length} of {totalCount} hotels
          </div>

          <HotelGrid>
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id}>
                <HotelImage image={hotel.images?.[0]}>
                  <PriceTag>
                    ${hotel.pricePerNight}/night
                  </PriceTag>
                </HotelImage>
                
                <HotelContent>
                  <HotelName>{hotel.name}</HotelName>
                  
                  <HotelLocation>
                    <FaMapMarkerAlt />
                    <span>{hotel.location}</span>
                  </HotelLocation>
                  
                  <HotelRating>
                    <div className="stars">
                      {renderStars(hotel.rating || 0)}
                    </div>
                    <span className="rating-text">
                      ({hotel.reviewCount || 0} reviews)
                    </span>
                  </HotelRating>
                  
                  <Amenities>
                    {hotel.amenities?.includes('wifi') && <FaWifi title="WiFi" />}
                    {hotel.amenities?.includes('parking') && <FaParking title="Parking" />}
                    {hotel.amenities?.includes('pool') && <FaSwimmingPool title="Pool" />}
                    {hotel.amenities?.includes('restaurant') && <FaUtensils title="Restaurant" />}
                  </Amenities>
                  
                  <Button 
                    variant="primary" 
                    fullWidth
                    onClick={() => window.open(`/hotels/${hotel._id}`, '_blank')}
                  >
                    View Details
                  </Button>
                </HotelContent>
              </HotelCard>
            ))}
          </HotelGrid>

          {totalPages > 1 && (
            <Pagination>
              <PageButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </PageButton>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <PageButton
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PageButton>
                );
              })}
              
              <PageButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </PageButton>
            </Pagination>
          )}
        </>
      )}
    </Container>
  );
};

export default HotelList;
