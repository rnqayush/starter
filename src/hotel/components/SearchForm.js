import { useState } from 'react';
import styled from 'styled-components';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';

const SearchContainer = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.xl};
  margin-top: -${theme.spacing.xxl};
  position: relative;
  z-index: 10;
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: ${theme.spacing.lg};
  align-items: end;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
  font-size: 0.9rem;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 3rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.gray500};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 3rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  background: ${theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Icon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  color: ${theme.colors.gray500};
  font-size: 1.1rem;
  z-index: 1;
`;

const SearchButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  white-space: nowrap;
  height: fit-content;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: center;
  }
`;

const HotelSearchForm = ({ onSearch, initialValues = {} }) => {
  const [searchData, setSearchData] = useState({
    destination: initialValues.destination || '',
    checkIn: initialValues.checkIn || '',
    checkOut: initialValues.checkOut || '',
    guests: initialValues.guests || '2',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchData);
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="destination">Where to?</Label>
          <InputContainer>
            <Icon>
              <FaMapMarkerAlt />
            </Icon>
            <Input
              type="text"
              id="destination"
              name="destination"
              placeholder="City, hotel name..."
              value={searchData.destination}
              onChange={handleInputChange}
              required
            />
          </InputContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="checkIn">Check-in</Label>
          <InputContainer>
            <Icon>
              <FaCalendarAlt />
            </Icon>
            <Input
              type="date"
              id="checkIn"
              name="checkIn"
              value={searchData.checkIn}
              onChange={handleInputChange}
              min={today}
              required
            />
          </InputContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="checkOut">Check-out</Label>
          <InputContainer>
            <Icon>
              <FaCalendarAlt />
            </Icon>
            <Input
              type="date"
              id="checkOut"
              name="checkOut"
              value={searchData.checkOut}
              onChange={handleInputChange}
              min={searchData.checkIn || today}
              required
            />
          </InputContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="guests">Guests</Label>
          <InputContainer>
            <Icon>
              <FaUsers />
            </Icon>
            <Select
              id="guests"
              name="guests"
              value={searchData.guests}
              onChange={handleInputChange}
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </Select>
          </InputContainer>
        </FormGroup>

        <SearchButton type="submit">
          <FaSearch />
          Search
        </SearchButton>
      </SearchForm>
    </SearchContainer>
  );
};

export default HotelSearchForm;
