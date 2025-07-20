import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaRing,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaEye,
  FaHeart,
  FaHome,
  FaFilter,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { weddingVendors } from "../data/vendors";

const PageContainer = styled.div`
  min-height: 100vh;
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

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const StatCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  text-align: center;
  border-left: 4px solid ${(props) => props.color || theme.colors.primary};
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${theme.colors.gray600};
  font-weight: 500;
`;

const FiltersSection = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  margin-bottom: ${theme.spacing.xl};
`;

const FiltersRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray500};
  }
`;

const FilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  background: ${(props) => props.active ? theme.colors.primary : theme.colors.white};
  color: ${(props) => props.active ? theme.colors.white : theme.colors.gray700};
  border: 2px solid ${(props) => props.active ? theme.colors.primary : theme.colors.gray200};
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

const BookingsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const BookingCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
  border-left: 4px solid ${(props) => {
    switch (props.status) {
      case 'confirmed': return theme.colors.success;
      case 'pending': return theme.colors.warning;
      case 'cancelled': return theme.colors.error;
      default: return theme.colors.gray300;
    }
  }};
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const BookingInfo = styled.div`
  flex: 1;
`;

const BookingMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const BookingNumber = styled.div`
  font-family: monospace;
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 1.1rem;
  margin-bottom: ${theme.spacing.sm};
`;

const BookingStatus = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "status",
})`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) => {
    switch (props.status) {
      case 'confirmed': return theme.colors.success + '20';
      case 'pending': return theme.colors.warning + '20';
      case 'cancelled': return theme.colors.error + '20';
      default: return theme.colors.gray200;
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case 'confirmed': return theme.colors.success;
      case 'pending': return theme.colors.warning;
      case 'cancelled': return theme.colors.error;
      default: return theme.colors.gray600;
    }
  }};
`;

const BookingContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const VendorSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const VendorImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.md};
  object-fit: cover;
`;

const VendorInfo = styled.div`
  flex: 1;
`;

const VendorName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const VendorMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const BookingDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const DetailGroup = styled.div``;

const DetailLabel = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
  font-size: 0.9rem;
`;

const DetailValue = styled.div`
  color: ${theme.colors.gray700};
  font-size: 0.9rem;
`;

const BookingActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.gray200};
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "primary" && prop !== "danger",
})`
  background: ${(props) => 
    props.primary ? theme.colors.primary : 
    props.danger ? theme.colors.error : theme.colors.white};
  color: ${(props) => 
    props.primary || props.danger ? theme.colors.white : theme.colors.gray700};
  border: 2px solid ${(props) => 
    props.primary ? theme.colors.primary : 
    props.danger ? theme.colors.error : theme.colors.gray200};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-1px);
    background: ${(props) => 
      props.primary ? theme.colors.primaryDark : 
      props.danger ? theme.colors.error + 'dd' : theme.colors.gray50};
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

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Mock bookings data
  const mockBookings = [
    {
      id: "WED-123456",
      vendorId: "elegant-events",
      status: "confirmed",
      date: "2024-06-15",
      time: "3:00 PM",
      guestCount: 150,
      eventType: "Wedding",
      services: ["Wedding Planning", "Photography", "Catering"],
      createdAt: "2024-01-15",
      contactName: "John & Sarah Doe",
      email: "john.sarah@example.com",
      phone: "+1 (555) 123-4567",
      message: "Looking for a magical outdoor wedding experience",
    },
    {
      id: "WED-123457",
      vendorId: "capture-moments",
      status: "pending",
      date: "2024-08-22",
      time: "4:00 PM",
      guestCount: 80,
      eventType: "Engagement Party",
      services: ["Photography", "Videography"],
      createdAt: "2024-01-20",
      contactName: "Michael & Emma Smith",
      email: "michael.emma@example.com",
      phone: "+1 (555) 234-5678",
      message: "Intimate engagement celebration with close family",
    },
    {
      id: "WED-123458",
      vendorId: "floral-dreams",
      status: "cancelled",
      date: "2024-05-10",
      time: "2:00 PM",
      guestCount: 200,
      eventType: "Wedding",
      services: ["Floral Arrangements", "Venue Decoration"],
      createdAt: "2024-01-10",
      contactName: "David & Lisa Johnson",
      email: "david.lisa@example.com",
      phone: "+1 (555) 345-6789",
      message: "Traditional wedding with elegant floral arrangements",
    },
  ];

  useEffect(() => {
    setBookings(mockBookings);
    setFilteredBookings(mockBookings);
  }, []);

  useEffect(() => {
    let filtered = [...bookings];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.eventType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Sort bookings
    switch (sortBy) {
      case "date":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "created":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "status":
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter, sortBy]);

  const getVendorDetails = (vendorId) => {
    return weddingVendors.find(vendor => vendor.id === vendorId);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <FaCheckCircle />;
      case 'pending': return <FaExclamationCircle />;
      case 'cancelled': return <FaTimesCircle />;
      default: return <FaClock />;
    }
  };

  const handleViewBooking = (booking) => {
    const vendor = getVendorDetails(booking.vendorId);
    if (vendor) {
      navigate(`/weddings/booking-confirmation?booking=${booking.id}&vendor=${booking.vendorId}&name=${booking.contactName}&email=${booking.email}&phone=${booking.phone}&date=${booking.date}&time=${booking.time}&guests=${booking.guestCount}&type=${booking.eventType}&services=${booking.services.join(',')}&message=${booking.message}`);
    }
  };

  const handleViewVendor = (vendorId) => {
    navigate(`/${vendorId}`);
  };

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  return (
    <PageContainer>
      <NavHeader>
        <NavContent>
          <BackButton onClick={() => navigate("/weddings")}>
            <FaArrowLeft />
            Back to Vendors
          </BackButton>
          <PageTitle>
            <FaCalendarAlt />
            My Wedding Bookings
          </PageTitle>
        </NavContent>
      </NavHeader>

      <Container>
        <StatsGrid>
          <StatCard color={theme.colors.primary}>
            <StatNumber>{stats.total}</StatNumber>
            <StatLabel>Total Bookings</StatLabel>
          </StatCard>
          <StatCard color={theme.colors.success}>
            <StatNumber>{stats.confirmed}</StatNumber>
            <StatLabel>Confirmed</StatLabel>
          </StatCard>
          <StatCard color={theme.colors.warning}>
            <StatNumber>{stats.pending}</StatNumber>
            <StatLabel>Pending</StatLabel>
          </StatCard>
          <StatCard color={theme.colors.error}>
            <StatNumber>{stats.cancelled}</StatNumber>
            <StatLabel>Cancelled</StatLabel>
          </StatCard>
        </StatsGrid>

        <FiltersSection>
          <FiltersRow>
            <FilterGroup>
              <SearchInput
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FilterGroup>

            <FilterGroup>
              <FilterButton
                active={statusFilter === "all"}
                onClick={() => setStatusFilter("all")}
              >
                All Status
              </FilterButton>
              <FilterButton
                active={statusFilter === "confirmed"}
                onClick={() => setStatusFilter("confirmed")}
              >
                Confirmed
              </FilterButton>
              <FilterButton
                active={statusFilter === "pending"}
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </FilterButton>
              <FilterButton
                active={statusFilter === "cancelled"}
                onClick={() => setStatusFilter("cancelled")}
              >
                Cancelled
              </FilterButton>
            </FilterGroup>

            <FilterGroup>
              <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Sort by Event Date</option>
                <option value="created">Sort by Created Date</option>
                <option value="status">Sort by Status</option>
              </SortSelect>
            </FilterGroup>
          </FiltersRow>
        </FiltersSection>

        {filteredBookings.length > 0 ? (
          <BookingsGrid>
            {filteredBookings.map((booking) => {
              const vendor = getVendorDetails(booking.vendorId);
              return (
                <BookingCard key={booking.id} status={booking.status}>
                  <BookingHeader>
                    <BookingInfo>
                      <BookingNumber>Booking #{booking.id}</BookingNumber>
                      <BookingMeta>
                        <BookingStatus status={booking.status}>
                          {getStatusIcon(booking.status)}
                          {booking.status}
                        </BookingStatus>
                        <MetaItem>
                          <FaCalendarAlt />
                          {new Date(booking.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })} at {booking.time}
                        </MetaItem>
                        <MetaItem>
                          <FaUser />
                          {booking.guestCount} guests
                        </MetaItem>
                      </BookingMeta>
                    </BookingInfo>
                  </BookingHeader>

                  <BookingContent>
                    {vendor && (
                      <VendorSection>
                        <VendorImage src={vendor.image} alt={vendor.name} />
                        <VendorInfo>
                          <VendorName>{vendor.name}</VendorName>
                          <VendorMeta>
                            <MetaItem>
                              <FaMapMarkerAlt />
                              {vendor.city}, {vendor.state}
                            </MetaItem>
                            <MetaItem>
                              <FaStar />
                              {vendor.rating} ({vendor.reviewCount} reviews)
                            </MetaItem>
                          </VendorMeta>
                        </VendorInfo>
                      </VendorSection>
                    )}

                    <BookingDetails>
                      <DetailGroup>
                        <DetailLabel>Contact Information</DetailLabel>
                        <DetailValue>
                          <div>{booking.contactName}</div>
                          <div>{booking.email}</div>
                          <div>{booking.phone}</div>
                        </DetailValue>
                      </DetailGroup>
                      <DetailGroup>
                        <DetailLabel>Event Type</DetailLabel>
                        <DetailValue>{booking.eventType}</DetailValue>
                      </DetailGroup>
                      <DetailGroup>
                        <DetailLabel>Services Requested</DetailLabel>
                        <DetailValue>{booking.services.join(', ')}</DetailValue>
                      </DetailGroup>
                      <DetailGroup>
                        <DetailLabel>Booking Created</DetailLabel>
                        <DetailValue>
                          {new Date(booking.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </DetailValue>
                      </DetailGroup>
                    </BookingDetails>

                    <BookingActions>
                      <ActionButton onClick={() => handleViewBooking(booking)}>
                        <FaEye />
                        View Details
                      </ActionButton>
                      {vendor && (
                        <ActionButton onClick={() => handleViewVendor(vendor.id)}>
                          <FaRing />
                          View Vendor
                        </ActionButton>
                      )}
                      {booking.status === 'pending' && (
                        <ActionButton danger>
                          <FaTimesCircle />
                          Cancel Booking
                        </ActionButton>
                      )}
                    </BookingActions>
                  </BookingContent>
                </BookingCard>
              );
            })}
          </BookingsGrid>
        ) : (
          <EmptyState>
            <h3>No bookings found</h3>
            <p>
              {statusFilter !== "all" 
                ? `No ${statusFilter} bookings match your criteria.`
                : "You haven't made any wedding bookings yet."
              }
            </p>
            <ActionButton primary onClick={() => navigate('/weddings')}>
              <FaRing />
              Browse Wedding Vendors
            </ActionButton>
          </EmptyState>
        )}
      </Container>
    </PageContainer>
  );
};

export default MyBookings;
