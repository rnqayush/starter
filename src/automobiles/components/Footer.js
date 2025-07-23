import React from 'react';
import styled from 'styled-components';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';

const FooterContainer = styled.footer.withConfig({
  shouldForwardProp: prop => !['backgroundColor', 'textColor'].includes(prop),
})`
  background: ${props => props.backgroundColor || theme.colors.gray900};
  color: ${props => props.textColor || theme.colors.white};
  padding: ${theme.spacing.xxl} 0 ${theme.spacing.lg} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.white};
  }

  p,
  a {
    color: ${theme.colors.gray300};
    line-height: 1.6;
    margin-bottom: ${theme.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    text-decoration: none;

    &:hover {
      color: ${theme.colors.white};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  color: ${theme.colors.gray400};
  font-size: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.white};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${theme.colors.gray700};
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  text-align: center;
  color: ${theme.colors.gray400};
  font-size: 0.9rem;
`;

const Footer = ({
  dealerSlug = '',
  dealer = null,
  theme: customTheme = {},
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer
      backgroundColor={customTheme.backgroundColor}
      textColor={customTheme.textColor}
    >
      <FooterContent>
        <FooterSection>
          <h3>{dealer?.name || 'Auto Dealer'}</h3>
          <p>{dealer?.description || 'Your trusted automobile dealer.'}</p>
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
          <h3>Contact Info</h3>
          {dealer?.phone && (
            <a href={`tel:${dealer.phone}`}>
              <FaPhone />
              {dealer.phone}
            </a>
          )}
          {dealer?.email && (
            <a href={`mailto:${dealer.email}`}>
              <FaEnvelope />
              {dealer.email}
            </a>
          )}
          {dealer?.address && (
            <p>
              <FaMapMarkerAlt />
              {dealer.address}, {dealer.city}, {dealer.state}
            </p>
          )}
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <a href={`/${dealerSlug}/vehicles`}>Browse Vehicles</a>
          <a href={`/${dealerSlug}/vehicles?category=luxury-cars`}>
            Luxury Cars
          </a>
          <a href={`/${dealerSlug}/vehicles?category=electric-vehicles`}>
            Electric Vehicles
          </a>
          <a href={`/${dealerSlug}/financing`}>Financing</a>
          <a href={`/${dealerSlug}/trade-in`}>Trade-In</a>
        </FooterSection>

        <FooterSection>
          <h3>Services</h3>
          <button type="button">Vehicle Sales</button>
          <button type="button">Financing Options</button>
          <button type="button">Trade-In Appraisal</button>
          <button type="button">Service & Maintenance</button>
          <button type="button">Extended Warranties</button>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>
          &copy; {currentYear} {dealer?.name || 'Auto Dealer'}. All rights
          reserved.
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
