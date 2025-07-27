import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
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
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.white};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  div {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    color: ${theme.colors.gray300};
    font-size: 0.9rem;

    svg {
      color: ${theme.colors.primary};
      width: 16px;
      height: 16px;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${theme.colors.gray800};
  border-radius: 50%;
  color: ${theme.colors.gray400};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    transform: translateY(-2px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray800};
  color: ${theme.colors.gray400};
  font-size: 0.85rem;
`;

const HotelFooter = () => {
  // Get footer data from Redux (live hotel data)
  const hotels = useSelector(state => state.hotelManagement?.liveHotels || []);
  const hotel = hotels.length > 0 ? hotels[0] : null;

  const footerData = hotel?.sections?.footer;
  const supportContact = footerData?.supportContact || {};
  const socialLinks = footerData?.socialLinks || [];

  const getSocialIcon = iconName => {
    const icons = {
      FaFacebook: FaFacebook,
      FaTwitter: FaTwitter,
      FaInstagram: FaInstagram,
      FaLinkedin: FaLinkedin,
      FaGlobe: FaGlobe,
    };
    return icons[iconName] || FaGlobe;
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterSection>
            <h3>Support Contact</h3>
            <ContactInfo>
              {supportContact.phone && (
                <div>
                  <FaPhone />
                  <span>{supportContact.phone}</span>
                </div>
              )}
              {supportContact.email && (
                <div>
                  <FaEnvelope />
                  <span>{supportContact.email}</span>
                </div>
              )}
              {supportContact.address && (
                <div>
                  <FaMapMarkerAlt />
                  <span>{supportContact.address}</span>
                </div>
              )}
            </ContactInfo>
          </FooterSection>

          <FooterSection>
            <h3>Follow Us</h3>
            <SocialLinks>
              {socialLinks.map((link, index) => {
                const IconComponent = getSocialIcon(link.icon);
                return (
                  <SocialLink
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.platform}
                  >
                    <IconComponent />
                  </SocialLink>
                );
              })}
            </SocialLinks>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <p>© 2024 {hotel?.name || 'Hotel'}. All rights reserved.</p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default HotelFooter;
