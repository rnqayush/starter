import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaHotel,
  FaBed,
  FaCalendarCheck,
  FaEye,
  FaPlus,
  FaEdit,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import AddHotelPageContent from './AddHotelPageContent';
import MyHotelsPageContent from './MyHotelsPageContent';
import AddRoomPageContent from './AddRoomPageContent';
import BookingsReceivedPageContent from './BookingsReceivedPageContent';
import ProfileSettingsPageContent from './ProfileSettingsPageContent';
import { Card, CardContent, Badge } from '../shared/Card';
import { Button } from '../shared/Button';
import { theme, media } from '../../styles/GlobalStyle';
import { useAppContext } from '../../context/AppContext';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 17.5rem;
  padding: ${theme.spacing.xxl};

  ${media.tabletDown} {
    margin-left: 0;
    padding: ${theme.spacing.xl} ${theme.spacing.md};
    padding-top: 5rem;
  }

  ${media.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
    padding-top: 4rem;
    background: ${theme.colors.gray50};
  }

  ${media.desktop} {
    padding: ${theme.spacing.xxl} ${theme.spacing.xl};
  }
`;

const DashboardHeader = styled.div`
  margin-bottom: ${theme.spacing.xxl};

  ${media.mobile} {
    margin-bottom: ${theme.spacing.xl};
    text-align: center;
  }

  ${media.tablet} {
    margin-bottom: ${theme.spacing.xxl};
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryDark}
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;

  ${media.mobile} {
    font-size: 2rem;
    text-align: center;
    color: ${theme.colors.gray900};
    background: none;
    -webkit-text-fill-color: unset;
  }

  ${media.tablet} {
    font-size: 2.125rem;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${theme.colors.gray600};
  line-height: 1.6;

  ${media.mobile} {
    font-size: 1.1rem;
    text-align: center;
    padding: 0 ${theme.spacing.sm};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15.625rem, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.xl};
  }

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.lg};
  }

  ${media.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled(Card)`
  background: ${props => props.color || theme.colors.white};
  color: ${props => props.textColor || theme.colors.gray900};
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary};
  }

  ${media.mobile} {
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const StatIcon = styled.div.withConfig({
  shouldForwardProp: prop => !['iconBg', 'iconColor'].includes(prop),
})`
  width: 3.75rem;
  height: 3.75rem;
  border-radius: ${theme.borderRadius.lg};
  background: ${props => props.iconBg || theme.colors.primary}20;
  color: ${props => props.iconColor || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.md};
  flex-shrink: 0;
  transition: all 0.3s ease;

  ${media.mobile} {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
    margin: 0 auto ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.md};
  }

  ${media.tablet} {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.375rem;
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.xs};
  line-height: 1;

  ${media.mobile} {
    font-size: 1.75rem;
    text-align: center;
    color: ${theme.colors.primary};
  }

  ${media.tablet} {
    font-size: 2.25rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.8;
  line-height: 1.3;
  font-weight: 500;

  ${media.mobile} {
    font-size: 0.85rem;
    text-align: center;
    font-weight: 600;
    opacity: 0.9;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.gray900};

  ${media.mobile} {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: ${theme.spacing.lg};
    padding: 0 ${theme.spacing.sm};
  }
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.xl};
  }

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.lg};
  }
