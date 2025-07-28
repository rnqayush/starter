import React from 'react';
import styled from 'styled-components';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
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

  button {
    background: none;
    border: none;
    color: ${theme.colors.gray300};
    line-height: 1.6;
    margin-bottom: ${theme.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    text-decoration: none;
    cursor: pointer;
    padding: 0;
    font-size: inherit;

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
  content = {},
}) => {
  const currentYear = new Date().getFullYear();
  const vendorData = dealer || {};
  const contact = vendorData.contact || {};
  const businessInfo = vendorData.businessInfo || {};
  const socialMedia = businessInfo.socialMedia || {};

  const shouldShowSection = (sectionName) => {
    return content[`show${sectionName}`] !== false;
  };

  return (
    <FooterContainer
      backgroundColor={content.backgroundColor || customTheme.backgroundColor}
      textColor={customTheme.textColor}
    >
      <FooterContent>
        <FooterSection>
          <h3>{vendorData.name || 'Auto Dealer'}</h3>
          <p>
            {content.customText || 
             businessInfo.description || 
             'Your trusted automobile dealer.'}
          </p>
          {shouldShowSection('SocialMedia') && (
            <SocialLinks>
              {socialMedia.facebook && (
                <SocialLink href={socialMedia.facebook} aria-label="Facebook" target="_blank" rel="noopener">
                  <FaFacebook />
                </SocialLink>
              )}
              {socialMedia.twitter && (
                <SocialLink href={socialMedia.twitter} aria-label="Twitter" target="_blank" rel="noopener">
                  <FaTwitter />
                </SocialLink>
              )}
              {socialMedia.instagram && (
                <SocialLink href={socialMedia.instagram} aria-label="Instagram" target="_blank" rel="noopener">
                  <FaInstagram />
                </SocialLink>
              )}
              {socialMedia.youtube && (
                <SocialLink href={socialMedia.youtube} aria-label="YouTube" target="_blank" rel="noopener">
                  <FaYoutube />
                </SocialLink>
              )}
              {socialMedia.linkedin && (
                <SocialLink href={socialMedia.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener">
                  <FaLinkedin />
                </SocialLink>
              )}
            </SocialLinks>
          )}
        </FooterSection>

        {shouldShowSection('Contact') && (
          <FooterSection>
            <h3>Contact Info</h3>
            {(content.contactInfo?.phone || contact.phone) && (
              <a href={`tel:${content.contactInfo?.phone || contact.phone}`}>
                <FaPhone />
                {content.contactInfo?.phone || contact.phone}
              </a>
            )}
            {(content.contactInfo?.email || contact.email) && (
              <a href={`mailto:${content.contactInfo?.email || contact.email}`}>
                <FaEnvelope />
                {content.contactInfo?.email || contact.email}
              </a>
            )}
            {(content.contactInfo?.address || contact.address) && (
              <p>
                <FaMapMarkerAlt />
                {content.contactInfo?.address || (contact.address.street + ', ' + contact.address.city + ', ' + contact.address.state)}
              </p>
            )}
            {content.contactCustomFields && content.contactCustomFields.map((field, index) => (
              field.name && field.value && (
                <p key={index}>
                  {field.name}: {field.value}
                </p>
              )
            ))}
          </FooterSection>
        )}

        {shouldShowSection('Support') && (
          <FooterSection>
            <h3>Customer Support</h3>
            {content.supportInfo?.supportPhone && (
              <a href={`tel:${content.supportInfo.supportPhone}`}>
                <FaPhone />
                {content.supportInfo.supportPhone}
              </a>
            )}
            {content.supportInfo?.supportEmail && (
              <a href={`mailto:${content.supportInfo.supportEmail}`}>
                <FaEnvelope />
                {content.supportInfo.supportEmail}
              </a>
            )}
            {content.supportInfo?.supportHours && (
              <p>
                <FaClock />
                {content.supportInfo.supportHours}
              </p>
            )}
            {content.supportCustomFields && content.supportCustomFields.map((field, index) => (
              field.name && field.value && (
                <p key={index}>
                  {field.name}: {field.value}
                </p>
              )
            ))}
          </FooterSection>
        )}



        {shouldShowSection('Hours') && contact.hours && (
          <FooterSection>
            <h3>Business Hours</h3>
            <p>
              <FaClock />
              Monday - Friday: {contact.hours.monday?.open || '9:00'} - {contact.hours.friday?.close || '19:00'}
            </p>
            <p>
              <FaClock />
              Saturday: {contact.hours.saturday?.open || '10:00'} - {contact.hours.saturday?.close || '20:00'}
            </p>
            <p>
              <FaClock />
              Sunday: {contact.hours.sunday?.open || '12:00'} - {contact.hours.sunday?.close || '18:00'}
            </p>
          </FooterSection>
        )}

        {shouldShowSection('QuickLinks') && businessInfo.quickLinks && businessInfo.quickLinks.length > 0 && (
          <FooterSection>
            <h3>Quick Links</h3>
            {businessInfo.quickLinks.filter(link => link.visible !== false).map((link, index) => (
              <a key={index} href={`/${dealerSlug}${link.url}`}>{link.name}</a>
            ))}
          </FooterSection>
        )}
      </FooterContent>

      <FooterBottom>
        <p>
          &copy; {currentYear} {vendorData.name || 'Auto Dealer'}. All rights reserved.
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
