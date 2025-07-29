import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaQuoteLeft,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowLeft,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { fetchBusinessData } from '../../utils/businessAPI';
import {
  initializeBusinessData,
  setBusinessType,
  setLoading,
  setError,
  clearError,
} from '../../store/slices/businessManagementSlice';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.white};
`;

// Navbar Styles
const Navbar = styled.nav`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 40;
  transition: top 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.sm};
    height: 60px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    height: auto;
    min-height: 60px;
    padding: ${theme.spacing.sm};
  }
`;

const Logo = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'primaryColor',
})`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${props => props.primaryColor || theme.colors.primary};
  flex: 1;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.3rem;
    flex: none;
    width: 100%;
    text-align: center;
    margin-bottom: ${theme.spacing.sm};
  }
`;

const NavLinks = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'primaryColor',
})`
  display: flex;
  gap: ${theme.spacing.xl};
  flex: 2;
  justify-content: center;

  a {
    text-decoration: none;
    color: ${theme.colors.gray700};
    font-weight: 500;
    padding: ${theme.spacing.sm} 0;
    position: relative;
    transition: color 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: ${props => props.primaryColor || theme.colors.primary};
    }

    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background: ${props => props.primaryColor || theme.colors.primary};
      transition: width 0.3s ease;
    }

    &:hover:after {
      width: 100%;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const OwnerLink = styled.button`
  background: transparent;
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: 2px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex: 1;
  justify-content: flex-end;
  min-height: 44px;

  &:hover {
    background: ${theme.colors.gray50};
    border-color: ${theme.colors.gray400};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 0.9rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex: none;
    width: 100%;
    justify-content: center;
    margin-top: ${theme.spacing.sm};
    min-height: 48px;
  }
`;

const BackToListButton = styled.button`
  background: transparent;
  color: ${theme.colors.gray600};
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: ${theme.spacing.md};

  &:hover {
    background: ${theme.colors.gray50};
  }
`;

// Section Styles
const Section = styled.section.withConfig({
  shouldForwardProp: prop => prop !== 'isVisible',
})`
  padding: ${theme.spacing.xxl} 0;
  background: ${props => props.background || theme.colors.white};
  display: ${props => (props.isVisible === false ? 'none' : 'block')};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xl} 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg} 0;
  }
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.sm};
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.2rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.8rem;
    margin-bottom: ${theme.spacing.sm};
  }
`;

const HeroSection = styled.section.withConfig({
  shouldForwardProp: prop =>
    prop !== 'primaryColor' && prop !== 'backgroundImage',
})`
  height: 100vh;
  background:
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
    url(${props =>
      props.backgroundImage ||
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&w=1200&q=80'});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  position: relative;
  z-index: 1;
  color: ${theme.colors.white};
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 3rem;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.xxl};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  opacity: 0.95;
`;

const FreelancerPortfolioPage = () => {
  const { businessSlug, slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Support both businessSlug (legacy routes) and slug (new optimized routes)
  const actualSlug = businessSlug || slug || 'freelancer';

  // Get business data from Redux store
  const {
    businesses,
    editingBusiness,
    businessType,
    businessTypeConfig,
    sectionVisibility,
    loading,
    error,
  } = useSelector(state => state.businessManagement);

  // Get the current business data (prioritize editing business for real-time updates)
  const currentBusiness =
    editingBusiness && editingBusiness.slug === actualSlug
      ? editingBusiness
      : businesses.find(b => b.slug === actualSlug);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        // For freelancer portfolio, use 'personal' or 'freelancer' slug
        const extractedSlug = 'personal'; // Always load personal/freelancer data

        // Check if we already have business data in Redux
        const existingBusiness = businesses.find(
          b => b.slug === extractedSlug || b.type === 'freelancer'
        );
        if (existingBusiness) {
          console.log(
            'Using existing freelancer business data from Redux:',
            existingBusiness
          );
          dispatch(setLoading(false));
          return;
        }

        // Make API call to get freelancer business data
        console.log(
          `[FreelancerPortfolioPage] Making API call for freelancer: ${extractedSlug}`
        );
        const response = await fetchBusinessData(extractedSlug);

        if (response.success && response.data) {
          const { businessData, businessType, businessTypeConfig } =
            response.data;

          console.log(
            '[FreelancerPortfolioPage] API call successful:',
            response.data
          );

          // Initialize Redux state with business data and type config
          dispatch(
            initializeBusinessData({
              businessData,
              businessTypeConfig,
            })
          );

          dispatch(
            setBusinessType({
              businessType,
              businessTypeConfig,
            })
          );
        } else {
          dispatch(setError('Freelancer portfolio not found'));
        }
      } catch (err) {
        console.error(
          '[FreelancerPortfolioPage] Error fetching freelancer data:',
          err
        );
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [actualSlug, location.pathname, dispatch, businesses]);

  const handleBackToList = () => {
    navigate('/business-websites');
  };

  const handleOwnerClick = () => {
    navigate(`/${actualSlug}/adminpanel`);
  };

  if (loading) {
    return (
      <PageContainer>
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>Loading...</h2>
          <p>Fetching freelancer portfolio data...</p>
        </div>
      </PageContainer>
    );
  }

  if (error || !currentBusiness) {
    return (
      <PageContainer>
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>Freelancer Portfolio Not Found</h2>
          <p>
            {error ||
              "The freelancer portfolio you're looking for doesn't exist."}
          </p>
          <button
            onClick={handleBackToList}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: theme.colors.primary,
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Back to Business Websites
          </button>
        </div>
      </PageContainer>
    );
  }

  // Freelancer-specific navigation items
  const getFreelancerNavigationItems = () => {
    return [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Skills', href: '#skills' },
      { name: 'Services', href: '#services' },
      { name: 'Experience', href: '#experience' },
      { name: 'Packages', href: '#packages' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Contact', href: '#contact' },
    ];
  };

  const navigationItems =
    currentBusiness.navigation?.menuItems || getFreelancerNavigationItems();

  return (
    <PageContainer>
      {/* Navbar */}
      <Navbar>
        <NavContainer>
          <BackToListButton onClick={handleBackToList}>
            <FaArrowLeft />
          </BackToListButton>
          <Logo primaryColor={currentBusiness.primaryColor}>
            {currentBusiness.navigation?.logo || currentBusiness.name}
          </Logo>
          <NavLinks primaryColor={currentBusiness.primaryColor}>
            {navigationItems.map((item, index) => (
              <a key={index} href={item.href}>
                {item.name}
              </a>
            ))}
          </NavLinks>
          <OwnerLink onClick={handleOwnerClick}>
            <FaEdit />
            Admin Panel
          </OwnerLink>
        </NavContainer>
      </Navbar>

      {/* Hero Section */}
      {sectionVisibility.hero && (
        <HeroSection
          id="home"
          primaryColor={currentBusiness.primaryColor}
          backgroundImage={currentBusiness.hero?.backgroundImage}
        >
          <HeroContent>
            <HeroTitle>
              {currentBusiness.hero?.title || currentBusiness.name}
            </HeroTitle>
            <HeroSubtitle>
              {currentBusiness.hero?.subtitle ||
                `Welcome to ${currentBusiness.name}`}
            </HeroSubtitle>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                style={{
                  background:
                    currentBusiness.primaryColor || theme.colors.primary,
                  color: 'white',
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {currentBusiness.hero?.ctaText || 'Hire Me'}
              </button>
            </div>
          </HeroContent>
        </HeroSection>
      )}

      {/* About Section */}
      {sectionVisibility['about-us'] && (
        <Section id="about" background={theme.colors.gray50}>
          <SectionContainer>
            <SectionTitle>
              {currentBusiness.about?.title || 'About Me'}
            </SectionTitle>
            <div
              style={{
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: theme.colors.gray600,
                  marginBottom: '2rem',
                }}
              >
                {currentBusiness.about?.description ||
                  `Learn more about ${currentBusiness.name}`}
              </p>

              {/* Statistics */}
              {currentBusiness.about?.stats && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '3rem',
                  }}
                >
                  {currentBusiness.about.stats.map((stat, index) => (
                    <div
                      key={index}
                      style={{
                        textAlign: 'center',
                        padding: '1.5rem',
                        background: theme.colors.white,
                        borderRadius: '12px',
                        boxShadow: theme.shadows.sm,
                      }}
                    >
                      <div
                        style={{
                          fontSize: '2.5rem',
                          fontWeight: '800',
                          color: currentBusiness.primaryColor,
                          marginBottom: '0.5rem',
                        }}
                      >
                        {stat.number}
                      </div>
                      <div
                        style={{
                          color: theme.colors.gray600,
                          fontWeight: '500',
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SectionContainer>
        </Section>
      )}

      {/* Portfolio Section */}
      {sectionVisibility.portfolio && currentBusiness.portfolio && (
        <Section id="portfolio">
          <SectionContainer>
            <SectionTitle>My Portfolio</SectionTitle>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem',
                marginTop: '3rem',
              }}
            >
              {currentBusiness.portfolio.map((project, index) => (
                <div
                  key={project.id || index}
                  style={{
                    background: theme.colors.white,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: theme.shadows.md,
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      height: '200px',
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: `${currentBusiness.primaryColor}20`,
                    }}
                  />
                  <div style={{ padding: '1.5rem' }}>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: currentBusiness.primaryColor,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {project.category}
                    </div>
                    <h3
                      style={{
                        fontSize: '1.3rem',
                        fontWeight: '600',
                        marginBottom: '1rem',
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        color: theme.colors.gray600,
                        lineHeight: '1.6',
                        marginBottom: '1rem',
                      }}
                    >
                      {project.description}
                    </p>
                    {project.technologies && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                        }}
                      >
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            style={{
                              background: theme.colors.gray100,
                              color: theme.colors.gray700,
                              padding: '0.25rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              fontWeight: '500',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>
        </Section>
      )}

      {/* Skills Section */}
      {sectionVisibility.skills && currentBusiness.skills && (
        <Section id="skills" background={theme.colors.gray50}>
          <SectionContainer>
            <SectionTitle>My Skills</SectionTitle>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginTop: '3rem',
              }}
            >
              {currentBusiness.skills.map((skill, index) => (
                <div
                  key={skill.id || index}
                  style={{
                    background: theme.colors.white,
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: theme.shadows.sm,
                    border: `1px solid ${theme.colors.gray200}`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <div style={{ fontSize: '1.5rem' }}>{skill.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: '600', marginBottom: '2px' }}>
                        {skill.name}
                      </h4>
                      <div
                        style={{
                          fontSize: '0.9rem',
                          color: currentBusiness.primaryColor,
                          fontWeight: '600',
                        }}
                      >
                        {skill.level}%
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      height: '8px',
                      background: theme.colors.gray200,
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${currentBusiness.primaryColor}, ${currentBusiness.primaryColor}cc)`,
                        borderRadius: '4px',
                        width: `${skill.level}%`,
                        transition: 'width 2s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>
        </Section>
      )}

      {/* Services Section */}
      {sectionVisibility['services-offered'] && currentBusiness.services && (
        <Section id="services">
          <SectionContainer>
            <SectionTitle>My Services</SectionTitle>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginTop: '3rem',
              }}
            >
              {currentBusiness.services.map((service, index) => (
                <div
                  key={service.id || index}
                  style={{
                    background: theme.colors.white,
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: theme.shadows.md,
                    textAlign: 'center',
                    transition: 'transform 0.3s ease',
                    border: `1px solid ${theme.colors.gray200}`,
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      margin: '0 auto 1.5rem',
                      background: currentBusiness.primaryColor,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      color: 'white',
                    }}
                  >
                    {service.icon || '⚡'}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                    }}
                  >
                    {service.name}
                  </h3>
                  <p
                    style={{
                      color: theme.colors.gray600,
                      lineHeight: '1.6',
                      marginBottom: '1rem',
                    }}
                  >
                    {service.description}
                  </p>
                  {service.price && (
                    <div
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: currentBusiness.primaryColor,
                      }}
                    >
                      {service.price}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionContainer>
        </Section>
      )}

      {/* Experience Section */}
      {sectionVisibility.experience && currentBusiness.experience && (
        <Section id="experience" background={theme.colors.gray50}>
          <SectionContainer>
            <SectionTitle>My Experience</SectionTitle>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {currentBusiness.experience.map((job, index) => (
                <div
                  key={job.id || index}
                  style={{
                    background: theme.colors.white,
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: theme.shadows.sm,
                    marginBottom: '1.5rem',
                    border: `1px solid ${theme.colors.gray200}`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '1rem',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: '1.3rem',
                          fontWeight: '600',
                          color: theme.colors.gray900,
                        }}
                      >
                        {job.role}
                      </h3>
                      <div
                        style={{
                          fontSize: '1.1rem',
                          color: currentBusiness.primaryColor,
                          fontWeight: '600',
                        }}
                      >
                        {job.company}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: '0.9rem',
                        color: theme.colors.gray600,
                        fontWeight: '500',
                        textAlign: 'right',
                      }}
                    >
                      {job.period}
                    </div>
                  </div>
                  <p style={{ color: theme.colors.gray600, lineHeight: '1.6' }}>
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionContainer>
        </Section>
      )}

      {/* Packages Section */}
      {sectionVisibility['packages-pricing'] && currentBusiness.packages && (
        <Section id="packages">
          <SectionContainer>
            <SectionTitle>Service Packages</SectionTitle>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginTop: '3rem',
              }}
            >
              {currentBusiness.packages.map((pkg, index) => (
                <div
                  key={pkg.id || index}
                  style={{
                    background: theme.colors.white,
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: pkg.featured
                      ? theme.shadows.lg
                      : theme.shadows.md,
                    textAlign: 'center',
                    position: 'relative',
                    border: pkg.featured
                      ? `2px solid ${currentBusiness.primaryColor}`
                      : `1px solid ${theme.colors.gray200}`,
                    transform: pkg.featured ? 'scale(1.05)' : 'none',
                  }}
                >
                  {pkg.featured && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: currentBusiness.primaryColor,
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                      }}
                    >
                      MOST POPULAR
                    </div>
                  )}
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      marginBottom: '1rem',
                    }}
                  >
                    {pkg.name}
                  </h3>
                  <div
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: '800',
                      color: currentBusiness.primaryColor,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {pkg.price}
                  </div>
                  <div
                    style={{
                      color: theme.colors.gray600,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {pkg.duration}
                  </div>
                  <p
                    style={{
                      color: theme.colors.gray600,
                      lineHeight: '1.6',
                      marginBottom: '2rem',
                    }}
                  >
                    {pkg.description}
                  </p>
                  {pkg.features && (
                    <ul style={{ textAlign: 'left', marginBottom: '2rem' }}>
                      {pkg.features.map((feature, i) => (
                        <li
                          key={i}
                          style={{
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <span
                            style={{
                              color: currentBusiness.primaryColor,
                              marginRight: '0.5rem',
                            }}
                          >
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    style={{
                      background: pkg.featured
                        ? currentBusiness.primaryColor
                        : 'transparent',
                      color: pkg.featured
                        ? 'white'
                        : currentBusiness.primaryColor,
                      border: `2px solid ${currentBusiness.primaryColor}`,
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </SectionContainer>
        </Section>
      )}

      {/* Testimonials Section */}
      {sectionVisibility.testimonials && currentBusiness.testimonials && (
        <Section id="testimonials" background={theme.colors.gray50}>
          <SectionContainer>
            <SectionTitle>Client Testimonials</SectionTitle>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem',
                marginTop: '3rem',
              }}
            >
              {currentBusiness.testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id || index}
                  style={{
                    background: theme.colors.white,
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: theme.shadows.sm,
                    position: 'relative',
                    border: `1px solid ${theme.colors.gray200}`,
                  }}
                >
                  <FaQuoteLeft
                    style={{
                      color: currentBusiness.primaryColor,
                      fontSize: '1.5rem',
                      marginBottom: '1rem',
                    }}
                  />
                  <p
                    style={{
                      color: theme.colors.gray700,
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                      fontStyle: 'italic',
                    }}
                  >
                    "{testimonial.text}"
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: '600',
                          color: theme.colors.gray900,
                        }}
                      >
                        {testimonial.name}
                      </div>
                      {testimonial.service && (
                        <div
                          style={{
                            fontSize: '0.9rem',
                            color: theme.colors.gray600,
                          }}
                        >
                          {testimonial.service}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <FaStar
                          key={i}
                          style={{ color: '#fbbf24', fontSize: '1rem' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>
        </Section>
      )}

      {/* Contact Section */}
      {sectionVisibility.contact && (
        <Section id="contact">
          <SectionContainer>
            <SectionTitle>
              {currentBusiness.contact?.title || "Let's Work Together"}
            </SectionTitle>
            <div
              style={{
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '1.1rem',
                  color: theme.colors.gray600,
                  marginBottom: '2rem',
                }}
              >
                {currentBusiness.contact?.description ||
                  "Have a project in mind? I'd love to hear about it!"}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  alignItems: 'center',
                }}
              >
                {currentBusiness.contact?.phone && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <FaPhone style={{ color: currentBusiness.primaryColor }} />
                    <span>{currentBusiness.contact.phone}</span>
                  </div>
                )}

                {currentBusiness.contact?.email && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <FaEnvelope
                      style={{ color: currentBusiness.primaryColor }}
                    />
                    <span>{currentBusiness.contact.email}</span>
                  </div>
                )}

                {currentBusiness.contact?.address && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <FaMapMarkerAlt
                      style={{ color: currentBusiness.primaryColor }}
                    />
                    <span>{currentBusiness.contact.address}</span>
                  </div>
                )}
              </div>
            </div>
          </SectionContainer>
        </Section>
      )}
    </PageContainer>
  );
};

export default FreelancerPortfolioPage;