`;

const ActionCard = styled(Card)`
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary};
  }

  ${media.mobile} {
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const ActionIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto ${theme.spacing.lg};
  transition: all 0.3s ease;

  ${media.mobile} {
    width: 50px;
    height: 50px;
    font-size: 1.3rem;
    margin: 0 auto ${theme.spacing.md};
  }
`;

const ActionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
  line-height: 1.3;

  ${media.mobile} {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: ${theme.spacing.xs};
  }
`;

const ActionDescription = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.5;

  ${media.mobile} {
    font-size: 0.85rem;
    margin-bottom: ${theme.spacing.md};
    display: none;
  }
`;

const RecentBookingsSection = styled.section`
  margin-bottom: ${theme.spacing.xxl};
`;

const BookingsTable = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};

  ${media.mobile} {
    margin: 0 -${theme.spacing.xs};
    border-radius: ${theme.borderRadius.md};
  }
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  font-weight: 600;
  color: ${theme.colors.gray700};
  border-bottom: 1px solid ${theme.colors.gray200};

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray100};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.lg};
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius.md};
    margin-bottom: ${theme.spacing.sm};
    box-shadow: ${theme.shadows.sm};
  }
`;

const BookingInfo = styled.div`
  ${media.mobile} {
    text-align: center;
    margin-bottom: ${theme.spacing.sm};
  }
`;

const GuestName = styled.div`
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.gray900};

  ${media.mobile} {
    font-size: 1.1rem;
    margin-bottom: ${theme.spacing.sm};
  }
`;

const HotelRoom = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.gray600};

  ${media.mobile} {
    font-size: 1rem;
  }
`;

const MobileBookingDetails = styled.div`
  display: none;

  ${media.mobile} {
    display: flex;
    justify-content: space-around;
    padding: ${theme.spacing.sm} 0;
    border-top: 1px solid ${theme.colors.gray100};
    margin-top: ${theme.spacing.sm};
    font-size: 0.9rem;

    .detail {
      text-align: center;

      .label {
        color: ${theme.colors.gray500};
        font-size: 0.8rem;
        margin-bottom: 2px;
      }

      .value {
        font-weight: 600;
        color: ${theme.colors.gray900};
      }
    }
  }
`;

const PageContent = styled.div`
  width: 100%;
