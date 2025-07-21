import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaWrench,
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaCheck,
  FaTimes,
  FaClock,
  FaUser,
  FaCalendar,
  FaPhone,
  FaEnvelope,
  FaDownload,
  FaPrint,
  FaTools,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

const Container = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
`;

const Header = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    align-items: stretch;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
  }
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "primary",
})`
  background: ${(props) => props.primary ? theme.colors.primary : theme.colors.white};
  color: ${(props) => props.primary ? theme.colors.white : theme.colors.gray700};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: ${(props) => props.primary ? 'none' : `2px solid ${theme.colors.gray200}`};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${(props) => props.primary ? theme.colors.primaryDark : theme.colors.gray50};
    transform: translateY(-1px);
    border-color: ${(props) => props.primary ? theme.colors.primaryDark : theme.colors.primary};
  }
`;

const FiltersRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: ${theme.spacing.md};
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm} 2.5rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray500};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
  font-size: 1rem;
`;

const FilterSelect = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  cursor: pointer;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray200};
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => props.color || theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AppointmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    padding: ${theme.spacing.lg};
  }
`;

const AppointmentCard = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
    border-color: ${theme.colors.primary};
  }
`;

const AppointmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const AppointmentInfo = styled.div`
  flex: 1;
`;

const AppointmentId = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 1rem;
  margin-bottom: ${theme.spacing.xs};
`;

const AppointmentTime = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.primary};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xs};
`;

const AppointmentDate = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "status",
})`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${theme.colors.white};
  background: ${(props) => {
    switch (props.status) {
      case "scheduled": return theme.colors.info;
      case "confirmed": return theme.colors.primary;
      case "in_progress": return theme.colors.warning;
      case "completed": return theme.colors.success;
      case "cancelled": return theme.colors.error;
      case "no_show": return theme.colors.gray500;
      default: return theme.colors.gray500;
    }
  }};
`;

const CustomerSection = styled.div`
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const CustomerName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const CustomerContact = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xs};

  &:last-child {
    margin-bottom: 0;
  }
`;

const VehicleSection = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const VehicleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
`;

const VehicleImage = styled.img`
  width: 70px;
  height: 50px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray200};
`;

const VehicleDetails = styled.div`
  flex: 1;
`;

const VehicleName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const VehicleSpecs = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
`;

const ServiceDetails = styled.div`
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const ServiceType = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const ServiceDescription = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.sm};
`;

const ServiceMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.sm};
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
`;

const TechnicianInfo = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`;

const ActionButtonSmall = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "variant",
})`
  background: ${(props) => 
    props.variant === 'confirm' ? theme.colors.primary : 
    props.variant === 'complete' ? theme.colors.success : 
    props.variant === 'cancel' ? theme.colors.error : 
    theme.colors.white};
  color: ${(props) => 
    props.variant === 'confirm' || props.variant === 'complete' || props.variant === 'cancel' ? 
    theme.colors.white : theme.colors.gray700};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border: ${(props) => 
    props.variant === 'confirm' || props.variant === 'complete' || props.variant === 'cancel' ? 
    'none' : `1px solid ${theme.colors.gray300}`};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray500};
  grid-column: 1 / -1;

  .icon {
    font-size: 4rem;
    color: ${theme.colors.gray400};
    margin-bottom: ${theme.spacing.lg};
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.gray700};
  }
`;

