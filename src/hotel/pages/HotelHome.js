import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/GlobalStyle";
import HotelNavbar from "../components/HotelNavbar";
import HotelFooter from "../components/HotelFooter";
import HotelCard from "../components/HotelCard";
import SearchForm from "../components/SearchForm";
import { hotels } from "../data/hotels";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const HeroSection = styled.section`
  background:
    linear-gradient(135deg, rgba(30, 64, 175, 0.9), rgba(59, 130, 246, 0.8)),
    url("https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3")
      center/cover;
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
  position: relative;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: ${theme.spacing.xxl};
  opacity: 0.95;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const HotelsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  flex: 1;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.gray900};
`;

const HotelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
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

const ClearButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const HotelHome = () => {
  const navigate = useNavigate();
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [searchCriteria, setSearchCriteria] = useState(null);

  const handleSearch = (searchData) => {
    const { destination } = searchData;

    if (!destination.trim()) {
      setFilteredHotels(hotels);
      setSearchCriteria(null);
      return;
    }

    const filtered = hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(destination.toLowerCase()) ||
        hotel.location.toLowerCase().includes(destination.toLowerCase()) ||
        hotel.city.toLowerCase().includes(destination.toLowerCase()),
    );

    setFilteredHotels(filtered);
    setSearchCriteria(searchData);
  };

  const clearSearch = () => {
    setFilteredHotels(hotels);
    setSearchCriteria(null);
  };

  return (
    <PageContainer>
      <HotelNavbar />

      <HeroSection>
        <HeroContent>
          <HeroTitle>Find Your Perfect Stay</HeroTitle>
          <HeroSubtitle>
            Discover amazing hotels and book your next adventure with ease
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <Container>
        <SearchForm onSearch={handleSearch} />
      </Container>

      <HotelsSection>
        <Container>
          <SectionTitle>
            {searchCriteria ? "Search Results" : "Popular Hotels"}
          </SectionTitle>

          {filteredHotels.length > 0 ? (
            <HotelsGrid>
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </HotelsGrid>
          ) : (
            <EmptyState>
              <h3>No hotels found</h3>
              <p>
                We couldn't find any hotels matching your search criteria. Try
                adjusting your search terms.
              </p>
              <ClearButton onClick={clearSearch}>View All Hotels</ClearButton>
            </EmptyState>
          )}
        </Container>
      </HotelsSection>

      <HotelFooter />
    </PageContainer>
  );
};

export default HotelHome;
