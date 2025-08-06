import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  FaPlus,
  FaPen,
} from 'react-icons/fa';
import { theme, media } from '../../../styles/GlobalStyle';
import Header from '../../../components/shared/Header';
import CreateBlogModal from '../components/CreateBlogModal';
import {
  loadBlogs,
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
  clearFilters,
  showCreateBlogModal,
} from '../../../store/slices/blogsSlice';

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

  &::after {
    content: '';
    position: fixed;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.03) 0%, transparent 70%);
    animation: float 8s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes float {
    0%, 100% { 
      transform: translate(0, 0) rotate(0deg); 
    }
    33% { 
      transform: translate(30px, -30px) rotate(120deg); 
    }
    66% { 
      transform: translate(-20px, 20px) rotate(240deg); 
    }
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  position: relative;
  z-index: 1;

  ${media.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  padding: ${theme.spacing.xxl} 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  position: relative;
  overflow: hidden;
  animation: gradientShift 8s ease-in-out infinite;

  @keyframes gradientShift {
    0%, 100% {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    }
    25% {
      background: linear-gradient(135deg, #f093fb 0%, #667eea 50%, #764ba2 100%);
    }
    50% {
      background: linear-gradient(135deg, #764ba2 0%, #f093fb 50%, #667eea 100%);
    }
    75% {
      background: linear-gradient(135deg, #667eea 0%, #f093fb 50%, #764ba2 100%);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.15"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.15"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.4;
    animation: float 6s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  ${media.mobile} {
    margin-bottom: ${theme.spacing.xl};
    padding: ${theme.spacing.xl} ${theme.spacing.md};
  }
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 ${theme.spacing.md} 0;
  position: relative;
  z-index: 1;
  background: linear-gradient(45deg, #ffffff, #f8fafc, #ffffff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease-in-out infinite, slideInDown 1s ease-out;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);

  @keyframes shimmer {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes slideInDown {
    0% {
      opacity: 0;
      transform: translateY(-30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

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
  animation: slideInUp 1s ease-out 0.3s both;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @keyframes slideInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 0.9;
      transform: translateY(0);
    }
  }

  ${media.mobile} {
    font-size: 1rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing.xl};
  position: relative;
  z-index: 1;
  animation: slideInUp 1s ease-out 0.6s both;

  ${media.mobile} {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const CreateBlogButton = styled.button`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.full};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }

  svg {
    font-size: 1.2rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-3px);
    }
    60% {
      transform: translateY(-2px);
    }
  }

  ${media.mobile} {
    width: 100%;
    justify-content: center;
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
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
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.8s ease-out 0.6s both;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: shimmerEffect 3s infinite;
  }

  @keyframes shimmerEffect {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes slideInUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  position: relative;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20, 
                0 8px 25px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
    background: linear-gradient(145deg, #ffffff, #ffffff);
  }

  &:hover {
    border-color: ${theme.colors.primary}80;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  &::placeholder {
    color: ${theme.colors.gray400};
    transition: color 0.3s ease;
  }

  &:focus::placeholder {
    color: ${theme.colors.gray300};
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
  animation: fadeIn 0.8s ease-out 0.9s both;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  height: fit-content;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  animation: fadeInUp 0.6s ease-out both;

  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  &:nth-child(4) { animation-delay: 0.4s; }
  &:nth-child(5) { animation-delay: 0.5s; }
  &:nth-child(6) { animation-delay: 0.6s; }
  &:nth-child(7) { animation-delay: 0.7s; }
  &:nth-child(8) { animation-delay: 0.8s; }
  &:nth-child(9) { animation-delay: 0.9s; }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 
                0 8px 16px rgba(0, 0, 0, 0.08),
                0 0 0 1px rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-8px) scale(1.01);
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(102, 126, 234, 0.1) 0%,
      rgba(118, 75, 162, 0.1) 50%,
      rgba(240, 147, 251, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

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
      rgba(0, 0, 0, 0.4) 100%
    );
    transition: all 0.3s ease;
  }

  ${BlogCard}:hover & {
    transform: scale(1.05);

    &::before {
      opacity: 1;
    }

    &::after {
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, 0.05) 50%,
        rgba(0, 0, 0, 0.2) 100%
      );
    }
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  left: ${theme.spacing.md};
  background: linear-gradient(135deg, #ff6b6b, #ee5a24, #ff9f43);
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 3;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
  animation: pulse 2s infinite, slideInLeft 0.6s ease-out;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(255, 107, 107, 0.6);
    }
  }

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

  ${BlogCard}:hover & {
    animation: pulse 1s infinite;
  }
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
  z-index: 3;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: slideInRight 0.6s ease-out;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  @keyframes slideInRight {
    0% {
      opacity: 0;
      transform: translateX(20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  ${BlogCard}:hover & {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
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
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  ${BlogCard}:hover & {
    transform: scale(1.1);
    border-color: ${theme.colors.primary};
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
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
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary}, #667eea);
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4), 
                0 4px 8px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #667eea, ${theme.colors.primary}, ${theme.colors.secondary});

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const BlogsPage = () => {
  const dispatch = useDispatch();
  const {
    blogs,
    categories,
    filteredBlogs,
    loading,
    error,
    searchTerm,
    selectedCategory,
    sortBy,
  } = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(loadBlogs());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleCreateBlog = () => {
    dispatch(showCreateBlogModal());
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
          <HeroActions>
            <CreateBlogButton onClick={handleCreateBlog}>
              <FaPlus />
              Create New Blog
            </CreateBlogButton>
          </HeroActions>
        </PageHeader>

        <FilterSection>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchContainer>

          <FilterControls>
            <CategoryFilter
              value={selectedCategory}
              onChange={handleCategoryChange}
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
              onChange={handleSortChange}
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

                    <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
                      <ReadMoreButton>
                        Read More
                      </ReadMoreButton>
                    </Link>
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
      <CreateBlogModal />
    </PageContainer>
  );
};

export default BlogsPage;