`;

const OwnerDashboard = () => {
  const { ownerHotels, bookings } = useAppContext();
  const [activeSection, setActiveSection] = useState('dashboard');

  const ownerBookings = bookings.filter(booking =>
    ownerHotels.some(hotel => hotel.id === booking.hotelId)
  );

  const stats = {
    totalHotels: ownerHotels.length,
    totalRooms: ownerHotels.reduce((sum, hotel) => sum + hotel.totalRooms, 0),
    totalBookings: ownerBookings.length,
    pendingBookings: ownerBookings.filter(b => b.status === 'pending').length,
  };

  const recentBookings = ownerBookings.slice(0, 5);

  const quickActions = [
    {
      title: 'Add New Hotel',
      description: 'Register a new hotel property with rooms and amenities',
      icon: FaHotel,
      action: () => setActiveSection('add-hotel'),
    },
    {
      title: 'Manage Hotel Content',
      description:
        'Edit hotel information, gallery, amenities and website content',
      icon: FaEdit,
      action: () => setActiveSection('my-hotels'),
    },
    {
      title: 'Add Rooms',
      description: 'Add new rooms to your existing hotel properties',
      icon: FaBed,
      action: () => setActiveSection('my-hotels'),
    },
    {
      title: 'Manage Bookings',
      description: 'Review and manage all incoming booking requests',
      icon: FaCalendarCheck,
      action: () => setActiveSection('bookings'),
    },
  ];

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
    });
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

  const renderContent = () => {
    switch (activeSection) {
      case 'add-hotel':
        return (
          <PageContent>
            <AddHotelPageContent />
          </PageContent>
        );
      case 'my-hotels':
        return (
          <PageContent>
            <MyHotelsPageContent setActiveSection={setActiveSection} />
          </PageContent>
        );
      case 'add-room':
        return (
          <PageContent>
            <AddRoomPageContent setActiveSection={setActiveSection} />
          </PageContent>
        );
      case 'bookings':
        return (
          <PageContent>
            <BookingsReceivedPageContent />
          </PageContent>
        );
      case 'profile':
        return (
          <PageContent>
            <ProfileSettingsPageContent />
          </PageContent>
        );
      default:
        return (
          <>
            <DashboardHeader>
              <WelcomeTitle>Welcome Back!</WelcomeTitle>
              <WelcomeSubtitle>
                Here's what's happening with your hotels today
              </WelcomeSubtitle>
            </DashboardHeader>

            <StatsGrid>
              <StatCard>
                <CardContent>
                  <StatIcon
                    iconBg={`${theme.colors.primary}20`}
                    iconColor={theme.colors.primary}
                  >
                    <FaHotel />
                  </StatIcon>
                  <StatValue>{stats.totalHotels}</StatValue>
                  <StatLabel>Total Hotels</StatLabel>
                </CardContent>
              </StatCard>

              <StatCard>
                <CardContent>
                  <StatIcon
                    iconBg={`${theme.colors.success}20`}
                    iconColor={theme.colors.success}
                  >
                    <FaBed />
                  </StatIcon>
                  <StatValue>{stats.totalRooms}</StatValue>
                  <StatLabel>Total Rooms</StatLabel>
                </CardContent>
              </StatCard>

              <StatCard>
                <CardContent>
                  <StatIcon
                    iconBg={`${theme.colors.accent}20`}
                    iconColor={theme.colors.accent}
                  >
                    <FaCalendarCheck />
                  </StatIcon>
                  <StatValue>{stats.totalBookings}</StatValue>
                  <StatLabel>Total Bookings</StatLabel>
                </CardContent>
              </StatCard>

              <StatCard>
                <CardContent>
                  <StatIcon
                    iconBg={`${theme.colors.warning}20`}
                    iconColor={theme.colors.warning}
                  >
                    <FaEye />
                  </StatIcon>
                  <StatValue>{stats.pendingBookings}</StatValue>
                  <StatLabel>Pending Bookings</StatLabel>
                </CardContent>
              </StatCard>
            </StatsGrid>

            <SectionTitle>Quick Actions</SectionTitle>
            <QuickActionsGrid>
              {quickActions.map(action => (
                <ActionCard key={action.title} onClick={action.action}>
                  <CardContent>
                    <ActionIcon>
                      <action.icon />
                    </ActionIcon>
                    <ActionTitle>{action.title}</ActionTitle>
                    <ActionDescription>{action.description}</ActionDescription>
                    <Button variant="secondary">
                      <FaPlus />
                      Get Started
                    </Button>
                  </CardContent>
                </ActionCard>
              ))}
            </QuickActionsGrid>

            <RecentBookingsSection>
              <SectionTitle>Recent Bookings</SectionTitle>
              <BookingsTable>
                <TableHeader>
                  <div>Guest & Hotel</div>
                  <div>Check-in</div>
                  <div>Check-out</div>
                  <div>Status</div>
                  <div>Actions</div>
                </TableHeader>

                {recentBookings.length > 0 ? (
                  recentBookings.map(booking => (
                    <TableRow key={booking.id}>
                      <BookingInfo>
                        <GuestName>{booking.guestName}</GuestName>
                        <HotelRoom>
                          {booking.hotelName} - {booking.roomName}
                        </HotelRoom>
                      </BookingInfo>
                      <div className="desktop-only">
                        {formatDate(booking.checkIn)}
                      </div>
                      <div className="desktop-only">
                        {formatDate(booking.checkOut)}
                      </div>
                      <div className="desktop-only">
                        <Badge variant={getStatusVariant(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="desktop-only">
                        <Button variant="outline" size="small">
                          <FaEye />
                          View
                        </Button>
                      </div>

                      <MobileBookingDetails>
                        <div className="detail">
                          <div className="label">Check-in</div>
                          <div className="value">{formatDate(booking.checkIn)}</div>
                        </div>
                        <div className="detail">
                          <div className="label">Check-out</div>
                          <div className="value">
                            {formatDate(booking.checkOut)}
                          </div>
                        </div>
                        <div className="detail">
                          <div className="label">Status</div>
                          <div className="value">
                            <Badge variant={getStatusVariant(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </MobileBookingDetails>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <div
                      style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        color: theme.colors.gray600,
                        padding: theme.spacing.xxl,
                      }}
                    >
                      No bookings yet. Start by adding your first hotel!
                    </div>
                  </TableRow>
                )}
              </BookingsTable>
            </RecentBookingsSection>
          </>
        );
    }
  };

  return (
    <DashboardContainer>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <MainContent>
        {renderContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default OwnerDashboard;