const ServiceAppointmentsTab = ({ dealer }) => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    // Mock service appointments data
    const mockAppointments = [
      {
        id: "SA-001",
        appointmentId: "24-SA-001",
        customerId: 1,
        customerName: "John Smith",
        customerEmail: "john.smith@email.com",
        customerPhone: "(555) 123-4567",
        vehicle: {
          year: 2022,
          make: "BMW",
          model: "X5",
          trim: "M50i",
          color: "Black",
          mileage: 15000,
          vin: "5UXCR6C05N9A12345",
          image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop",
        },
        appointmentDate: "2024-02-20T09:00:00Z",
        scheduledDate: "2024-02-15T10:30:00Z",
        status: "confirmed",
        serviceType: "Oil Change & Multi-Point Inspection",
        description: "Regular maintenance service - oil change, filter replacement, and comprehensive vehicle inspection",
        estimatedDuration: 90,
        estimatedCost: 120,
        technician: "Mike Johnson",
        bay: "Bay 3",
        notes: "Customer mentioned unusual noise from engine",
        services: ["Oil Change", "Oil Filter", "Multi-Point Inspection", "Fluid Top-off"],
      },
      {
        id: "SA-002",
        appointmentId: "24-SA-002",
        customerId: 2,
        customerName: "Sarah Johnson",
        customerEmail: "sarah.j@email.com",
        customerPhone: "(555) 234-5678",
        vehicle: {
          year: 2023,
          make: "Tesla",
          model: "Model S",
          trim: "Plaid",
          color: "White",
          mileage: 8000,
          vin: "5YJ3E1EA9PF123456",
          image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=200&fit=crop",
        },
        appointmentDate: "2024-02-20T14:00:00Z",
        scheduledDate: "2024-02-14T14:20:00Z",
        status: "in_progress",
        serviceType: "Software Update & Diagnostic",
        description: "Tesla software update and comprehensive diagnostic check",
        estimatedDuration: 120,
        estimatedCost: 200,
        technician: "Lisa Chen",
        bay: "Electric Bay 1",
        notes: "Software update requested by customer, check charging system",
        services: ["Software Update", "Diagnostic Scan", "Charging System Check", "Tire Rotation"],
      },
      {
        id: "SA-003",
        appointmentId: "24-SA-003",
        customerId: 3,
        customerName: "Michael Brown",
        customerEmail: "m.brown@email.com",
        customerPhone: "(555) 345-6789",
        vehicle: {
          year: 2021,
          make: "Ford",
          model: "F-150",
          trim: "Lariat",
          color: "Blue",
          mileage: 35000,
          vin: "1FTEW1EG5MKF12345",
          image: "https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=300&h=200&fit=crop",
        },
        appointmentDate: "2024-02-21T08:00:00Z",
        scheduledDate: "2024-02-13T09:15:00Z",
        status: "scheduled",
        serviceType: "Brake Service & Tire Rotation",
        description: "Brake pad replacement and tire rotation service",
        estimatedDuration: 180,
        estimatedCost: 450,
        technician: "David Wilson",
        bay: "Bay 1",
        notes: "Customer reported squeaking noise when braking",
        services: ["Brake Pad Replacement", "Brake Fluid Change", "Tire Rotation", "Brake Inspection"],
      },
      {
        id: "SA-004",
        appointmentId: "24-SA-004",
        customerId: 4,
        customerName: "Emily Davis",
        customerEmail: "emily.davis@email.com",
        customerPhone: "(555) 456-7890",
        vehicle: {
          year: 2023,
          make: "Honda",
          model: "Civic",
          trim: "Sport",
          color: "Red",
          mileage: 12000,
          vin: "2HGFC2F56PH123456",
          image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=300&h=200&fit=crop",
        },
        appointmentDate: "2024-02-19T11:00:00Z",
        scheduledDate: "2024-02-12T16:45:00Z",
        status: "completed",
        serviceType: "Annual Maintenance Service",
        description: "Comprehensive annual maintenance including all fluid changes and inspections",
        estimatedDuration: 240,
        estimatedCost: 350,
        actualCost: 325,
        technician: "Jennifer Lee",
        bay: "Bay 2",
        notes: "All services completed successfully, vehicle in excellent condition",
        services: ["Oil Change", "Transmission Service", "Coolant Flush", "Air Filter", "Cabin Filter"],
      },
      {
        id: "SA-005",
        appointmentId: "24-SA-005",
        customerId: 5,
        customerName: "Robert Wilson",
        customerEmail: "r.wilson@email.com",
        customerPhone: "(555) 567-8901",
        vehicle: {
          year: 2024,
          make: "Porsche",
          model: "911",
          trim: "Turbo S",
          color: "Silver",
          mileage: 2500,
          vin: "WP0AB2A99PS123456",
          image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
        },
        appointmentDate: "2024-02-18T15:00:00Z",
        scheduledDate: "2024-02-11T11:00:00Z",
        status: "cancelled",
        serviceType: "Recall Service",
        description: "Factory recall service for ECU update",
        estimatedDuration: 60,
        estimatedCost: 0,
        technician: null,
        bay: null,
        notes: "Customer cancelled - will reschedule for next week",
        services: ["ECU Update", "System Check"],
      },
      {
        id: "SA-006",
        appointmentId: "24-SA-006",
        customerId: 6,
        customerName: "Lisa Anderson",
        customerEmail: "lisa.anderson@email.com",
        customerPhone: "(555) 678-9012",
        vehicle: {
          year: 2023,
          make: "Volvo",
          model: "XC90",
          trim: "Recharge",
          color: "Gray",
          mileage: 18000,
          vin: "YV4BR0CA6P1123456",
          image: "https://images.unsplash.com/photo-1606016872875-84d1177d27bb?w=300&h=200&fit=crop",
        },
        appointmentDate: "2024-02-17T10:00:00Z",
        scheduledDate: "2024-02-10T13:30:00Z",
        status: "no_show",
        serviceType: "Warranty Inspection",
        description: "Warranty inspection for hybrid system",
        estimatedDuration: 120,
        estimatedCost: 0,
        technician: "Mark Thompson",
        bay: "Hybrid Bay",
        notes: "Customer did not show up, attempting to reschedule",
        services: ["Hybrid System Check", "Battery Inspection", "Charging System Test"],
      },
    ];

    setAppointments(mockAppointments);
    setFilteredAppointments(mockAppointments);
  }, []);

  useEffect(() => {
    let filtered = [...appointments];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.appointmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${appointment.vehicle.year} ${appointment.vehicle.make} ${appointment.vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (appointment.technician && appointment.technician.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }

    // Date filter
    if (dateFilter) {
      const today = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          const tomorrow = new Date(filterDate);
          tomorrow.setDate(tomorrow.getDate() + 1);
          filtered = filtered.filter(appointment => {
            const apptDate = new Date(appointment.appointmentDate);
            return apptDate >= filterDate && apptDate < tomorrow;
          });
          break;
        case "week":
          filterDate.setDate(today.getDate() - 7);
          filtered = filtered.filter(appointment => 
            new Date(appointment.appointmentDate) >= filterDate
          );
          break;
        case "upcoming":
          filtered = filtered.filter(appointment => 
            new Date(appointment.appointmentDate) >= today &&
            (appointment.status === "scheduled" || appointment.status === "confirmed")
          );
          break;
      }
    }

    setFilteredAppointments(filtered);
  }, [appointments, searchTerm, statusFilter, dateFilter]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "scheduled": return "Scheduled";
      case "confirmed": return "Confirmed";
      case "in_progress": return "In Progress";
      case "completed": return "Completed";
      case "cancelled": return "Cancelled";
      case "no_show": return "No Show";
      default: return status;
    }
  };

  const stats = {
    total: appointments.length,
    today: appointments.filter(a => {
      const today = new Date();
      const apptDate = new Date(a.appointmentDate);
      return apptDate.toDateString() === today.toDateString();
    }).length,
    scheduled: appointments.filter(a => a.status === "scheduled" || a.status === "confirmed").length,
    inProgress: appointments.filter(a => a.status === "in_progress").length,
    completed: appointments.filter(a => a.status === "completed").length,
    revenue: appointments.filter(a => a.status === "completed").reduce((sum, a) => sum + (a.actualCost || a.estimatedCost), 0),
  };

  return (
    <Container>
      <Header>
        <HeaderTop>
          <Title>
            <FaWrench />
            Service Appointments ({filteredAppointments.length})
          </Title>
          <HeaderActions>
            <ActionButton>
              <FaDownload />
              Export Schedule
            </ActionButton>
            <ActionButton>
              <FaCalendar />
              View Calendar
            </ActionButton>
            <ActionButton primary>
              <FaPlus />
              New Appointment
            </ActionButton>
          </HeaderActions>
        </HeaderTop>

        <FiltersRow>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search by appointment ID, customer, vehicle, service type, or technician..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no_show">No Show</option>
          </FilterSelect>

          <FilterSelect
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="upcoming">Upcoming</option>
            <option value="week">This Week</option>
          </FilterSelect>

          <FilterSelect defaultValue="date">
            <option value="date">Sort by Date</option>
            <option value="customer">Customer A-Z</option>
            <option value="technician">Technician</option>
            <option value="cost">Highest Cost</option>
          </FilterSelect>
        </FiltersRow>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total Appointments</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.primary}>{stats.today}</StatValue>
          <StatLabel>Today</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.info}>{stats.scheduled}</StatValue>
          <StatLabel>Scheduled</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.warning}>{stats.inProgress}</StatValue>
          <StatLabel>In Progress</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.success}>{stats.completed}</StatValue>
          <StatLabel>Completed</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.success}>{formatCurrency(stats.revenue)}</StatValue>
          <StatLabel>Service Revenue</StatLabel>
        </StatCard>
      </StatsGrid>

      <AppointmentsGrid>
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => {
            const dateTime = formatDateTime(appointment.appointmentDate);
            
            return (
              <AppointmentCard key={appointment.id}>
                <AppointmentHeader>
                  <AppointmentInfo>
                    <AppointmentId>#{appointment.appointmentId}</AppointmentId>
                    <AppointmentTime>
                      <FaClock />
                      {dateTime.time}
                    </AppointmentTime>
                    <AppointmentDate>
                      <FaCalendar />
                      {dateTime.date}
                    </AppointmentDate>
                  </AppointmentInfo>
                  <StatusBadge status={appointment.status}>
                    {getStatusLabel(appointment.status)}
                  </StatusBadge>
                </AppointmentHeader>

                <CustomerSection>
                  <CustomerName>
                    <FaUser />
                    {appointment.customerName}
                  </CustomerName>
                  <CustomerContact>
                    <FaEnvelope />
                    {appointment.customerEmail}
                  </CustomerContact>
                  <CustomerContact>
                    <FaPhone />
                    {appointment.customerPhone}
                  </CustomerContact>
                </CustomerSection>

                <VehicleSection>
                  <VehicleInfo>
                    <VehicleImage 
                      src={appointment.vehicle.image} 
                      alt={`${appointment.vehicle.year} ${appointment.vehicle.make} ${appointment.vehicle.model}`} 
                    />
                    <VehicleDetails>
                      <VehicleName>
                        {appointment.vehicle.year} {appointment.vehicle.make} {appointment.vehicle.model}
                      </VehicleName>
                      <VehicleSpecs>
                        {appointment.vehicle.trim} • {appointment.vehicle.color} • {appointment.vehicle.mileage.toLocaleString()} mi
                      </VehicleSpecs>
                    </VehicleDetails>
                  </VehicleInfo>
                </VehicleSection>

                <ServiceDetails>
                  <ServiceType>
                    <FaTools />
                    {appointment.serviceType}
                  </ServiceType>
                  <ServiceDescription>{appointment.description}</ServiceDescription>
                  <ServiceMeta>
                    <div>Duration: {appointment.estimatedDuration} min</div>
                    <div>Cost: {formatCurrency(appointment.actualCost || appointment.estimatedCost)}</div>
                  </ServiceMeta>
                </ServiceDetails>

                {appointment.technician && (
                  <TechnicianInfo>
                    <FaUser />
                    Technician: {appointment.technician}
                    {appointment.bay && ` • ${appointment.bay}`}
                  </TechnicianInfo>
                )}

                {appointment.notes && (
                  <div style={{ 
                    marginBottom: theme.spacing.md, 
                    fontSize: '0.9rem', 
                    color: theme.colors.gray600, 
                    fontStyle: 'italic' 
                  }}>
                    Notes: {appointment.notes}
                  </div>
                )}

                <ActionButtons>
                  <ActionButtonSmall>
                    <FaEye />
                    View Details
                  </ActionButtonSmall>
                  {appointment.status === "scheduled" && (
                    <ActionButtonSmall variant="confirm">
                      <FaCheck />
                      Confirm
                    </ActionButtonSmall>
                  )}
                  {(appointment.status === "confirmed" || appointment.status === "in_progress") && (
                    <ActionButtonSmall variant="complete">
                      <FaCheck />
                      Complete
                    </ActionButtonSmall>
                  )}
                  {appointment.status === "completed" && (
                    <ActionButtonSmall>
                      <FaPrint />
                      Print Invoice
                    </ActionButtonSmall>
                  )}
                  {(appointment.status === "scheduled" || appointment.status === "confirmed") && (
                    <ActionButtonSmall variant="cancel">
                      <FaTimes />
                      Cancel
                    </ActionButtonSmall>
                  )}
                  <ActionButtonSmall>
                    <FaEdit />
                    Edit
                  </ActionButtonSmall>
                </ActionButtons>
              </AppointmentCard>
            );
          })
        ) : (
          <EmptyState>
            <FaWrench className="icon" />
            <h3>No service appointments found</h3>
            <p>Try adjusting your search criteria or schedule a new service appointment.</p>
          </EmptyState>
        )}
      </AppointmentsGrid>
    </Container>
  );
};

export default ServiceAppointmentsTab;
