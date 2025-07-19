import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaMapMarkerAlt,
  FaStar,
  FaWifi,
  FaSwimmingPool,
  FaCar,
  FaUtensils,
  FaDumbbell,
  FaSpa,
  FaArrowLeft,
  FaShare,
  FaHeart,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import HotelNavbar from "../components/HotelNavbar";
import HotelFooter from "../components/HotelFooter";
import RoomCard from "../components/RoomCard";
import { getHotelByIdOrSlug } from "../data/hotels";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
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
  margin: ${theme.spacing.lg} auto 0;
  max-width: 1200px;
  width: 100%;
  margin-left: ${theme.spacing.md};
  margin-right: ${theme.spacing.md};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const HotelBanner = styled.section.withConfig({
  shouldForwardProp: (prop) => prop !== "image",
})`
  position: relative;
  height: 500px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: end;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  }
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 1;
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const BannerTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.lg};
`;

const HotelInfo = styled.div`
  flex: 1;
`;

const HotelActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const HotelName = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const HotelLocation = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1.2rem;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const HotelRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const StarRating = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled(FaStar)`
  color: #fbbf24;
  font-size: 1rem;
`;

const TabsContainer = styled.div`
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray200};
  position: sticky;
  top: 70px;
  z-index: 10;
`;

const Tabs = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  padding: 0 ${theme.spacing.md};
`;

const Tab = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  background: none;
  border: none;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-weight: 600;
  color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.gray600};
  border-bottom: 3px solid
    ${(props) => (props.active ? theme.colors.primary : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xxl} ${theme.spacing.md};
  flex: 1;
`;

const Section = styled.div`
  margin-bottom: ${theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.lg};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const InfoCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border-left: 4px solid ${theme.colors.primary};

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }

  p {
    color: ${theme.colors.gray600};
    font-size: 0.9rem;
  }
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
`;

const AmenityIcon = styled.div`
  color: ${theme.colors.primary};
  font-size: 1.2rem;
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const PoliciesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
`;

const PolicyItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};

  .icon {
    color: ${theme.colors.success};
    margin-top: 2px;
  }

  .text {
    color: ${theme.colors.gray700};
    font-size: 0.9rem;
  }
`;

const HotelDetail = () => {
  const { hotelSlug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundHotel = getHotelByIdOrSlug(hotelSlug);
    setHotel(foundHotel);
    setLoading(false);
  }, [hotelSlug]);

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      WiFi: FaWifi,
      Pool: FaSwimmingPool,
      Parking: FaCar,
      Restaurant: FaUtensils,
      Gym: FaDumbbell,
      Spa: FaSpa,
    };
    const IconComponent = iconMap[amenity] || FaCheckCircle;
    return <IconComponent />;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} />);
    }
    return stars;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hotel.name,
        text: hotel.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Hotel link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <HotelNavbar />
        <div style={{ padding: "4rem", textAlign: "center" }}>Loading...</div>
        <HotelFooter />
      </PageContainer>
    );
  }

  if (!hotel) {
    return (
      <PageContainer>
        <HotelNavbar />
        <div style={{ padding: "4rem", textAlign: "center" }}>
          <h2>Hotel not found</h2>
          <p>The hotel you're looking for doesn't exist.</p>
        </div>
        <HotelFooter />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <HotelNavbar />

      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft />
        Back to Hotels
      </BackButton>

      <HotelBanner image={hotel.image}>
        <BannerContent>
          <BannerTop>
            <HotelInfo>
              <HotelName>{hotel.name}</HotelName>
              <HotelLocation>
                <FaMapMarkerAlt />
                {hotel.location}
              </HotelLocation>
              <HotelRating>
                <StarRating>{renderStars(hotel.rating)}</StarRating>
                <span>
                  {hotel.rating}/5 ({hotel.starRating} Star Hotel)
                </span>
              </HotelRating>
            </HotelInfo>

            <HotelActions>
              <ActionButton onClick={handleShare} title="Share Hotel">
                <FaShare />
              </ActionButton>
              <ActionButton title="Add to Wishlist">
                <FaHeart />
              </ActionButton>
            </HotelActions>
          </BannerTop>
        </BannerContent>
      </HotelBanner>

      <TabsContainer>
        <Tabs>
          <Tab
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </Tab>
          <Tab
            active={activeTab === "rooms"}
            onClick={() => setActiveTab("rooms")}
          >
            Rooms & Rates
          </Tab>
          <Tab
            active={activeTab === "amenities"}
            onClick={() => setActiveTab("amenities")}
          >
            Amenities
          </Tab>
          <Tab
            active={activeTab === "policies"}
            onClick={() => setActiveTab("policies")}
          >
            Policies
          </Tab>
        </Tabs>
      </TabsContainer>

      <ContentContainer>
        {activeTab === "overview" && (
          <Section>
            <SectionTitle>About {hotel.name}</SectionTitle>
            <Description>{hotel.description}</Description>

            <InfoGrid>
              <InfoCard>
                <h3>
                  <FaClock />
                  Check-in
                </h3>
                <p>{hotel.checkInTime}</p>
              </InfoCard>
              <InfoCard>
                <h3>
                  <FaClock />
                  Check-out
                </h3>
                <p>{hotel.checkOutTime}</p>
              </InfoCard>
              <InfoCard>
                <h3>
                  <FaMapMarkerAlt />
                  Address
                </h3>
                <p>{hotel.address}</p>
              </InfoCard>
              <InfoCard>
                <h3>
                  <FaStar />
                  Starting Price
                </h3>
                <p>���{hotel.startingPrice.toLocaleString()} per night</p>
              </InfoCard>
            </InfoGrid>
          </Section>
        )}

        {activeTab === "rooms" && (
          <Section>
            <SectionTitle>Available Rooms</SectionTitle>
            <RoomsGrid>
              {hotel.rooms?.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  hotelId={hotel.id}
                  hotelSlug={hotel.slug}
                />
              ))}
            </RoomsGrid>
          </Section>
        )}

        {activeTab === "amenities" && (
          <Section>
            <SectionTitle>Hotel Amenities</SectionTitle>
            <AmenitiesGrid>
              {hotel.amenities?.map((amenity, index) => (
                <AmenityItem key={index}>
                  <AmenityIcon>{getAmenityIcon(amenity)}</AmenityIcon>
                  <span>{amenity}</span>
                </AmenityItem>
              ))}
            </AmenitiesGrid>
          </Section>
        )}

        {activeTab === "policies" && (
          <Section>
            <SectionTitle>Hotel Policies</SectionTitle>
            <PoliciesGrid>
              {hotel.policies?.map((policy, index) => (
                <PolicyItem key={index}>
                  <FaCheckCircle className="icon" />
                  <span className="text">{policy}</span>
                </PolicyItem>
              ))}
            </PoliciesGrid>
          </Section>
        )}
      </ContentContainer>

      <HotelFooter />
    </PageContainer>
  );
};

export default HotelDetail;
