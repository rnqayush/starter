import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEnvelope, FaEye, FaReply, FaPhone, FaUser, FaCar, FaClock } from "react-icons/fa";
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

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.md};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray200};
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const EnquiriesList = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const EnquiryItem = styled.div`
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const EnquiryHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const CustomerInfo = styled.div`
  flex: 1;
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
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xs};
`;

const EnquiryMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  font-size: 0.8rem;
  color: ${theme.colors.gray500};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.xs};
  }
`;

const VehicleInfo = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.md};
`;

const VehicleName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const VehiclePrice = styled.div`
  color: ${theme.colors.primary};
  font-weight: 600;
`;

const EnquiryMessage = styled.div`
  color: ${theme.colors.gray700};
  line-height: 1.5;
  margin-bottom: ${theme.spacing.md};
  font-style: italic;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &.primary {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: none;

    &:hover {
      background: ${theme.colors.primaryDark};
    }
  }

  &.secondary {
    background: ${theme.colors.white};
    color: ${theme.colors.gray700};
    border: 1px solid ${theme.colors.gray300};

    &:hover {
      background: ${theme.colors.gray50};
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray500};

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

const EnquiriesTab = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    // Load enquiries from localStorage (demo data)
    const storedEnquiries = JSON.parse(localStorage.getItem("vehicleEnquiries") || "[]");
    setEnquiries(storedEnquiries);
  }, []);

  const stats = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === "pending").length,
    responded: enquiries.filter(e => e.status === "responded").length,
    thisWeek: enquiries.filter(e => {
      const enquiryDate = new Date(e.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return enquiryDate > weekAgo;
    }).length,
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Container>
      <Header>
        <Title>
          <FaEnvelope />
          Customer Enquiries ({enquiries.length})
        </Title>
        
        <StatsRow>
          <StatCard>
            <StatValue>{stats.total}</StatValue>
            <StatLabel>Total</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.new}</StatValue>
            <StatLabel>New</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.responded}</StatValue>
            <StatLabel>Responded</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.thisWeek}</StatValue>
            <StatLabel>This Week</StatLabel>
          </StatCard>
        </StatsRow>
      </Header>

      <EnquiriesList>
        {enquiries.length > 0 ? (
          enquiries.map((enquiry) => (
            <EnquiryItem key={enquiry.id}>
              <EnquiryHeader>
                <CustomerInfo>
                  <CustomerName>
                    <FaUser />
                    {enquiry.name}
                  </CustomerName>
                  <CustomerContact>{enquiry.email}</CustomerContact>
                  <CustomerContact>{enquiry.phone}</CustomerContact>
                </CustomerInfo>
                <EnquiryMeta>
                  <div>
                    <FaClock /> {formatDate(enquiry.timestamp)}
                  </div>
                  <div>Interest: {enquiry.interestType}</div>
                </EnquiryMeta>
              </EnquiryHeader>

              {enquiry.vehicleName && (
                <VehicleInfo>
                  <VehicleName>
                    <FaCar /> {enquiry.vehicleYear} {enquiry.vehicleMake} {enquiry.vehicleModel}
                  </VehicleName>
                  <VehiclePrice>{formatPrice(enquiry.vehiclePrice)}</VehiclePrice>
                </VehicleInfo>
              )}

              {enquiry.message && (
                <EnquiryMessage>
                  "{enquiry.message}"
                </EnquiryMessage>
              )}

              <ActionButtons>
                <ActionButton className="primary">
                  <FaReply />
                  Reply
                </ActionButton>
                <ActionButton className="secondary">
                  <FaPhone />
                  Call
                </ActionButton>
                <ActionButton className="secondary">
                  <FaEye />
                  View Details
                </ActionButton>
              </ActionButtons>
            </EnquiryItem>
          ))
        ) : (
          <EmptyState>
            <FaEnvelope className="icon" />
            <h3>No enquiries yet</h3>
            <p>Customer enquiries will appear here when customers are interested in your vehicles.</p>
          </EmptyState>
        )}
      </EnquiriesList>
    </Container>
  );
};

export default EnquiriesTab;
