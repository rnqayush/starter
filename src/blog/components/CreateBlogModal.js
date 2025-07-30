import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaTimes,
  FaImage,
  FaUser,
  FaTag,
  FaFileAlt,
  FaSpinner,
  FaCheck,
  FaExclamationTriangle,
  FaTrash,
  FaPlus,
} from 'react-icons/fa';
import { theme, media } from '../../styles/GlobalStyle';
import { createBlog, hideCreateBlogModal, clearCreateBlogError } from '../store/blogsSlice';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.md};
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideInUp 0.4s ease-out;

  @keyframes slideInUp {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  ${media.mobile} {
    margin: ${theme.spacing.sm};
    max-height: 95vh;
  }
`;

const ModalHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 2px solid ${theme.colors.gray100};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(240, 147, 251, 0.05));
  border-radius: ${theme.borderRadius.xl} ${theme.borderRadius.xl} 0 0;

  h2 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
    color: ${theme.colors.gray900};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }

  ${media.mobile} {
    padding: ${theme.spacing.lg};
    
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${theme.colors.gray500};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray700};
    transform: scale(1.1);
  }
`;

const ModalBody = styled.div`
  padding: ${theme.spacing.xl};

  ${media.mobile} {
    padding: ${theme.spacing.lg};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.gray700};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.95rem;

  svg {
    color: ${theme.colors.primary};
  }
`;

const Input = styled.input`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${theme.colors.white};
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }

  &.content {
    min-height: 200px;
  }
`;

const Select = styled.select`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${theme.colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
`;

const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  min-height: 50px;
  transition: all 0.3s ease;
  background: ${theme.colors.white};

  &:focus-within {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  padding: ${theme.spacing.xs};
  font-size: 0.9rem;
  flex: 1;
  min-width: 120px;
  background: transparent;

  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const Tag = styled.span`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  button {
    background: none;
    border: none;
    color: ${theme.colors.white};
    cursor: pointer;
    padding: 0;
    font-size: 0.8rem;
    opacity: 0.8;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const ErrorMessage = styled.div`
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1));
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: ${theme.colors.error};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 0.9rem;
  animation: shake 0.5s ease-in-out;

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

const ModalFooter = styled.div`
  padding: ${theme.spacing.xl};
  border-top: 2px solid ${theme.colors.gray100};
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  background: ${theme.colors.gray50};
  border-radius: 0 0 ${theme.borderRadius.xl} ${theme.borderRadius.xl};

  ${media.mobile} {
    padding: ${theme.spacing.lg};
    flex-direction: column-reverse;
  }
`;

const Button = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  min-width: 120px;
  position: relative;
  overflow: hidden;

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

  &:hover::before {
    left: 100%;
  }

  &.primary {
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
    color: ${theme.colors.white};
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }
  }

  &.secondary {
    background: ${theme.colors.white};
    color: ${theme.colors.gray700};
    border: 2px solid ${theme.colors.gray200};

    &:hover {
      background: ${theme.colors.gray50};
      border-color: ${theme.colors.gray300};
      transform: translateY(-1px);
    }
  }

  ${media.mobile} {
    width: 100%;
  }
`;

const CharacterCount = styled.div`
  font-size: 0.8rem;
  color: ${props => props.isOver ? theme.colors.error : theme.colors.gray500};
  text-align: right;
  margin-top: ${theme.spacing.xs};
`;

const ContentSectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ContentSection = styled.div`
  padding: ${theme.spacing.lg};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.02), rgba(240, 147, 251, 0.02));
  position: relative;
  transition: all 0.3s ease;
  animation: slideIn 0.4s ease-out;

  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

const SectionTitle = styled.h4`
  margin: 0;
  color: ${theme.colors.gray700};
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  svg {
    color: ${theme.colors.primary};
  }
`;

