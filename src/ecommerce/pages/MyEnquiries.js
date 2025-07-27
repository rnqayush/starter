import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaEnvelope,
  FaPhone,
  FaClock,
  FaCheck,
  FaEye,
  FaExclamationCircle,
  FaInbox,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getVendorByIdOrSlug } from '../data/vendors';

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
  margin-bottom: ${theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const PageSubtitle = styled.p`
  color: ${theme.colors.gray600};
  font-size: 1rem;
`;

const FiltersSection = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 250px;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const FilterSelect = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const StatsSection = styled.div`
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
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const EnquiriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const EnquiryCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${theme.shadows.md};
  }
`;

const EnquiryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray100};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const ProductInfo = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex: 1;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const EnquiryDate = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray500};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: prop => prop !== 'status',
})`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  width: fit-content;

  ${props => {
    switch (props.status) {
      case 'pending':
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      case 'contacted':
        return `
          background: ${theme.colors.info}20;
          color: ${theme.colors.info};
        `;
      case 'in_progress':
        return `
          background: ${theme.colors.primary}20;
          color: ${theme.colors.primary};
        `;
      case 'completed':
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
        `;
      default:
        return `
          background: ${theme.colors.gray200};
          color: ${theme.colors.gray600};
        `;
    }
  }}
`;

const EnquiryBody = styled.div`
  padding: ${theme.spacing.lg};
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
`;

const Message = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border-left: 4px solid ${theme.colors.primary};
`;

const MessageLabel = styled.p`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const MessageText = styled.p`
  color: ${theme.colors.gray700};
  margin: 0;
  line-height: 1.5;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: ${theme.colors.gray300};
  margin-bottom: ${theme.spacing.lg};
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.md};
`;

const EmptyText = styled.p`
  color: ${theme.colors.gray500};
  margin: 0;
`;

const MyEnquiries = () => {
  const location = useLocation();
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vendor, setVendor] = useState(null);
  const [storeSlug, setStoreSlug] = useState('');

  // Detect store slug from URL
  useEffect(() => {
    const path = location.pathname;
    if (path !== '/ecommerce/my-enquiries') {
      const pathSegments = path.split('/').filter(Boolean);
      const slug = pathSegments[0];
      const foundVendor = getVendorByIdOrSlug(slug);
      if (foundVendor) {
        setStoreSlug(foundVendor.slug);
        setVendor(foundVendor);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    // Load enquiries from localStorage (in real app, this would be from API)
    const userEnquiries = JSON.parse(
      localStorage.getItem('userEnquiries') || '[]'
    );
    setEnquiries(userEnquiries);
  }, []);

  useEffect(() => {
    let filtered = enquiries;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        enquiry =>
          enquiry.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          enquiry.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(enquiry => enquiry.status === statusFilter);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredEnquiries(filtered);
  }, [enquiries, searchTerm, statusFilter]);

  const getStatusIcon = status => {
    switch (status) {
      case 'pending':
        return <FaClock />;
      case 'contacted':
        return <FaPhone />;
      case 'in_progress':
        return <FaEye />;
      case 'completed':
        return <FaCheck />;
      default:
        return <FaExclamationCircle />;
    }
  };

  const getStatusLabel = status => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'contacted':
        return 'Contacted';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStats = () => {
    const total = enquiries.length;
    const pending = enquiries.filter(e => e.status === 'pending').length;
    const inProgress = enquiries.filter(
      e => e.status === 'in_progress' || e.status === 'contacted'
    ).length;
    const completed = enquiries.filter(e => e.status === 'completed').length;

    return { total, pending, inProgress, completed };
  };

  const stats = getStats();

  return (
    <PageContainer>
      <Navbar
        storeName={vendor?.name || ''}
        storeLogo={vendor?.logo || ''}
        storeSlug={storeSlug}
        theme={vendor?.theme || {}}
      />

      <Container>
        <PageHeader>
          <PageTitle>My Enquiries</PageTitle>
          <PageSubtitle>Track and manage your product enquiries</PageSubtitle>
        </PageHeader>

        <StatsSection>
          <StatCard>
            <StatNumber>{stats.total}</StatNumber>
            <StatLabel>Total Enquiries</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.pending}</StatNumber>
            <StatLabel>Pending</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.inProgress}</StatNumber>
            <StatLabel>In Progress</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.completed}</StatNumber>
            <StatLabel>Completed</StatLabel>
          </StatCard>
        </StatsSection>

        <FiltersSection>
          <SearchInput
            type="text"
            placeholder="Search by product name or your name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </FilterSelect>
        </FiltersSection>

        <EnquiriesList>
          {filteredEnquiries.length > 0 ? (
            filteredEnquiries.map(enquiry => (
              <EnquiryCard key={enquiry.id}>
                <EnquiryHeader>
                  <ProductInfo>
                    <ProductImage
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop"
                      alt={enquiry.productName}
                    />
                    <ProductDetails>
                      <ProductName>{enquiry.productName}</ProductName>
                      <ProductPrice>${enquiry.productPrice}</ProductPrice>
                      <EnquiryDate>
                        <FaClock />
                        Enquired on {formatDate(enquiry.timestamp)}
                      </EnquiryDate>
                    </ProductDetails>
                  </ProductInfo>
                  <StatusBadge status={enquiry.status}>
                    {getStatusIcon(enquiry.status)}
                    {getStatusLabel(enquiry.status)}
                  </StatusBadge>
                </EnquiryHeader>

                <EnquiryBody>
                  <ContactInfo>
                    <ContactItem>
                      <FaEnvelope />
                      <span>{enquiry.email}</span>
                    </ContactItem>
                    <ContactItem>
                      <FaPhone />
                      <span>{enquiry.phone}</span>
                    </ContactItem>
                  </ContactInfo>

                  {enquiry.message && (
                    <Message>
                      <MessageLabel>Your Message:</MessageLabel>
                      <MessageText>{enquiry.message}</MessageText>
                    </Message>
                  )}
                </EnquiryBody>
              </EnquiryCard>
            ))
          ) : (
            <EmptyState>
              <EmptyIcon>
                <FaInbox />
              </EmptyIcon>
              <EmptyTitle>No Enquiries Found</EmptyTitle>
              <EmptyText>
                {searchTerm || statusFilter !== 'all'
                  ? 'No enquiries match your current filters. Try adjusting your search or filter criteria.'
                  : "You haven't made any product enquiries yet. Start exploring products and make your first enquiry!"}
              </EmptyText>
            </EmptyState>
          )}
        </EnquiriesList>
      </Container>

      <Footer storeSlug={storeSlug} theme={vendor?.theme || {}} />
    </PageContainer>
  );
};

export default MyEnquiries;
