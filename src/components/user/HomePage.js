import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaSearch, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import Header from "../shared/Header";
import { Button } from "../shared/Button";
import {
  Card,
  CardImage,
  CardContent,
  CardTitle,
  Price,
  PriceUnit,
} from "../shared/Card";
import {
  Input,
  FormGroup,
  Label,
  Select,
  SearchInput,
  SearchField,
  SearchIcon,
} from "../shared/Input";
import { theme } from "../../styles/GlobalStyle";
import { useAppContext } from "../../context/AppContext";

const PageContainer = styled.div`
  min-height: 100vh;
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
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: ${theme.spacing.xxl};
  opacity: 0.9;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const SearchCard = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.xl};
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: ${theme.spacing.md};
  align-items: end;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const HotelsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  color: ${theme.colors.gray900};
`;

const HotelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const HotelCard = styled(Card)`
  cursor: pointer;
`;

const HotelInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const HotelDetails = styled.div`
  flex: 1;
`;

const LocationText = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.gray600};
  font-size: 0.875rem;
  margin-bottom: ${theme.spacing.sm};
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.accent};
  font-size: 0.875rem;
`;

const PriceSection = styled.div`
  text-align: right;
`;

const HomePage = () => {
  const { hotels } = useAppContext();
  const [searchForm, setSearchForm] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  const handleInputChange = (e) => {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Search:", searchForm);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }

    return stars;
  };

  return (
    <PageContainer>
      <Header />

      <HeroSection>
        <HeroContent>
          <HeroTitle>Find Your Perfect Stay</HeroTitle>
          <HeroSubtitle>
            Discover amazing hotels and book your next adventure
          </HeroSubtitle>

          <SearchCard>
            <SearchForm onSubmit={handleSearch}>
              <FormGroup>
                <Label>Destination</Label>
                <SearchInput>
                  <SearchIcon>
                    <FaMapMarkerAlt />
                  </SearchIcon>
                  <SearchField
                    hasIcon
                    type="text"
                    name="destination"
                    placeholder="Where are you going?"
                    value={searchForm.destination}
                    onChange={handleInputChange}
                  />
                </SearchInput>
              </FormGroup>

              <FormGroup>
                <Label>Check-in</Label>
                <Input
                  type="date"
                  name="checkIn"
                  value={searchForm.checkIn}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Check-out</Label>
                <Input
                  type="date"
                  name="checkOut"
                  value={searchForm.checkOut}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Guests</Label>
                <Select
                  name="guests"
                  value={searchForm.guests}
                  onChange={handleInputChange}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </Select>
              </FormGroup>

              <Button type="submit" size="large">
                <FaSearch />
                Search
              </Button>
            </SearchForm>
          </SearchCard>
        </HeroContent>
      </HeroSection>

      <HotelsSection>
        <div className="container">
          <SectionTitle>Popular Hotels</SectionTitle>
          <HotelsGrid>
            {hotels.map((hotel) => (
              <Link key={hotel.id} to={`/hotel/${hotel.id}`}>
                <HotelCard>
                  <CardImage src={hotel.image} height="250px" />
                  <CardContent>
                    <HotelInfo>
                      <HotelDetails>
                        <CardTitle>{hotel.name}</CardTitle>
                        <LocationText>
                          <FaMapMarkerAlt />
                          {hotel.location}
                        </LocationText>
                        <Rating>
                          {renderStars(hotel.rating)}
                          <span>{hotel.rating}</span>
                        </Rating>
                      </HotelDetails>
                      <PriceSection>
                        <Price>
                          ₹{hotel.startingPrice.toLocaleString()}
                          <PriceUnit>/night</PriceUnit>
                        </Price>
                      </PriceSection>
                    </HotelInfo>
                    <Button variant="secondary" style={{ width: "100%" }}>
                      View Hotel
                    </Button>
                  </CardContent>
                </HotelCard>
              </Link>
            ))}
          </HotelsGrid>
        </div>
      </HotelsSection>
    </PageContainer>
  );
};

export default HomePage;
