import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;

    @media (max-width: 768px) {
      font-size: 14px;
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      font-size: 15px;
    }

    @media (min-width: 1025px) {
      font-size: 16px;
    }
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: #1f2937;
    background-color: #f8fafc;
    font-size: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
    font-size: 1rem;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.5rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      font-size: 2.25rem;
    }
  }

  h2 {
    font-size: 2rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      font-size: 1.75rem;
    }
  }

  h3 {
    font-size: 1.5rem;

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  h4 {
    font-size: 1.25rem;

    @media (max-width: 768px) {
      font-size: 1.125rem;
    }
  }

  h5 {
    font-size: 1.125rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  h6 {
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }

  img, video {
    max-width: 100%;
    height: auto;
    display: block;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    @media (max-width: 768px) {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (max-width: 768px) {
      padding: 0 0.75rem;
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      padding: 0 1.5rem;
    }

    @media (min-width: 1025px) {
      padding: 0 2rem;
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Responsive grid utility classes */
  .grid-responsive {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;

    @media (min-width: 769px) and (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    @media (min-width: 1025px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }

  .flex-responsive {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 769px) {
      flex-direction: row;
      gap: 1.5rem;
    }
  }
`;

export const theme = {
  colors: {
    primary: "#1e40af",
    primaryLight: "#3b82f6",
    primaryDark: "#1d4ed8",
    secondary: "#64748b",
    accent: "#f59e0b",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    white: "#ffffff",
    gray50: "#f8fafc",
    gray100: "#f1f5f9",
    gray200: "#e2e8f0",
    gray300: "#cbd5e1",
    gray400: "#94a3b8",
    gray500: "#64748b",
    gray600: "#475569",
    gray700: "#334155",
    gray800: "#1e293b",
    gray900: "#0f172a",
  },
  breakpoints: {
    mobile: "768px",
    tablet: "1024px",
    desktop: "1200px",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "1.5rem",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
};

// Responsive utility functions
export const media = {
  mobile: `@media (max-width: ${theme.breakpoints.mobile})`,
  tablet: `@media (min-width: 769px) and (max-width: ${theme.breakpoints.tablet})`,
  desktop: `@media (min-width: 1025px)`,
  tabletUp: `@media (min-width: 769px)`,
  mobileDown: `@media (max-width: ${theme.breakpoints.mobile})`,
  tabletDown: `@media (max-width: ${theme.breakpoints.tablet})`,
  smallDesktop: `@media (min-width: 1025px) and (max-width: 1200px)`,
  mediumDesktop: `@media (min-width: 1201px) and (max-width: 1440px)`,
  largeDesktop: `@media (min-width: 1441px)`,
};

// Responsive grid utilities
export const gridResponsive = {
  mobile: {
    columns: "1fr",
    gap: theme.spacing.md,
  },
  tablet: {
    columns: "repeat(2, 1fr)",
    gap: theme.spacing.lg,
  },
  desktop: {
    columns: "repeat(3, 1fr)",
    gap: theme.spacing.xl,
  },
};

// Responsive container utilities
export const containerStyles = `
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  ${media.mobile} {
    padding: 0 ${theme.spacing.sm};
  }

  ${media.tablet} {
    padding: 0 ${theme.spacing.lg};
  }

  ${media.desktop} {
    padding: 0 ${theme.spacing.xl};
  }
`;

// Responsive text utilities
export const textResponsive = {
  h1: `
    font-size: 2.5rem;
    line-height: 1.2;

    ${media.mobile} {
      font-size: 2rem;
    }

    ${media.tablet} {
      font-size: 2.25rem;
    }
  `,
  h2: `
    font-size: 2rem;
    line-height: 1.3;

    ${media.mobile} {
      font-size: 1.5rem;
    }

    ${media.tablet} {
      font-size: 1.75rem;
    }
  `,
  h3: `
    font-size: 1.5rem;
    line-height: 1.4;

    ${media.mobile} {
      font-size: 1.25rem;
    }
  `,
  body: `
    font-size: 1rem;
    line-height: 1.6;

    ${media.mobile} {
      font-size: 0.875rem;
    }
  `,
  small: `
    font-size: 0.875rem;
    line-height: 1.5;

    ${media.mobile} {
      font-size: 0.75rem;
    }
  `,
};
