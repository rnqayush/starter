module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Console statements
    'no-console': 'warn',
    
    // Unused variables
    'no-unused-vars': ['warn', { 
      vars: 'all', 
      args: 'after-used', 
      ignoreRestSiblings: true,
      argsIgnorePattern: '^_'
    }],
    
    // React hooks
    'react-hooks/exhaustive-deps': 'warn',
    
    // General code quality
    'no-debugger': 'warn',
    'no-alert': 'warn',
    'prefer-const': 'warn',
    'no-var': 'error',
    
    // Import/export
    'import/no-unused-modules': 'off', // Can be too strict for React components
    
    // JSX
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-react': 'off', // Not needed in React 17+
    'react/jsx-uses-vars': 'error',
    'react/no-unused-state': 'warn',
    
    // Accessibility
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-has-content': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/interactive-supports-focus': 'warn',
    
    // Styling
    'no-trailing-spaces': 'warn',
    'eol-last': 'warn'
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
};
