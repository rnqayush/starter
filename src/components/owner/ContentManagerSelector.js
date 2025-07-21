import React from "react";
import styled from "styled-components";
import { FaEdit, FaEye, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Card, CardContent } from "../shared/Card";
import { Button } from "../shared/Button";
import { theme } from "../../styles/GlobalStyle";
import { useAppContext } from "../../context/AppContext";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 17.5rem;
  padding: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: 0;
    padding: ${theme.spacing.xl} ${theme.spacing.md};
    padding-top: 5rem;
  }
`;

const Header = styled.div`
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

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  margin-top: ${theme.spacing.sm};
`;

const BackButton = styled.button`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
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

const HotelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const HotelCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const HotelImage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "image",
})`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%);
  }
`;

const HotelInfo = styled.div`
  padding: ${theme.spacing.lg};
`;

const HotelName = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const HotelLocation = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
`;

const HotelStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} 0;
  border-top: 1px solid ${theme.colors.gray200};
  margin-top: ${theme.spacing.lg};
`;

const Stat = styled.div`
  text-align: center;
  
  .value {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    display: block;
  }
  
  .label {
    font-size: 0.8rem;
    color: ${theme.colors.gray600};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const HotelActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl} ${theme.spacing.lg};
  color: ${theme.colors.gray600};

  h3 {
    font-size: 1.5rem;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    margin-bottom: ${theme.spacing.lg};
  }
`;

const ContentManagerSelector = () => {
  const navigate = useNavigate();
  const { ownerHotels } = useAppContext();

  if (ownerHotels.length === 0) {
    return (
      <DashboardContainer>
        <Sidebar />
        <MainContent>
          <Header>
            <div>
              <Title>Manage Hotel Content</Title>
              <Subtitle>Select a hotel to manage its content and settings</Subtitle>
            </div>
            <BackButton onClick={() => navigate("/owner/dashboard")}>
              <FaArrowLeft />
              Back to Dashboard
            </BackButton>
          </Header>

          <EmptyState>
            <h3>No Hotels Found</h3>
            <p>You don't have any hotels registered yet. Add your first hotel to start managing content.</p>
            <Button as={Link} to="/owner/add-hotel">
              Add Your First Hotel
            </Button>
          </EmptyState>
        </MainContent>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Sidebar />

      <MainContent>
        <Header>
          <div>
            <Title>Manage Hotel Content</Title>
            <Subtitle>Select a hotel to manage its content and settings</Subtitle>
          </div>
          <BackButton onClick={() => navigate("/owner/dashboard")}>
            <FaArrowLeft />
            Back to Dashboard
          </BackButton>
        </Header>

        <HotelsGrid>
          {ownerHotels.map((hotel) => (
            <HotelCard key={hotel.id}>
              <HotelImage image={hotel.image} />
              <HotelInfo>
                <HotelName>{hotel.name}</HotelName>
                <HotelLocation>{hotel.location}</HotelLocation>
                
                <HotelStats>
                  <Stat>
                    <span className="value">{hotel.totalRooms}</span>
                    <span className="label">Rooms</span>
                  </Stat>
                  <Stat>
                    <span className="value">{hotel.totalBookings}</span>
                    <span className="label">Bookings</span>
                  </Stat>
                  <Stat>
                    <span className="value">{hotel.status}</span>
                    <span className="label">Status</span>
                  </Stat>
                </HotelStats>

                <HotelActions>
                  <Button
                    variant="primary"
                    size="small"
                    as={Link}
                    to={`/owner/content-manager/${hotel.name.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{ flex: 1 }}
                  >
                    <FaEdit />
                    Manage Content
                  </Button>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => window.open(`/${hotel.name.toLowerCase().replace(/\s+/g, '-')}`, '_blank')}
                  >
                    <FaEye />
                  </Button>
                </HotelActions>
              </HotelInfo>
            </HotelCard>
          ))}
        </HotelsGrid>
      </MainContent>
    </DashboardContainer>
  );
};

export default ContentManagerSelector;
