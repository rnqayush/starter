import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaBed, FaEye } from 'react-icons/fa';
import {
  Card,
  CardImage,
  CardContent,
  CardTitle,
  CardSubtitle,
  Badge,
  CardActions,
} from '../shared/Card';
import { Button } from '../shared/Button';
import { theme } from '../../styles/GlobalStyle';
import { useAppContext } from '../../context/AppContext';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.lg};
    align-items: stretch;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
`;

const HotelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

const HotelCard = styled(Card)``;

const HotelInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const HotelDetails = styled.div`
  flex: 1;
`;

const HotelStats = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  font-size: 0.875rem;
  color: ${theme.colors.gray600};
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
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

const MyHotelsPageContent = ({ setActiveSection }) => {
  const { ownerHotels, setOwnerHotels } = useAppContext();

  const handleDeleteHotel = hotelId => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      setOwnerHotels(prev => prev.filter(hotel => hotel.id !== hotelId));
    }
  };

  if (ownerHotels.length === 0) {
    return (
      <>
        <PageHeader>
          <PageTitle>My Hotels</PageTitle>
          <Button onClick={() => setActiveSection('add-hotel')} size="large">
            <FaPlus />
            Add New Hotel
          </Button>
        </PageHeader>

        <Card>
          <EmptyState>
            <EmptyIcon>🏨</EmptyIcon>
            <EmptyTitle>No Hotels Added Yet</EmptyTitle>
            <EmptyMessage>
              Start by adding your first hotel property. You can add rooms and
              manage bookings once your hotel is created.
            </EmptyMessage>
            <Button onClick={() => setActiveSection('add-hotel')} size="large">
              <FaPlus />
              Add Your First Hotel
            </Button>
          </EmptyState>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader>
        <PageTitle>My Hotels</PageTitle>
        <Button onClick={() => setActiveSection('add-hotel')} size="large">
          <FaPlus />
          Add New Hotel
        </Button>
      </PageHeader>

      <HotelsGrid>
        {ownerHotels.map(hotel => (
          <HotelCard key={hotel.id}>
            <CardImage src={hotel.image} height="200px" />
            <CardContent>
              <HotelInfo>
                <HotelDetails>
                  <CardTitle>{hotel.name}</CardTitle>
                  <CardSubtitle>{hotel.location}</CardSubtitle>
                </HotelDetails>
                <Badge
                  variant={hotel.status === 'active' ? 'success' : 'warning'}
                >
                  {hotel.status}
                </Badge>
              </HotelInfo>

              <HotelStats>
                <StatItem>
                  <FaBed />
                  {hotel.totalRooms} rooms
                </StatItem>
                <StatItem>
                  <FaEye />
                  {hotel.totalBookings} bookings
                </StatItem>
              </HotelStats>

              <CardActions>
                <Button
                  onClick={() => setActiveSection('add-room')}
                  variant="secondary"
                  size="small"
                >
                  <FaBed />
                  Manage Rooms
                </Button>
                <Button variant="outline" size="small">
                  <FaEdit />
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => handleDeleteHotel(hotel.id)}
                >
                  <FaTrash />
                </Button>
              </CardActions>
            </CardContent>
          </HotelCard>
        ))}
      </HotelsGrid>
    </>
  );
};

export default MyHotelsPageContent;
