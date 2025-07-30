import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaHeart,
  FaTag,
  FaUser,
  FaFilter,
  FaTimes,
} from 'react-icons/fa';
import { theme, media } from '../../styles/GlobalStyle';
import Header from '../shared/Header';
import blogsData from '../../DummyData/blogs.json';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
  padding-top: 80px;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};

  ${media.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  padding: ${theme.spacing.xl} 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }

  ${media.mobile} {
    margin-bottom: ${theme.spacing.xl};
    padding: ${theme.spacing.lg} ${theme.spacing.md};
  }
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 ${theme.spacing.md} 0;
  position: relative;
  z-index: 1;

  ${media.tablet} {
    font-size: 2.5rem;
  }

  ${media.mobile} {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  ${media.mobile} {
    font-size: 1rem;
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.lg};
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};

  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.md};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  ${media.mobile} {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 3rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
  font-size: 1rem;
`;

const FilterControls = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;

  ${media.mobile} {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const CategoryFilter = styled.select`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  background: ${theme.colors.white};
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const SortFilter = styled.select`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  background: ${theme.colors.white};
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ClearFilters = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray100};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.gray200};
    color: ${theme.colors.gray800};
  }
`;

const BlogsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const BlogCard = styled.article`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  transition: all 0.3s ease;
  cursor: pointer;
  height: fit-content;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 240px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  left: ${theme.spacing.md};
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${props => props.color || theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 2;
`;

const BlogContent = styled.div`
  padding: ${theme.spacing.xl};

  ${media.mobile} {
    padding: ${theme.spacing.lg};
  }
`;

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.md} 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${media.mobile} {
    font-size: 1.25rem;
  }
`;

const BlogExcerpt = styled.p`
  color: ${theme.colors.gray600};
  line-height: 1.6;
  margin: 0 0 ${theme.spacing.lg} 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.gray100};

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.sm};
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const AuthorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  object-fit: cover;
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 0.9rem;
`;

const AuthorBio = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
`;

const BlogStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  font-size: 0.85rem;
  color: ${theme.colors.gray500};

  ${media.mobile} {
    align-self: stretch;
    justify-content: space-between;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const BlogFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.sm};
  }
`;

const BlogTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
`;

const Tag = styled.span`
  background: ${theme.colors.gray100};
  color: ${theme.colors.gray600};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 500;
`;

const ReadMoreButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }

  ${media.mobile} {
    align-self: stretch;
    text-align: center;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray500};

  h3 {
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.gray700};
  }

  p {
    font-size: 1rem;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xxl};

  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid ${theme.colors.gray200};
    border-top: 4px solid ${theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Simulate API call
    const loadBlogs = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setBlogs(blogsData.blogs);
        setCategories(blogsData.categories);
        setFilteredBlogs(blogsData.blogs);
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  useEffect(() => {
    let filtered = [...blogs];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Sort blogs
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'liked':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('newest');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : theme.colors.primary;
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

  return (
    <PageContainer>
      <Header />
      <Container>
        <PageHeader>
          <PageTitle>Our Blog</PageTitle>
          <PageSubtitle>
            Discover insights, tips, and strategies to grow your business and stay ahead in the digital world
          </PageSubtitle>
        </PageHeader>

        <FilterSection>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterControls>
            <CategoryFilter
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </CategoryFilter>

            <SortFilter
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
              <option value="liked">Most Liked</option>
            </SortFilter>

            {(searchTerm || selectedCategory || sortBy !== 'newest') && (
              <ClearFilters onClick={handleClearFilters}>
                <FaTimes />
                Clear Filters
              </ClearFilters>
            )}
          </FilterControls>
        </FilterSection>

        {filteredBlogs.length === 0 ? (
          <NoResults>
            <h3>No blogs found</h3>
            <p>Try adjusting your search criteria or browse all categories.</p>
            <ClearFilters onClick={handleClearFilters}>
              Clear All Filters
            </ClearFilters>
          </NoResults>
        ) : (
          <BlogsGrid>
            {filteredBlogs.map(blog => (
              <BlogCard key={blog.id}>
                <BlogImage image={blog.image}>
                  {blog.featured && <FeaturedBadge>Featured</FeaturedBadge>}
                  <CategoryBadge color={getCategoryColor(blog.category)}>
                    {blog.category}
                  </CategoryBadge>
                </BlogImage>

                <BlogContent>
                  <BlogMeta>
                    <AuthorInfo>
                      <AuthorAvatar src={blog.author.avatar} alt={blog.author.name} />
                      <AuthorDetails>
                        <AuthorName>{blog.author.name}</AuthorName>
                        <AuthorBio>{blog.author.bio}</AuthorBio>
                      </AuthorDetails>
                    </AuthorInfo>

                    <BlogStats>
                      <StatItem>
                        <FaCalendarAlt />
                        {formatDate(blog.publishedAt)}
                      </StatItem>
                      <StatItem>
                        <FaClock />
                        {blog.readTime}
                      </StatItem>
                    </BlogStats>
                  </BlogMeta>

                  <BlogTitle>{blog.title}</BlogTitle>
                  <BlogExcerpt>{blog.excerpt}</BlogExcerpt>

                  <BlogFooter>
                    <BlogTags>
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <Tag key={index}>#{tag}</Tag>
                      ))}
                    </BlogTags>

                    <ReadMoreButton>
                      Read More
                    </ReadMoreButton>
                  </BlogFooter>

                  <BlogStats style={{ marginTop: theme.spacing.md, paddingTop: theme.spacing.md, borderTop: `1px solid ${theme.colors.gray100}` }}>
                    <StatItem>
                      <FaEye />
                      {blog.views.toLocaleString()} views
                    </StatItem>
                    <StatItem>
                      <FaHeart />
                      {blog.likes} likes
                    </StatItem>
                  </BlogStats>
                </BlogContent>
              </BlogCard>
            ))}
          </BlogsGrid>
        )}
      </Container>
    </PageContainer>
  );
};

export default BlogsPage;

