import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaEye,
  FaPhone,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import HotelNavbar from '../components/HotelNavbar';
import HotelFooter from '../components/HotelFooter';
import { bookings, fetchHotelBookings } from '../../DummyData/hotels';

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
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xxl};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const FilterTab = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  background: none;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-weight: 600;
  color: ${props =>
    props.active ? theme.colors.primary : theme.colors.gray600};
  border-bottom: 3px solid
    ${props => (props.active ? theme.colors.primary : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const BookingsGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.xl};
`;

const BookingCard = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'status',
})`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  border-left: 4px solid
    ${props =>
      props.status === 'confirmed'
        ? theme.colors.success
        : props.status === 'pending'
          ? theme.colors.warning
          : theme.colors.error};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const BookingInfo = styled.div`
  flex: 1;
`;

const BookingActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const HotelName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const RoomName = styled.p`
  color: ${theme.colors.gray600};
  font-size: 1rem;
  margin-bottom: ${theme.spacing.md};
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: prop => prop !== 'status',
})`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props =>
    props.status === 'confirmed'
      ? theme.colors.success
      : props.status === 'pending'
        ? theme.colors.warning
        : theme.colors.error};
  color: ${theme.colors.white};
`;

const BookingDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray700};

  .icon {
    color: ${theme.colors.primary};
  }

  .label {
    font-weight: 600;
    margin-right: ${theme.spacing.xs};
  }
`;

const BookingFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.md};
  }
`;

const TotalPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'variant',
})`
  background: ${props =>
    props.variant === 'primary' ? theme.colors.primary : theme.colors.white};
  color: ${props =>
    props.variant === 'primary' ? theme.colors.white : theme.colors.gray700};
  border: 2px solid
    ${props =>
      props.variant === 'primary'
        ? theme.colors.primary
        : theme.colors.gray200};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray600};

  .icon {
    font-size: 4rem;
    color: ${theme.colors.gray300};
    margin-bottom: ${theme.spacing.lg};
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.gray900};
  }

  p {
    font-size: 1rem;
    margin-bottom: ${theme.spacing.xl};
  }
`;

const BrowseButton = styled(Link)`
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

