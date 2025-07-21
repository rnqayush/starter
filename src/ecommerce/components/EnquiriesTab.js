import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaEnvelope,
  FaPhone,
  FaUser,
  FaEye,
  FaCheck,
  FaClock,
  FaStickyNote,
  FaEdit,
  FaSave,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaInbox,
  FaBell
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const StatsCards = styled.div`
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

const FiltersSection = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.tablet}) {
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
  cursor: pointer;

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
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const CustomerName = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0 0 ${theme.spacing.xs} 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const EnquiryDate = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: flex-start;
`;

const StatusSelect = styled.select`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  font-size: 0.9rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray500};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray700};
  }
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "status"
})`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  
  ${props => {
    switch (props.status) {
      case "pending":
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      case "contacted":
        return `
          background: ${theme.colors.info}20;
          color: ${theme.colors.info};
        `;
      case "in_progress":
        return `
          background: ${theme.colors.primary}20;
          color: ${theme.colors.primary};
        `;
      case "completed":
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

const EnquiryBody = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "expanded"
})`
  display: ${props => props.expanded ? "block" : "none"};
  padding: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray100};
`;

const ContactSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const ContactLabel = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray700};
  min-width: 60px;
`;

const ContactValue = styled.span`
  color: ${theme.colors.gray600};
`;

const MessageSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const MessageLabel = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const MessageContent = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border-left: 4px solid ${theme.colors.primary};
`;

const MessageText = styled.p`
  color: ${theme.colors.gray700};
  margin: 0;
  line-height: 1.5;
`;

const NotesSection = styled.div`
  border-top: 1px solid ${theme.colors.gray200};
  padding-top: ${theme.spacing.lg};
`;

const NotesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const NotesTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const NotesActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const Button = styled.button`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: 2px solid ${theme.colors.primary};

  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
    border-color: ${theme.colors.primaryDark};
  }
`;

const SecondaryButton = styled(Button)`
  background: ${theme.colors.white};
  color: ${theme.colors.gray700};
  border: 2px solid ${theme.colors.gray200};

  &:hover:not(:disabled) {
    background: ${theme.colors.gray50};
    border-color: ${theme.colors.gray300};
  }
`;

const NotesTextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${theme.spacing.sm};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const ExistingNote = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.sm};
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
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

