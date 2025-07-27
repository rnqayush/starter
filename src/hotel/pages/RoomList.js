import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaArrowLeft,
  FaFilter,
  FaMapMarkerAlt,
  FaStar,
  FaSearch,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import HotelNavbar from '../components/HotelNavbar';
import HotelFooter from '../components/HotelFooter';
import RoomCard from '../components/RoomCard';
import { fetchHotelById } from '../../utils/hotelAPI';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: calc(70px + ${theme.spacing.xl}) ${theme.spacing.md} ${theme.spacing.xl};
  flex: 1;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: calc(60px + ${theme.spacing.lg}) ${theme.spacing.sm} ${theme.spacing.lg};
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-weight: 500;
  margin-bottom: ${theme.spacing.xl};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;

  &:hover {
    transform: translateX(-4px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: ${theme.spacing.lg};
    padding: ${theme.spacing.sm} 0;
  }
`;

const PageHeader = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.lg};
    margin: 0 -${theme.spacing.xs} ${theme.spacing.lg};
  }
`;

const HotelInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const HotelDetails = styled.div`
  flex: 1;
`;

const HotelName = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.2rem;
    text-align: center;
    line-height: 1.3;
  }
`;

const HotelLocation = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray600};
  font-size: 1.1rem;
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
    font-size: 1.2rem;
    margin-bottom: ${theme.spacing.md};
  }
`;

const HotelRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray700};
  font-size: 1rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const HotelImage = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'image',
})`
  width: 200px;
  height: 150px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    height: 200px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 250px;
    border-radius: ${theme.borderRadius.xl};
    box-shadow: ${theme.shadows.lg};
  }
`;

const BookingControls = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
    margin: 0 -${theme.spacing.xs} ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.lg};
  }
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto auto;
  gap: ${theme.spacing.lg};
  align-items: end;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};

    & > * {
      width: 100%;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.md};
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 0.9rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    font-weight: 700;
  }
`;

const Input = styled.input`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
    font-size: 1.1rem;
    border-radius: ${theme.borderRadius.lg};
    border-width: 2px;

    &:focus {
      border-width: 3px;
    }
  }
`;

const Select = styled.select`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  background: ${theme.colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
    font-size: 1.1rem;
    border-radius: ${theme.borderRadius.lg};
    border-width: 2px;

    &:focus {
      border-width: 3px;
    }
  }
`;

const FilterButton = styled.button`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  min-height: 50px;

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
    padding: ${theme.spacing.lg};
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: ${theme.borderRadius.lg};
    min-height: 56px;
    justify-content: center;

    &:hover {
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.md};
    }

    &.active {
      box-shadow: ${theme.shadows.lg};
    }
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryDark}
  );
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  min-height: 50px;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: ${theme.borderRadius.lg};
    min-height: 56px;
    width: 100%;
    justify-content: center;
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);

    &:hover {
      transform: translateY(-1px);
    }
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.lg};
    align-items: stretch;
    padding: ${theme.spacing.xl};
    margin: 0 -${theme.spacing.xs} ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.lg};
  }
`;

const ResultsCount = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;

  .count {
    color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.7rem;
    font-weight: 700;
    text-align: center;
  }
`;

const SortControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
    flex-wrap: wrap;
    gap: ${theme.spacing.lg};
  }
`;

const SortLabel = styled.span`
  color: ${theme.colors.gray600};
  font-weight: 500;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
    padding: 0 ${theme.spacing.xs};
  }