const MyBookings = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user bookings - simulating API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call to fetch user bookings
        const mockUserId = 'user123'; // In real app, this would come from auth context
        const bookingsData = await fetchHotelBookings(mockUserId);
        setUserBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        // Fallback to all bookings for demo
        setUserBookings(bookings);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusIcon = status => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle />;
      case 'pending':
        return <FaExclamationTriangle />;
      case 'cancelled':
        return <FaTimesCircle />;
      default:
        return <FaClock />;
    }
  };

  const filteredBookings = userBookings.filter(booking => {
    if (activeFilter === 'all') return true;
    return booking.status === activeFilter;
  });

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleContactHotel = booking => {
    alert(
      `Contact information for ${booking.hotelName}:\nPhone: +91 1800-HOTELS\nEmail: info@${booking.hotelName.toLowerCase().replace(/\s+/g, '')}.com`
    );
  };

  const handleViewDetails = booking => {
    alert(
      `Booking Details:\nBooking ID: ${booking.id}\nGuest: ${booking.guestName}\nEmail: ${booking.guestEmail}\nPhone: ${booking.guestPhone}\nSpecial Requests: ${booking.specialRequests || 'None'}`
    );
  };

  if (loading) {
    return (
      <PageContainer>
        <HotelNavbar />
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Loading your bookings...</h2>
          </div>
        </Container>
        <HotelFooter />
      </PageContainer>
    );
  }

  if (filteredBookings.length === 0) {
    return (
      <PageContainer>
        <HotelNavbar />

        <Container>
          <PageHeader>
            <PageTitle>My Bookings</PageTitle>
            <PageSubtitle>Manage your hotel reservations</PageSubtitle>
          </PageHeader>

          <FilterTabs>
            <FilterTab
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            >
              All Bookings
            </FilterTab>
            <FilterTab
              active={activeFilter === 'confirmed'}
              onClick={() => setActiveFilter('confirmed')}
            >
              Confirmed
            </FilterTab>
            <FilterTab
              active={activeFilter === 'pending'}
              onClick={() => setActiveFilter('pending')}
            >
              Pending
            </FilterTab>
            <FilterTab
              active={activeFilter === 'cancelled'}
              onClick={() => setActiveFilter('cancelled')}
            >
              Cancelled
            </FilterTab>
          </FilterTabs>

          <EmptyState>
            <FaCalendarAlt className="icon" />
            <h3>No bookings found</h3>
            <p>
              {activeFilter === 'all'
                ? "You haven't made any hotel bookings yet. Start exploring amazing hotels!"
                : `No ${activeFilter} bookings found. Try a different filter.`}
            </p>
            {activeFilter === 'all' && (
              <BrowseButton to="/hotels">Browse Hotels</BrowseButton>
            )}
          </EmptyState>
        </Container>

        <HotelFooter />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <HotelNavbar />

      <Container>
        <PageHeader>
          <PageTitle>My Bookings</PageTitle>
          <PageSubtitle>Manage your hotel reservations</PageSubtitle>
        </PageHeader>

        <FilterTabs>
          <FilterTab
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          >
            All Bookings ({userBookings.length})
          </FilterTab>
          <FilterTab
            active={activeFilter === 'confirmed'}
            onClick={() => setActiveFilter('confirmed')}
          >
            Confirmed (
            {userBookings.filter(b => b.status === 'confirmed').length})
          </FilterTab>
          <FilterTab
            active={activeFilter === 'pending'}
            onClick={() => setActiveFilter('pending')}
          >
            Pending ({userBookings.filter(b => b.status === 'pending').length})
          </FilterTab>
          <FilterTab
            active={activeFilter === 'cancelled'}
            onClick={() => setActiveFilter('cancelled')}
          >
            Cancelled (
            {userBookings.filter(b => b.status === 'cancelled').length})
          </FilterTab>
        </FilterTabs>

        <BookingsGrid>
          {filteredBookings.map(booking => (
            <BookingCard key={booking.id} status={booking.status}>
              <BookingHeader>
                <BookingInfo>
                  <HotelName>{booking.hotelName}</HotelName>
                  <RoomName>{booking.roomName}</RoomName>
                </BookingInfo>
                <BookingActions>
                  <StatusBadge status={booking.status}>
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </StatusBadge>
                </BookingActions>
              </BookingHeader>

              <BookingDetails>
                <DetailItem>
                  <FaCalendarAlt className="icon" />
                  <span>
                    <span className="label">Check-in:</span>
                    {formatDate(booking.checkIn)}
                  </span>
                </DetailItem>

                <DetailItem>
                  <FaCalendarAlt className="icon" />
                  <span>
                    <span className="label">Check-out:</span>
                    {formatDate(booking.checkOut)}
                  </span>
                </DetailItem>

                <DetailItem>
                  <FaUsers className="icon" />
                  <span>
                    <span className="label">Guests:</span>
                    {booking.guests}
                  </span>
                </DetailItem>

                <DetailItem>
                  <FaClock className="icon" />
                  <span>
                    <span className="label">Nights:</span>
                    {calculateNights(booking.checkIn, booking.checkOut)}
                  </span>
                </DetailItem>
              </BookingDetails>

              <BookingFooter>
                <TotalPrice>
                  Total: ₹{booking.totalPrice.toLocaleString()}
                </TotalPrice>

                <div style={{ display: 'flex', gap: theme.spacing.md }}>
                  <ActionButton onClick={() => handleViewDetails(booking)}>
                    <FaEye />
                    View Details
                  </ActionButton>

                  <ActionButton onClick={() => handleContactHotel(booking)}>
                    <FaPhone />
                    Contact Hotel
                  </ActionButton>
                </div>
              </BookingFooter>
            </BookingCard>
          ))}
        </BookingsGrid>
      </Container>

      <HotelFooter />
    </PageContainer>
  );
};

export default MyBookings;
