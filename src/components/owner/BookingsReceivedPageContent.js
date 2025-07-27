import styled from 'styled-components';
import {
  FaCheck,
  FaTimes,
  FaEye,
  FaCalendarAlt,
  FaUsers,
} from 'react-icons/fa';
import { Card, CardContent, Badge } from '../shared/Card';
import { Button } from '../shared/Button';
import { theme } from '../../styles/GlobalStyle';
import { useAppContext } from '../../context/AppContext';

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.xxl};
  color: ${theme.colors.gray900};
`;

const BookingsTable = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  font-weight: 600;
  color: ${theme.colors.gray700};
  border-bottom: 1px solid ${theme.colors.gray200};

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto;
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray100};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const BookingInfo = styled.div``;

const GuestName = styled.div`
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.gray900};
`;

const ContactInfo = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xs};
`;

const HotelRoom = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.gray600};
`;

const BookingActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: space-between;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray600};
`;

const BookingsReceivedPageContent = () => {
  const { bookings, setBookings, ownerHotels } = useAppContext();

  const ownerBookings = bookings.filter(booking =>
    ownerHotels.some(hotel => hotel.id === booking.hotelId)
  );

  const handleBookingAction = (bookingId, action) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId ? { ...booking, status: action } : booking
      )
    );
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusVariant = status => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  if (ownerBookings.length === 0) {
    return (
      <>
        <PageTitle>Bookings Received</PageTitle>
        <Card>
          <EmptyState>
            <div
              style={{
                fontSize: '4rem',
                marginBottom: theme.spacing.lg,
                opacity: 0.5,
              }}
            >
              📅
            </div>
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                marginBottom: theme.spacing.md,
                color: theme.colors.gray700,
              }}
            >
              No Bookings Yet
            </h3>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>
              You haven't received any booking requests yet. Once customers book
              your rooms, they'll appear here.
            </p>
          </EmptyState>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageTitle>Bookings Received</PageTitle>

      <BookingsTable>
        <TableHeader>
          <div>Guest & Contact</div>
          <div>Hotel & Room</div>
          <div>Check-in</div>
          <div>Check-out</div>
          <div>Status</div>
          <div>Actions</div>
        </TableHeader>

        {ownerBookings.map(booking => (
          <TableRow key={booking.id}>
            <BookingInfo>
              <GuestName>{booking.guestName}</GuestName>
              <ContactInfo>{booking.guestEmail}</ContactInfo>
              <ContactInfo>{booking.guestPhone}</ContactInfo>
            </BookingInfo>
            <div>
              <HotelRoom>
                <strong>{booking.hotelName}</strong>
                <br />
                {booking.roomName}
              </HotelRoom>
            </div>
            <div>{formatDate(booking.checkIn)}</div>
            <div>{formatDate(booking.checkOut)}</div>
            <div>
              <Badge variant={getStatusVariant(booking.status)}>
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </Badge>
            </div>
            <BookingActions>
              {booking.status === 'pending' && (
                <>
                  <Button
                    variant="success"
                    size="small"
                    onClick={() => handleBookingAction(booking.id, 'confirmed')}
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleBookingAction(booking.id, 'rejected')}
                  >
                    <FaTimes />
                  </Button>
                </>
              )}
              <Button variant="outline" size="small">
                <FaEye />
              </Button>
            </BookingActions>
          </TableRow>
        ))}
      </BookingsTable>
    </>
  );
};

export default BookingsReceivedPageContent;