`;

const NoRoomsMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};

  h3 {
    font-size: 1.5rem;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl};
    margin: 0 ${theme.spacing.xs};

    h3 {
      font-size: 1.7rem;
      font-weight: 700;
    }
  }

  p {
    color: ${theme.colors.gray600};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const ClearFiltersButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const RoomList = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get updated hotel data from Redux if available
  const hotels = useSelector(state => state.hotelManagement?.liveHotels || []);
  const [searchParams, setSearchParams] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
  });
  const [sortBy, setSortBy] = useState('price-low');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // First check if we have updated hotel data in Redux state
        const updatedHotel = hotels.find(h => h.slug === slug);

        if (updatedHotel) {
          // Use updated hotel data from Redux (includes admin changes)
          setHotel(updatedHotel);
        } else {
          // Fetch from API
          const response = await fetchHotelById(slug);
          if (response.success) {
            setHotel(response.data);
          } else {
            setHotel(null);
          }
        }
      } catch (error) {
        console.error('Error fetching hotel data:', error);
        setHotel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, hotels]);

  const handleSearchChange = e => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const getSortedRooms = () => {
    if (!hotel?.rooms) return [];

    let rooms = [...hotel.rooms];

    // Filter rooms
    if (filterBy !== 'all') {
      rooms = rooms.filter(
        room => room.type.toLowerCase() === filterBy.toLowerCase()
      );
    }

    // Sort rooms
    switch (sortBy) {
      case 'price-low':
        return rooms.sort((a, b) => a.price - b.price);
      case 'price-high':
        return rooms.sort((a, b) => b.price - a.price);
      case 'guests':
        return rooms.sort((a, b) => b.maxGuests - a.maxGuests);
      case 'name':
        return rooms.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return rooms;
    }
  };

  const handleSearch = () => {
    // Here you could implement availability checking
  };

  const clearFilters = () => {
    setFilterBy('all');
    setSortBy('price-low');
  };

  if (loading) {
    return (
      <PageContainer>
        <HotelNavbar />
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Loading...</h2>
          </div>
        </Container>
        <HotelFooter />
      </PageContainer>
    );
  }

  if (!hotel) {
    return (
      <PageContainer>
        <HotelNavbar />
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Hotel not found</h2>
            <p>The hotel you're looking for doesn't exist.</p>
          </div>
        </Container>
        <HotelFooter />
      </PageContainer>
    );
  }

  const sortedRooms = getSortedRooms();
  const uniqueRoomTypes = [
    ...new Set(hotel.rooms?.map(room => room.type) || []),
  ];
  console.log(hotel);

  return (
    <PageContainer>
      <HotelNavbar />

      <Container>
        <BackButton onClick={() => navigate(`/${hotel.slug}`)}>
          <FaArrowLeft />
          Back to Hotel
        </BackButton>

        <PageHeader>
          <HotelInfo>
            <HotelDetails>
              <HotelName>{hotel.name}</HotelName>
              <HotelLocation>
                <FaMapMarkerAlt />
                {hotel.location}
              </HotelLocation>
              <HotelRating>
                <FaStar style={{ color: '#fbbf24' }} />
                {hotel.rating}/5 ({hotel.starRating} Star Hotel)
              </HotelRating>
            </HotelDetails>
            <HotelImage image={hotel.image} />
          </HotelInfo>
        </PageHeader>

        <BookingControls>
          <ControlsGrid>
            <FormGroup>
              <Label htmlFor="checkIn">Check-in Date</Label>
              <Input
                type="date"
                id="checkIn"
                name="checkIn"
                value={searchParams.checkIn}
                onChange={handleSearchChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="checkOut">Check-out Date</Label>
              <Input
                type="date"
                id="checkOut"
                name="checkOut"
                value={searchParams.checkOut}
                onChange={handleSearchChange}
                min={
                  searchParams.checkIn || new Date().toISOString().split('T')[0]
                }
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="guests">Guests</Label>
              <Select
                id="guests"
                name="guests"
                value={searchParams.guests}
                onChange={handleSearchChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>
                    {num} Guest{num > 1 ? 's' : ''}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FilterButton
              className={filterBy !== 'all' ? 'active' : ''}
              onClick={() =>
                setFilterBy(
                  filterBy === 'all'
                    ? uniqueRoomTypes[0]?.toLowerCase() || 'all'
                    : 'all'
                )
              }
            >
              <FaFilter />
              Filter
            </FilterButton>

            <SearchButton onClick={handleSearch}>
              <FaSearch />
              Search
            </SearchButton>
          </ControlsGrid>
        </BookingControls>

        <ResultsHeader>
          <ResultsCount>
            <span className="count">{sortedRooms.length}</span> Room
            {sortedRooms.length !== 1 ? 's' : ''} Available
          </ResultsCount>

          <SortControls>
            <SortLabel>Sort by:</SortLabel>
            <Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="guests">Max Guests</option>
              <option value="name">Room Name</option>
            </Select>

            {uniqueRoomTypes.length > 1 && (
              <>
                <SortLabel>Filter:</SortLabel>
                <Select
                  value={filterBy}
                  onChange={e => setFilterBy(e.target.value)}
                >
                  <option value="all">All Room Types</option>
                  {uniqueRoomTypes.map(type => (
                    <option key={type} value={type.toLowerCase()}>
                      {type} Rooms
                    </option>
                  ))}
                </Select>
              </>
            )}
          </SortControls>
        </ResultsHeader>

        {sortedRooms.length > 0 ? (
          <RoomsGrid>
            {sortedRooms.map(room => (
              <RoomCard
                key={room.id}
                room={room}
                hotelId={hotel.id}
                hotelSlug={hotel.slug}
              />
            ))}
          </RoomsGrid>
        ) : (
          <NoRoomsMessage>
            <h3>No rooms found</h3>
            <p>
              No rooms match your current search criteria. Try adjusting your
              filters or dates.
            </p>
            <ClearFiltersButton onClick={clearFilters}>
              Clear Filters
            </ClearFiltersButton>
          </NoRoomsMessage>
        )}
      </Container>

      <HotelFooter />
    </PageContainer>
  );
};

export default RoomList;
