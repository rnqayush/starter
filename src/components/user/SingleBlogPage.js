import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaHeart,
  FaTag,
  FaUser,
  FaShare,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaCopy,
} from 'react-icons/fa';
import { theme, media } from '../../styles/GlobalStyle';
import Header from '../shared/Header';
import blogsData from '../../DummyData/blogs.json';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
  padding-top: 80px;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(102, 126, 234, 0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
    pointer-events: none;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  position: relative;
  z-index: 1;

  ${media.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.3s ease;
  background: rgba(102, 126, 234, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(102, 126, 234, 0.2);
  animation: slideInLeft 0.6s ease-out;

  @keyframes slideInLeft {
    0% {
      opacity: 0;
      transform: translateX(-20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &:hover {
    background: rgba(102, 126, 234, 0.15);
    transform: translateX(-5px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }
`;

const BlogHeader = styled.div`
  margin-bottom: ${theme.spacing.xxl};
  animation: fadeInUp 0.8s ease-out 0.2s both;

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CategoryBadge = styled.div`
  display: inline-block;
  background: ${props => props.color || theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

const BlogTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.lg} 0;
  line-height: 1.2;
  background: linear-gradient(135deg, #1f2937, #374151, #1f2937);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease-in-out infinite;

  @keyframes shimmer {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  ${media.tablet} {
    font-size: 2.5rem;
  }

  ${media.mobile} {
    font-size: 2rem;
  }
`;

const BlogMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.lg};
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.sm};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  ${media.mobile} {
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.md};
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const AuthorAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${theme.borderRadius.full};
  object-fit: cover;
  border: 3px solid ${theme.colors.primary};
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }
`;

const AuthorDetails = styled.div`
  h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: ${theme.colors.gray600};
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${theme.colors.primary};
    transform: translateY(-2px);
  }

  svg {
    color: ${theme.colors.primary};
  }
`;

const FeaturedImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: ${theme.borderRadius.xl};
  margin-bottom: ${theme.spacing.xxl};
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: fadeInScale 1s ease-out 0.4s both;

  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.1) 0%,
      rgba(118, 75, 162, 0.1) 50%,
      rgba(240, 147, 251, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  ${media.mobile} {
    height: 250px;
  }
`;

const ShareSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xxl};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.sm};
  animation: slideInRight 0.8s ease-out 0.6s both;

  @keyframes slideInRight {
    0% {
      opacity: 0;
      transform: translateX(30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  ${media.mobile} {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ShareLabel = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray700};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &.twitter {
    background: linear-gradient(135deg, #1da1f2, #0d8bd9);
    color: white;

    &:hover {
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 8px 20px rgba(29, 161, 242, 0.4);
    }
  }

  &.facebook {
    background: linear-gradient(135deg, #4267b2, #365899);
    color: white;

    &:hover {
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 8px 20px rgba(66, 103, 178, 0.4);
    }
  }

  &.linkedin {
    background: linear-gradient(135deg, #0077b5, #005885);
    color: white;

    &:hover {
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 8px 20px rgba(0, 119, 181, 0.4);
    }
  }

  &.copy {
    background: linear-gradient(135deg, #6b7280, #4b5563);
    color: white;

    &:hover {
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 8px 20px rgba(107, 114, 128, 0.4);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

const BlogContent = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.sm};
  line-height: 1.8;
  font-size: 1.1rem;
  color: ${theme.colors.gray800};
  animation: fadeInUp 1s ease-out 0.8s both;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: ${theme.colors.gray900};
    margin: ${theme.spacing.xxl} 0 ${theme.spacing.lg} 0;
    position: relative;
    padding-left: ${theme.spacing.md};

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(
        135deg,
        ${theme.colors.primary},
        ${theme.colors.secondary}
      );
      border-radius: 2px;
    }
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.gray800};
    margin: ${theme.spacing.xl} 0 ${theme.spacing.md} 0;
  }

  p {
    margin-bottom: ${theme.spacing.lg};
    text-align: justify;
  }

  ul,
  ol {
    margin: ${theme.spacing.lg} 0;
    padding-left: ${theme.spacing.xl};

    li {
      margin-bottom: ${theme.spacing.sm};

      strong {
        color: ${theme.colors.primary};
      }
    }
  }

  blockquote {
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.05),
      rgba(240, 147, 251, 0.05)
    );
    border-left: 4px solid ${theme.colors.primary};
    padding: ${theme.spacing.lg};
    margin: ${theme.spacing.xl} 0;
    border-radius: 0 ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0;
    font-style: italic;
    position: relative;

    &::before {
      content: '"';
      font-size: 4rem;
      color: ${theme.colors.primary};
      position: absolute;
      top: -10px;
      left: ${theme.spacing.md};
      opacity: 0.3;
    }
  }

  ${media.mobile} {
    padding: ${theme.spacing.xl};
    font-size: 1rem;

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.25rem;
    }
  }
`;

const TagsSection = styled.div`
  margin-top: ${theme.spacing.xxl};
  padding-top: ${theme.spacing.xl};
  border-top: 2px solid ${theme.colors.gray100};
`;

const TagsLabel = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.gray800};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const Tag = styled.span`
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1),
    rgba(240, 147, 251, 0.1)
  );
  color: ${theme.colors.primary};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.15),
      rgba(240, 147, 251, 0.15)
    );
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xxl};
  position: relative;

  &::before {
    content: '';
    width: 60px;
    height: 60px;
    border: 3px solid transparent;
    border-top: 3px solid ${theme.colors.primary};
    border-right: 3px solid ${theme.colors.secondary};
    border-radius: 50%;
    animation: spin 1.5s linear infinite;
    position: absolute;
  }

  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 3px solid transparent;
    border-top: 3px solid #667eea;
    border-left: 3px solid #f093fb;
    border-radius: 50%;
    animation: spin 1s linear infinite reverse;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray600};

  h2 {
    font-size: 2rem;
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.gray800};
  }

  p {
    font-size: 1.1rem;
    margin-bottom: ${theme.spacing.xl};
  }