const RemoveSectionButton = styled.button`
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1));
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: ${theme.colors.error};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:hover {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2));
    border-color: rgba(239, 68, 68, 0.5);
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const AddSectionButton = styled.button`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(240, 147, 251, 0.1));
  border: 2px dashed ${theme.colors.primary};
  color: ${theme.colors.primary};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  width: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(240, 147, 251, 0.15));
    border-color: ${theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);

    &::before {
      left: 100%;
    }
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
`;

const CreateBlogModal = () => {
  const dispatch = useDispatch();
  const { categories, createBlogLoading, createBlogError, showCreateBlogModal } = useSelector(state => state.blogs);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    contentSections: [
      { heading: '', description: '' }
    ],
    authorName: '',
    authorBio: '',
    authorAvatar: '',
    category: '',
    image: '',
    tags: []
  });
  
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (createBlogError) {
      setErrors({ submit: createBlogError });
    }
  }, [createBlogError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleContentSectionChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      contentSections: prev.contentSections.map((section, i) => 
        i === index ? { ...section, [field]: value } : section
      )
    }));
  };

  const addContentSection = () => {
    setFormData(prev => ({
      ...prev,
      contentSections: [...prev.contentSections, { heading: '', description: '' }]
    }));
  };

  const removeContentSection = (index) => {
    if (formData.contentSections.length > 1) {
      setFormData(prev => ({
        ...prev,
        contentSections: prev.contentSections.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.authorName.trim()) newErrors.authorName = 'Author name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.image.trim()) newErrors.image = 'Featured image URL is required';
    
    if (formData.title.length > 100) newErrors.title = 'Title must be less than 100 characters';
    if (formData.excerpt.length > 300) newErrors.excerpt = 'Excerpt must be less than 300 characters';
    
    // Validate content sections
    const hasValidContent = formData.contentSections.some(section => 
      section.heading.trim() || section.description.trim()
    );
    if (!hasValidContent) newErrors.contentSections = 'At least one content section with heading or description is required';
    
    // Check individual sections
    formData.contentSections.forEach((section, index) => {
      if (section.heading.trim() && section.heading.length > 100) {
        newErrors[`section_${index}_heading`] = 'Heading must be less than 100 characters';
      }
      if (section.description.trim() && section.description.length < 20) {
        newErrors[`section_${index}_description`] = 'Description must be at least 20 characters';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await dispatch(createBlog(formData)).unwrap();
      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        contentSections: [
          { heading: '', description: '' }
        ],
        authorName: '',
        authorBio: '',
        authorAvatar: '',
        category: '',
        image: '',
        tags: []
      });
      setTagInput('');
      setErrors({});
    } catch (error) {
      // Error is handled by Redux
    }
  };

  const handleClose = () => {
    dispatch(hideCreateBlogModal());
    dispatch(clearCreateBlogError());
    setErrors({});
  };

  if (!showCreateBlogModal) return null;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <ModalContainer>
        <ModalHeader>
          <h2>
            <FaFileAlt />
            Create New Blog Post
          </h2>
          <CloseButton onClick={handleClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">
                <FaFileAlt />
                Blog Title *
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter an engaging blog title..."
                value={formData.title}
                onChange={handleInputChange}
                style={{ borderColor: errors.title ? theme.colors.error : undefined }}
              />
              <CharacterCount isOver={formData.title.length > 100}>
                {formData.title.length}/100
              </CharacterCount>
              {errors.title && <ErrorMessage><FaExclamationTriangle />{errors.title}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="excerpt">
                <FaFileAlt />
                Blog Excerpt *
              </Label>
              <TextArea
                id="excerpt"
                name="excerpt"
                placeholder="Write a compelling excerpt that summarizes your blog post..."
                value={formData.excerpt}
                onChange={handleInputChange}
                style={{ borderColor: errors.excerpt ? theme.colors.error : undefined }}
              />
              <CharacterCount isOver={formData.excerpt.length > 300}>
                {formData.excerpt.length}/300
              </CharacterCount>
              {errors.excerpt && <ErrorMessage><FaExclamationTriangle />{errors.excerpt}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>
                <FaFileAlt />
                Blog Content Sections *
              </Label>
              <ContentSectionsContainer>
                {formData.contentSections.map((section, index) => (
                  <ContentSection key={index}>
                    <SectionHeader>
                      <SectionTitle>
                        <FaFileAlt />
                        Section {index + 1}
                      </SectionTitle>
                      <RemoveSectionButton
                        type="button"
                        onClick={() => removeContentSection(index)}
                        disabled={formData.contentSections.length === 1}
                      >
                        <FaTrash />
                        Remove
                      </RemoveSectionButton>
                    </SectionHeader>

                    <FormGroup>
                      <Label htmlFor={`heading-${index}`}>
                        Section Heading
                      </Label>
                      <Input
                        id={`heading-${index}`}
                        type="text"
                        placeholder="Enter section heading (optional)"
                        value={section.heading}
                        onChange={(e) => handleContentSectionChange(index, 'heading', e.target.value)}
                        style={{ borderColor: errors[`section_${index}_heading`] ? theme.colors.error : undefined }}
                      />
                      <CharacterCount isOver={section.heading.length > 100}>
                        {section.heading.length}/100
                      </CharacterCount>
                      {errors[`section_${index}_heading`] && (
                        <ErrorMessage>
                          <FaExclamationTriangle />
                          {errors[`section_${index}_heading`]}
                        </ErrorMessage>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor={`description-${index}`}>
                        Section Description
                      </Label>
                      <TextArea
                        id={`description-${index}`}
                        placeholder="Write the content for this section..."
                        value={section.description}
                        onChange={(e) => handleContentSectionChange(index, 'description', e.target.value)}
                        style={{ borderColor: errors[`section_${index}_description`] ? theme.colors.error : undefined }}
                      />
                      <CharacterCount isOver={section.description.length > 0 && section.description.length < 20}>
                        {section.description.length} characters {section.description.length > 0 ? '(minimum 20)' : ''}
                      </CharacterCount>
                      {errors[`section_${index}_description`] && (
                        <ErrorMessage>
                          <FaExclamationTriangle />
                          {errors[`section_${index}_description`]}
                        </ErrorMessage>
                      )}
                    </FormGroup>
                  </ContentSection>
                ))}

                <AddSectionButton type="button" onClick={addContentSection}>
                  <FaPlus />
                  Add More Section
                </AddSectionButton>
              </ContentSectionsContainer>
              {errors.contentSections && (
                <ErrorMessage>
                  <FaExclamationTriangle />
                  {errors.contentSections}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="authorName">
                  <FaUser />
                  Author Name *
                </Label>
                <Input
                  id="authorName"
                  name="authorName"
                  type="text"
                  placeholder="Your name"
                  value={formData.authorName}
                  onChange={handleInputChange}
                  style={{ borderColor: errors.authorName ? theme.colors.error : undefined }}
                />
                {errors.authorName && <ErrorMessage><FaExclamationTriangle />{errors.authorName}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="authorBio">
                  <FaUser />
                  Author Bio
                </Label>
                <Input
                  id="authorBio"
                  name="authorBio"
                  type="text"
                  placeholder="Brief bio (optional)"
                  value={formData.authorBio}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="authorAvatar">
                <FaUser />
                Author Avatar URL
              </Label>
              <Input
                id="authorAvatar"
                name="authorAvatar"
                type="url"
                placeholder="https://example.com/avatar.jpg (optional)"
                value={formData.authorAvatar}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="category">
                  <FaTag />
                  Category *
                </Label>
                <Select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{ borderColor: errors.category ? theme.colors.error : undefined }}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                {errors.category && <ErrorMessage><FaExclamationTriangle />{errors.category}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="image">
                  <FaImage />
                  Featured Image URL *
                </Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleInputChange}
                  style={{ borderColor: errors.image ? theme.colors.error : undefined }}
                />
                {errors.image && <ErrorMessage><FaExclamationTriangle />{errors.image}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>
                <FaTag />
                Tags (Press Enter or comma to add)
              </Label>
              <TagsInput>
                {formData.tags.map((tag, index) => (
                  <Tag key={index}>
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <FaTimes />
                    </button>
                  </Tag>
                ))}
                <TagInput
                  type="text"
                  placeholder={formData.tags.length === 0 ? "Add tags..." : ""}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  onBlur={addTag}
                />
              </TagsInput>
              <CharacterCount>
                {formData.tags.length}/10 tags
              </CharacterCount>
            </FormGroup>

            {errors.submit && (
              <ErrorMessage>
                <FaExclamationTriangle />
                {errors.submit}
              </ErrorMessage>
            )}
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="button" className="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="primary" 
            onClick={handleSubmit}
            disabled={createBlogLoading}
          >
            {createBlogLoading ? (
              <>
                <FaSpinner className="fa-spin" />
                Publishing...
              </>
            ) : (
              <>
                <FaCheck />
                Publish Blog
              </>
            )}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CreateBlogModal;
