import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaCreditCard,
  FaShieldAlt,
  FaTruck,
  FaUndoAlt,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

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

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.xl} 0;
  border-top: 1px solid ${theme.colors.gray700};
  border-bottom: 1px solid ${theme.colors.gray700};
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const FeatureText = styled.div`
  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: ${theme.spacing.xs};
    color: ${theme.colors.white};
  }

  p {
    font-size: 0.8rem;
    color: ${theme.colors.gray400};
    margin: 0;
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
    border-color: ${theme.colors.primary};
  }
`;

const NewsletterButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
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

const PaymentMethods = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;
`;

const PaymentIcon = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.gray700};
  font-size: 0.8rem;
  font-weight: 600;
`;

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert("Thank you for subscribing to our newsletter!");
  };

  const features = [
    {
      icon: FaTruck,
      title: "Free Shipping",
      description: "On orders over $99",
    },
    {
      icon: FaUndoAlt,
      title: "30-Day Returns",
      description: "Money back guarantee",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Payment",
      description: "100% secure checkout",
    },
    {
      icon: FaCreditCard,
      title: "Multiple Payment",
      description: "All major cards accepted",
    },
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureItem key={index}>
              <FeatureIcon>
                <feature.icon />
              </FeatureIcon>
              <FeatureText>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </FeatureText>
            </FeatureItem>
          ))}
        </FeatureGrid>

        <NewsletterSection>
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter and get 10% off your first order!</p>
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
              <FaShoppingCart style={{ marginRight: theme.spacing.sm }} />
              ShopMart
            </h3>
            <p>
              Your one-stop destination for quality products at amazing prices.
              We bring you the latest trends and timeless classics.
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
            <h3>Shop</h3>
            <FooterLinks>
              <FooterLink to="/ecommerce/products">All Products</FooterLink>
              <FooterLink to="/ecommerce/products?category=electronics">
                Electronics
              </FooterLink>
              <FooterLink to="/ecommerce/products?category=fashion">
                Fashion
              </FooterLink>
              <FooterLink to="/ecommerce/products?category=home-garden">
                Home & Garden
              </FooterLink>
              <FooterLink to="/ecommerce/products?category=sports">
                Sports
              </FooterLink>
              <FooterLink to="/ecommerce/products?featured=true">
                Featured Products
              </FooterLink>
              <FooterLink to="/ecommerce/products?sale=true">Sale</FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Customer Service</h3>
            <FooterLinks>
              <FooterLink to="/ecommerce/contact">Contact Us</FooterLink>
              <FooterLink to="/ecommerce/shipping">Shipping Info</FooterLink>
              <FooterLink to="/ecommerce/returns">
                Returns & Exchanges
              </FooterLink>
              <FooterLink to="/ecommerce/size-guide">Size Guide</FooterLink>
              <FooterLink to="/ecommerce/faq">FAQ</FooterLink>
              <FooterLink to="/ecommerce/track-order">
                Track Your Order
              </FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <FaPhone />
              <span>+1 (555) 123-SHOP</span>
            </ContactInfo>
            <ContactInfo>
              <FaEnvelope />
              <span>support@shopmart.com</span>
            </ContactInfo>
            <ContactInfo>
              <FaMapMarkerAlt />
              <span>123 Commerce St, Shopping City, SC 12345</span>
            </ContactInfo>
            <p style={{ marginTop: theme.spacing.md, fontSize: "0.8rem" }}>
              <strong>Store Hours:</strong>
              <br />
              Mon-Fri: 9AM-9PM
              <br />
              Sat-Sun: 10AM-8PM
            </p>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <div>
            <p>
              &copy; 2024 ShopMart. All rights reserved. |
              <FooterLink
                to="/privacy"
                style={{ marginLeft: theme.spacing.sm }}
              >
                Privacy Policy
              </FooterLink>{" "}
              |
              <FooterLink to="/terms" style={{ marginLeft: theme.spacing.sm }}>
                Terms of Service
              </FooterLink>
            </p>
          </div>

          <PaymentMethods>
            <span style={{ marginRight: theme.spacing.sm, fontSize: "0.8rem" }}>
              We Accept:
            </span>
            <PaymentIcon>VISA</PaymentIcon>
            <PaymentIcon>MC</PaymentIcon>
            <PaymentIcon>AMEX</PaymentIcon>
            <PaymentIcon>DISC</PaymentIcon>
          </PaymentMethods>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