`;

const SingleBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        if (blogsData.status === 'success' && blogsData.data) {
          const foundBlog = blogsData.data.blogs.find(
            b => b.id === parseInt(id)
          );
          if (foundBlog) {
            setBlog(foundBlog);
            const foundCategory = blogsData.data.categories.find(
              c => c.name === foundBlog.category
            );
            setCategory(foundCategory);
          }
        }
      } catch (error) {
        console.error('Error loading blog:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  const handleShare = platform => {
    const url = window.location.href;
    const title = blog?.title || '';

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          '_blank'
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        });
        break;
      default:
        break;
    }
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderContent = content => {
    return content
      .split('\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('## ')) {
          return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
        } else if (paragraph.startsWith('### ')) {
          return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
        } else if (paragraph.startsWith('- ')) {
          return (
            <li key={index}>
              {paragraph
                .replace('- ', '')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
            </li>
          );
        } else if (paragraph.trim() === '') {
          return null;
        } else {
          return (
            <p
              key={index}
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong>$1</strong>'
                ),
              }}
            />
          );
        }
      })
      .filter(Boolean);
  };

  if (loading) {
    return (
      <PageContainer>
        <Header />
        <Container>
          <LoadingSpinner />
        </Container>
      </PageContainer>
    );
  }

  if (!blog) {
    return (
      <PageContainer>
        <Header />
        <Container>
          <BackButton to="/blogs">
            <FaArrowLeft /> Back to Blogs
          </BackButton>
          <NotFound>
            <h2>Blog Not Found</h2>
            <p>
              The blog post you're looking for doesn't exist or has been
              removed.
            </p>
            <Link
              to="/blogs"
              style={{
                color: theme.colors.primary,
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Return to Blogs
            </Link>
          </NotFound>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header />
      <Container>
        <BackButton to="/blogs">
          <FaArrowLeft /> Back to Blogs
        </BackButton>

        <BlogHeader>
          {category && (
            <CategoryBadge color={category.color}>
              {category.name}
            </CategoryBadge>
          )}

          <BlogTitle>{blog.title}</BlogTitle>

          <BlogMeta>
            <AuthorInfo>
              <AuthorAvatar src={blog.author.avatar} alt={blog.author.name} />
              <AuthorDetails>
                <h4>{blog.author.name}</h4>
                <p>{blog.author.bio}</p>
              </AuthorDetails>
            </AuthorInfo>

            <MetaItem>
              <FaCalendarAlt />
              {formatDate(blog.publishedAt)}
            </MetaItem>

            <MetaItem>
              <FaClock />
              {blog.readTime}
            </MetaItem>

            <MetaItem>
              <FaEye />
              {blog.views.toLocaleString()} views
            </MetaItem>

            <MetaItem>
              <FaHeart />
              {blog.likes} likes
            </MetaItem>
          </BlogMeta>
        </BlogHeader>

        <FeaturedImage image={blog.image} />

        <ShareSection>
          <ShareLabel>
            <FaShare /> Share this article:
          </ShareLabel>
          <ShareButton
            className="twitter"
            onClick={() => handleShare('twitter')}
          >
            <FaTwitter />
          </ShareButton>
          <ShareButton
            className="facebook"
            onClick={() => handleShare('facebook')}
          >
            <FaFacebook />
          </ShareButton>
          <ShareButton
            className="linkedin"
            onClick={() => handleShare('linkedin')}
          >
            <FaLinkedin />
          </ShareButton>
          <ShareButton className="copy" onClick={() => handleShare('copy')}>
            <FaCopy />
          </ShareButton>
          {copySuccess && (
            <span style={{ color: theme.colors.success, fontSize: '0.9rem' }}>
              Link copied!
            </span>
          )}
        </ShareSection>

        <BlogContent>
          {renderContent(blog.content)}

          <TagsSection>
            <TagsLabel>
              <FaTag /> Tags:
            </TagsLabel>
            <TagsList>
              {blog.tags.map((tag, index) => (
                <Tag key={index}>#{tag}</Tag>
              ))}
            </TagsList>
          </TagsSection>
        </BlogContent>
      </Container>
    </PageContainer>
  );
};

export default SingleBlogPage;
