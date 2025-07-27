import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHotel,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';

const FooterContainer = styled.footer`
  background: ${theme.colors.gray900};
  color: ${theme.colors.white};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xxl} ${theme.spacing.md} ${theme.spacing.xl};
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.white};
  }

  p {
    color: ${theme.colors.gray300};
    line-height: 1.6;
    margin-bottom: ${theme.spacing.md};
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const FooterLink = styled(Link)`
  color: ${theme.colors.gray300};
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.white};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray300};
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.gray700};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const NewsletterSection = styled.div`
  background: ${theme.colors.gray800};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};

  h3 {
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.gray300};
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  max-width: 400px;
  margin: 0 auto;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray600};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.gray700};
  color: ${theme.colors.white};
  font-size: 0.9rem;

  &::placeholder {
    color: ${theme.colors.gray400};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const NewsletterButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray700};
  color: ${theme.colors.gray400};
  font-size: 0.9rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    text-align: center;
  }
`;

const HotelFooter = () => {
  const location = useLocation();

  // Extract hotel slug from URL path like "/taj-palace/rooms/101"
  const hotelSlug = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    // For hotel routes, the first segment is usually the hotel slug
    return pathSegments.length > 0 && pathSegments[0] !== 'hotels'
      ? pathSegments[0]
      : '';
  }, [location.pathname]);

  const handleNewsletterSubmit = e => {
    e.preventDefault();
    // alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <FooterContainer>
      <FooterContent>
        <NewsletterSection>
          <h3>Get Special Offers & Updates</h3>
          <p>
            Subscribe to our newsletter and never miss exclusive deals and
            travel tips!
          </p>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Enter your email address"
              required
            />
            <NewsletterButton type="submit">Subscribe</NewsletterButton>
          </NewsletterForm>
        </NewsletterSection>

        <FooterTop>
          <FooterSection>
            <h3>
              <FaHotel style={{ marginRight: theme.spacing.sm }} />
              HotelBooker
            </h3>
            <p>
              Your trusted partner for finding and booking the perfect
              accommodation. From luxury resorts to cozy lodges, we have it all.
            </p>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                <FaFacebook />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLinks>
              <FooterLink to="/hotels">Find Hotels</FooterLink>
              <FooterLink to="/my-bookings">My Bookings</FooterLink>
              <FooterLink
                to={hotelSlug ? `/${hotelSlug}/owner` : '/owner/dashboard'}
              >
                Hotel Owners
              </FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/help">Help & Support</FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Popular Destinations</h3>
            <FooterLinks>
              <FooterLink to="/hotels?city=mumbai">Mumbai Hotels</FooterLink>
              <FooterLink to="/hotels?city=delhi">Delhi Hotels</FooterLink>
              <FooterLink to="/hotels?city=bangalore">
                Bangalore Hotels
              </FooterLink>
              <FooterLink to="/hotels?city=goa">Goa Hotels</FooterLink>
              <FooterLink to="/hotels?city=jaipur">Jaipur Hotels</FooterLink>
              <FooterLink to="/hotels?city=manali">Manali Hotels</FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <FaPhone />
              <span>+91 1800-HOTELS</span>
            </ContactInfo>
            <ContactInfo>
              <FaEnvelope />
              <span>support@hotelbooker.com</span>
            </ContactInfo>
            <ContactInfo>
              <FaMapMarkerAlt />
              <span>123 Travel Street, Tourism City, TC 12345</span>
            </ContactInfo>
            <p style={{ marginTop: theme.spacing.md, fontSize: '0.8rem' }}>
              <strong>Customer Support:</strong>
              <br />
              Available 24/7 for all your booking needs
            </p>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <div>
            <p>
              &copy; 2024 HotelBooker. All rights reserved. |
              <FooterLink
                to="/privacy"
                style={{ marginLeft: theme.spacing.sm }}
              >
                Privacy Policy
              </FooterLink>{' '}
              |
              <FooterLink to="/terms" style={{ marginLeft: theme.spacing.sm }}>
                Terms of Service
              </FooterLink>
            </p>
          </div>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default HotelFooter;