const EnquiriesTab = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [editingNotes, setEditingNotes] = useState(new Set());
  const [notes, setNotes] = useState({});

  useEffect(() => {
    // Load enquiries from localStorage (in real app, this would be from API)
    const allEnquiries = JSON.parse(localStorage.getItem("userEnquiries") || "[]");
    setEnquiries(allEnquiries);
  }, []);

  useEffect(() => {
    let filtered = enquiries;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(enquiry =>
        enquiry.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(enquiry => enquiry.status === statusFilter);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredEnquiries(filtered);
  }, [enquiries, searchTerm, statusFilter]);

  const handleStatusChange = (enquiryId, newStatus) => {
    const updatedEnquiries = enquiries.map(enquiry =>
      enquiry.id === enquiryId ? { ...enquiry, status: newStatus } : enquiry
    );
    setEnquiries(updatedEnquiries);
    localStorage.setItem("userEnquiries", JSON.stringify(updatedEnquiries));
  };

  const toggleCardExpansion = (enquiryId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(enquiryId)) {
      newExpanded.delete(enquiryId);
    } else {
      newExpanded.add(enquiryId);
    }
    setExpandedCards(newExpanded);
  };

  const startEditingNote = (enquiryId) => {
    setEditingNotes(new Set([...editingNotes, enquiryId]));
  };

  const saveNote = (enquiryId) => {
    setEditingNotes(new Set([...editingNotes].filter(id => id !== enquiryId)));
    // In real app, save to backend
  };

  const cancelEditingNote = (enquiryId) => {
    setEditingNotes(new Set([...editingNotes].filter(id => id !== enquiryId)));
    setNotes({ ...notes, [enquiryId]: "" });
  };

  const handleNoteChange = (enquiryId, value) => {
    setNotes({ ...notes, [enquiryId]: value });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock />;
      case "contacted":
        return <FaPhone />;
      case "in_progress":
        return <FaEye />;
      case "completed":
        return <FaCheck />;
      default:
        return <FaBell />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "contacted":
        return "Contacted";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStats = () => {
    const total = enquiries.length;
    const pending = enquiries.filter(e => e.status === "pending").length;
    const inProgress = enquiries.filter(e => e.status === "in_progress" || e.status === "contacted").length;
    const completed = enquiries.filter(e => e.status === "completed").length;

    return { total, pending, inProgress, completed };
  };

  const stats = getStats();

  return (
    <Container>
      <Header>
        <Title>Enquiry Management</Title>
      </Header>

      <StatsCards>
        <StatCard>
          <StatNumber>{stats.total}</StatNumber>
          <StatLabel>Total Enquiries</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.pending}</StatNumber>
          <StatLabel>Pending Response</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.inProgress}</StatNumber>
          <StatLabel>In Progress</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.completed}</StatNumber>
          <StatLabel>Completed</StatLabel>
        </StatCard>
      </StatsCards>

      <FiltersSection>
        <SearchInput
          type="text"
          placeholder="Search by product, customer name, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
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
          filteredEnquiries.map((enquiry) => (
            <EnquiryCard key={enquiry.id}>
              <EnquiryHeader onClick={() => toggleCardExpansion(enquiry.id)}>
                <ProductInfo>
                  <ProductImage
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop"
                    alt={enquiry.productName}
                  />
                  <ProductDetails>
                    <ProductName>{enquiry.productName}</ProductName>
                    <CustomerName>
                      <FaUser />
                      {enquiry.name}
                    </CustomerName>
                    <EnquiryDate>
                      <FaClock />
                      {formatDate(enquiry.timestamp)}
                    </EnquiryDate>
                  </ProductDetails>
                </ProductInfo>
                <HeaderActions>
                  <StatusBadge status={enquiry.status}>
                    {getStatusIcon(enquiry.status)}
                    {getStatusLabel(enquiry.status)}
                  </StatusBadge>
                  <StatusSelect
                    value={enquiry.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleStatusChange(enquiry.id, e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </StatusSelect>
                  <ExpandButton>
                    {expandedCards.has(enquiry.id) ? <FaChevronUp /> : <FaChevronDown />}
                  </ExpandButton>
                </HeaderActions>
              </EnquiryHeader>

              <EnquiryBody expanded={expandedCards.has(enquiry.id)}>
                <ContactSection>
                  <ContactItem>
                    <FaEnvelope style={{ color: theme.colors.primary }} />
                    <div>
                      <ContactLabel>Email:</ContactLabel>
                      <ContactValue>{enquiry.email}</ContactValue>
                    </div>
                  </ContactItem>
                  <ContactItem>
                    <FaPhone style={{ color: theme.colors.primary }} />
                    <div>
                      <ContactLabel>Phone:</ContactLabel>
                      <ContactValue>{enquiry.phone}</ContactValue>
                    </div>
                  </ContactItem>
                </ContactSection>

                {enquiry.message && (
                  <MessageSection>
                    <MessageLabel>Customer Message:</MessageLabel>
                    <MessageContent>
                      <MessageText>{enquiry.message}</MessageText>
                    </MessageContent>
                  </MessageSection>
                )}

                <NotesSection>
                  <NotesHeader>
                    <NotesTitle>
                      <FaStickyNote />
                      Internal Notes
                    </NotesTitle>
                    <NotesActions>
                      {editingNotes.has(enquiry.id) ? (
                        <>
                          <PrimaryButton onClick={() => saveNote(enquiry.id)}>
                            <FaSave />
                            Save
                          </PrimaryButton>
                          <SecondaryButton onClick={() => cancelEditingNote(enquiry.id)}>
                            <FaTimes />
                            Cancel
                          </SecondaryButton>
                        </>
                      ) : (
                        <SecondaryButton onClick={() => startEditingNote(enquiry.id)}>
                          <FaEdit />
                          Add Note
                        </SecondaryButton>
                      )}
                    </NotesActions>
                  </NotesHeader>

                  {editingNotes.has(enquiry.id) ? (
                    <NotesTextArea
                      value={notes[enquiry.id] || ""}
                      onChange={(e) => handleNoteChange(enquiry.id, e.target.value)}
                      placeholder="Add internal notes about this enquiry..."
                    />
                  ) : (
                    <ExistingNote>
                      {notes[enquiry.id] || "No notes added yet."}
                    </ExistingNote>
                  )}
                </NotesSection>
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
              {searchTerm || statusFilter !== "all" 
                ? "No enquiries match your current filters."
                : "You haven't received any enquiries yet. Customers will be able to enquire about your products."}
            </EmptyText>
          </EmptyState>
        )}
      </EnquiriesList>
    </Container>
  );
};

export default EnquiriesTab;
