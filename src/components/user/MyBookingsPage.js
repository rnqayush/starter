import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaUsers, FaEye, FaTimes } from 'react-icons/fa';
import Header from '../shared/Header';
import { Button } from '../shared/Button';
import { Card, CardContent, Badge } from '../shared/Card';
import { theme } from '../../styles/GlobalStyle';
import { useAppContext } from '../../context/AppContext';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.xxl};
  color: ${theme.colors.gray900};
  text-align: center;
`;

const BookingsGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.xl};
`;

const BookingCard = styled(Card)`
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
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

const HotelName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
`;

const RoomName = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.md};
  font-weight: 500;
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
`;

const BookingFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    align-items: stretch;
  }
`;

const BookingActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: space-between;
  }
`;

const TotalPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray600};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${theme.spacing.lg};
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray700};
`;

const EmptyMessage = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: ${theme.spacing.xl};
`;

const FilterTabs = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xxl};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const FilterTab = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  background: none;
  color: ${props =>
    props.active ? theme.colors.primary : theme.colors.gray600};
  border-bottom: 2px solid
    ${props => (props.active ? theme.colors.primary : 'transparent')};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const MyBookingsPage = () => {
  const { bookings, setBookings } = useAppContext();
  const [filter, setFilter] = useState('all');

  const userBookings = bookings.filter(
    booking => booking.userId === 'current-user'
  );

  const filteredBookings = userBookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const handleCancelBooking = bookingId => {
    setBookings(
      bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      )
    );
  };

  const getStatusVariant = status => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const getFilterCounts = () => {
    return {
      all: userBookings.length,
      pending: userBookings.filter(b => b.status === 'pending').length,
      confirmed: userBookings.filter(b => b.status === 'confirmed').length,
      cancelled: userBookings.filter(b => b.status === 'cancelled').length,
    };
  };

  const counts = getFilterCounts();

  if (userBookings.length === 0) {
    return (
      <PageContainer>
        <Header />
        <Container>
          <PageTitle>My Bookings</PageTitle>
          <Card>
            <EmptyState>
              <EmptyIcon>🏨</EmptyIcon>
              <EmptyTitle>No Bookings Yet</EmptyTitle>
              <EmptyMessage>
                You haven't made any hotel bookings yet. Start exploring our
                amazing hotels and make your first booking!
              </EmptyMessage>
              <Button as="a" href="/" size="large">
                Browse Hotels
              </Button>
            </EmptyState>
          </Card>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header />

      <Container>
        <PageTitle>My Bookings</PageTitle>

        <FilterTabs>
          <FilterTab active={filter === 'all'} onClick={() => setFilter('all')}>
            All ({counts.all})
          </FilterTab>
          <FilterTab
            active={filter === 'pending'}
            onClick={() => setFilter('pending')}
          >
            Pending ({counts.pending})
          </FilterTab>
          <FilterTab
            active={filter === 'confirmed'}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed ({counts.confirmed})
          </FilterTab>
          <FilterTab
            active={filter === 'cancelled'}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled ({counts.cancelled})
          </FilterTab>
        </FilterTabs>

        <BookingsGrid>
          {filteredBookings.map(booking => (
            <BookingCard key={booking.id}>
              <CardContent>
                <BookingHeader>
                  <BookingInfo>
                    <HotelName>{booking.hotelName}</HotelName>
                    <RoomName>{booking.roomName}</RoomName>
                  </BookingInfo>
                  <Badge variant={getStatusVariant(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </Badge>
                </BookingHeader>

                <BookingDetails>
                  <DetailItem>
                    <FaCalendarAlt />
                    <div>
                      <div style={{ fontWeight: '500' }}>Check-in</div>
                      <div>{formatDate(booking.checkIn)}</div>
                    </div>
                  </DetailItem>
                  <DetailItem>
                    <FaCalendarAlt />
                    <div>
                      <div style={{ fontWeight: '500' }}>Check-out</div>
                      <div>{formatDate(booking.checkOut)}</div>
                    </div>
                  </DetailItem>
                  <DetailItem>
                    <FaUsers />
                    <div>
                      <div style={{ fontWeight: '500' }}>Guests</div>
                      <div>
                        {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                      </div>
                    </div>
                  </DetailItem>
                  <DetailItem>
                    <FaCalendarAlt />
                    <div>
                      <div style={{ fontWeight: '500' }}>Duration</div>
                      <div>
                        {calculateNights(booking.checkIn, booking.checkOut)}{' '}
                        night
                        {calculateNights(booking.checkIn, booking.checkOut) > 1
                          ? 's'
                          : ''}
                      </div>
                    </div>
                  </DetailItem>
                </BookingDetails>

                {booking.specialRequests && (
                  <div
                    style={{
                      marginBottom: theme.spacing.lg,
                      padding: theme.spacing.md,
                      background: theme.colors.gray50,
                      borderRadius: theme.borderRadius.md,
                    }}
                  >
                    <strong>Special Requests:</strong> {booking.specialRequests}
                  </div>
                )}

                <BookingFooter>
                  <TotalPrice>
                    Total: ₹{booking.totalPrice.toLocaleString()}
                  </TotalPrice>
                  <BookingActions>
                    {booking.status === 'pending' && (
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        <FaTimes />
                        Cancel
                      </Button>
                    )}
                    <Button variant="outline" size="small">
                      <FaEye />
                      View Details
                    </Button>
                  </BookingActions>
                </BookingFooter>
              </CardContent>
            </BookingCard>
          ))}
        </BookingsGrid>
      </Container>
    </PageContainer>
  );
};

export default MyBookingsPage;
