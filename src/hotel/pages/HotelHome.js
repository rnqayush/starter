import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { theme, media } from '../../styles/GlobalStyle';
import HotelNavbar from '../components/HotelNavbar';
import HotelFooter from '../components/HotelFooter';
import HotelCard from '../components/HotelCard';
import SearchForm from '../components/SearchForm';
import { hotels as fallbackHotels } from '../../DummyData';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const HeroSection = styled.section`
  background:
    linear-gradient(135deg, rgba(30, 64, 175, 0.9), rgba(59, 130, 246, 0.8)),
    url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3')
      center/cover;
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;

  ${media.mobile} {
    padding: ${theme.spacing.xl} 0;
    min-height: 70vh;
  }

  ${media.tablet} {
    min-height: 75vh;
  }
`;

const HeroContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  ${media.mobile} {
    padding: 0 ${theme.spacing.sm};
  }

  ${media.tablet} {
    padding: 0 ${theme.spacing.lg};
  }

  ${media.desktop} {
    padding: 0 ${theme.spacing.xl};
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.1;

  ${media.mobile} {
    font-size: 2.5rem;
    margin-bottom: ${theme.spacing.sm};
  }

  ${media.tablet} {
    font-size: 3rem;
  }

  ${media.desktop} {
    font-size: 4rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: ${theme.spacing.xxl};
  opacity: 0.95;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  line-height: 1.4;
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;

  ${media.mobile} {
    font-size: 1.1rem;
    margin-bottom: ${theme.spacing.xl};
    max-width: 90%;
  }

  ${media.tablet} {
    font-size: 1.2rem;
  }
`;

const HotelsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  flex: 1;

  ${media.mobile} {
    padding: ${theme.spacing.xl} 0;
  }

  ${media.tablet} {
    padding: ${theme.spacing.xxl} 0;
  }
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
  // Get live hotel data from Redux, fallback to static data
  const liveHotels = useSelector(state => state.hotelManagement?.liveHotels || fallbackHotels);

  const [filteredHotels, setFilteredHotels] = useState(liveHotels);
  const [searchCriteria, setSearchCriteria] = useState(null);

  // Update filtered hotels when live data changes
  React.useEffect(() => {
    setFilteredHotels(liveHotels);
  }, [liveHotels]);

  const handleSearch = searchData => {
    const { destination } = searchData;

    if (!destination.trim()) {
      setFilteredHotels(liveHotels);
      setSearchCriteria(null);
      return;
    }

    const filtered = liveHotels.filter(
      hotel =>
        hotel.name.toLowerCase().includes(destination.toLowerCase()) ||
        hotel.location.toLowerCase().includes(destination.toLowerCase()) ||
        hotel.city.toLowerCase().includes(destination.toLowerCase())
    );

    setFilteredHotels(filtered);
    setSearchCriteria(searchData);
  };

  const clearSearch = () => {
    setFilteredHotels(liveHotels);
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
            {searchCriteria ? 'Search Results' : 'Popular Hotels'}
          </SectionTitle>

          {filteredHotels.length > 0 ? (
            <HotelsGrid>
              {filteredHotels.map(hotel => (
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
