import React from "react";
import styled from "styled-components";
import { FaHotel, FaBed, FaCalendarCheck, FaEye, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Card, CardContent, Badge } from "../shared/Card";
import { Button } from "../shared/Button";
import { theme, media } from "../../styles/GlobalStyle";
import { useAppContext } from "../../context/AppContext";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: 0;
    padding: ${theme.spacing.xl} ${theme.spacing.md};
    padding-top: 80px;
  }
`;

const DashboardHeader = styled.div`
  margin-bottom: ${theme.spacing.xxl};
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${theme.colors.gray600};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};
`;

const StatCard = styled(Card)`
  background: ${(props) => props.color || theme.colors.white};
  color: ${(props) => props.textColor || theme.colors.gray900};
`;

const StatIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !["iconBg", "iconColor"].includes(prop),
})`
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.lg};
  background: ${(props) => props.iconBg || theme.colors.primary}20;
  color: ${(props) => props.iconColor || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.md};
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.8;
  font-weight: 500;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.gray900};
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};
`;

const ActionCard = styled(Card)`
  text-align: center;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
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
`;

const ActionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
`;

const ActionDescription = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.5;
`;

const RecentBookingsSection = styled.section`
  margin-bottom: ${theme.spacing.xxl};
`;

const BookingsTable = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
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
    padding: ${theme.spacing.md};
  }
`;

const BookingInfo = styled.div``;

const GuestName = styled.div`
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.gray900};
`;

const HotelRoom = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.gray600};
`;

const OwnerDashboard = () => {
  const { ownerHotels, bookings } = useAppContext();

  const ownerBookings = bookings.filter((booking) =>
    ownerHotels.some((hotel) => hotel.id === booking.hotelId),
  );

  const stats = {
    totalHotels: ownerHotels.length,
    totalRooms: ownerHotels.reduce((sum, hotel) => sum + hotel.totalRooms, 0),
    totalBookings: ownerBookings.length,
    pendingBookings: ownerBookings.filter((b) => b.status === "pending").length,
  };

  const recentBookings = ownerBookings.slice(0, 5);

  const quickActions = [
    {
      title: "Add New Hotel",
      description: "Register a new hotel property with rooms and amenities",
      icon: FaHotel,
      link: "/owner/add-hotel",
    },
    {
      title: "Add Rooms",
      description: "Add new rooms to your existing hotel properties",
      icon: FaBed,
      link: "/owner/my-hotels",
    },
    {
      title: "Manage Bookings",
      description: "Review and manage all incoming booking requests",
      icon: FaCalendarCheck,
      link: "/owner/bookings",
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <DashboardContainer>
      <Sidebar />

      <MainContent>
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
          {quickActions.map((action) => (
            <Link key={action.title} to={action.link}>
              <ActionCard>
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
            </Link>
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
              recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <BookingInfo>
                    <GuestName>{booking.guestName}</GuestName>
                    <HotelRoom>
                      {booking.hotelName} - {booking.roomName}
                    </HotelRoom>
                  </BookingInfo>
                  <div>{formatDate(booking.checkIn)}</div>
                  <div>{formatDate(booking.checkOut)}</div>
                  <div>
                    <Badge variant={getStatusVariant(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <Button variant="outline" size="small">
                      <FaEye />
                      View
                    </Button>
                  </div>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <div
                  style={{
                    gridColumn: "1 / -1",
                    textAlign: "center",
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
      </MainContent>
    </DashboardContainer>
  );
};

export default OwnerDashboard;
