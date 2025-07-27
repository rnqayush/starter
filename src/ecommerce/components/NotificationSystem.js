import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';
import styled from 'styled-components';
import {
  FaBell,
  FaEnvelope,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaInfo,
  FaShoppingBag,
  FaUser,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';

// Notification Context
const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider'
    );
  }
  return context;
};

// Styled Components
const NotificationContainer = styled.div`
  position: fixed;
  top: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  max-width: 400px;
  width: 100%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    top: ${theme.spacing.lg};
    right: ${theme.spacing.lg};
    left: ${theme.spacing.lg};
    max-width: none;
  }
`;

const NotificationCard = styled.div.withConfig({
  shouldForwardProp: prop => !['type', 'isVisible'].includes(prop),
})`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xl};
  border: 1px solid ${theme.colors.gray200};
  padding: ${theme.spacing.lg};
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: translateX(${props => (props.isVisible ? 0 : '100%')});
  transition: all 0.3s ease;
  border-left: 4px solid
    ${props => {
      switch (props.type) {
        case 'success':
          return theme.colors.success;
        case 'error':
          return theme.colors.error;
        case 'warning':
          return theme.colors.warning;
        case 'enquiry':
          return theme.colors.primary;
        default:
          return theme.colors.info;
      }
    }};

  &:hover {
    transform: translateX(${props => (props.isVisible ? '-4px' : '100%')});
  }
`;

const NotificationIcon = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'type',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => {
    switch (props.type) {
      case 'success':
        return theme.colors.success + '20';
      case 'error':
        return theme.colors.error + '20';
      case 'warning':
        return theme.colors.warning + '20';
      case 'enquiry':
        return theme.colors.primary + '20';
      default:
        return theme.colors.info + '20';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'enquiry':
        return theme.colors.primary;
      default:
        return theme.colors.info;
    }
  }};
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h4`
  margin: 0 0 ${theme.spacing.xs} 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
`;

const NotificationMessage = styled.p`
  margin: 0 0 ${theme.spacing.sm} 0;
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  line-height: 1.4;
`;

const NotificationMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
`;

const NotificationActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
`;

const NotificationButton = styled.button`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &.primary {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};

    &:hover {
      background: ${theme.colors.primaryDark};
    }
  }

  &.secondary {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray700};

    &:hover {
      background: ${theme.colors.gray200};
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray400};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray600};
  }
`;

const BellIcon = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'hasNotifications',
})`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props =>
    props.hasNotifications
      ? theme.colors.primary + '20'
      : theme.colors.gray100};
  color: ${props =>
    props.hasNotifications ? theme.colors.primary : theme.colors.gray600};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props =>
      props.hasNotifications
        ? theme.colors.primary + '30'
        : theme.colors.gray200};
  }

  ${props =>
    props.hasNotifications &&
    `
    &::after {
      content: "";
      position: absolute;
      top: 6px;
      right: 6px;
      width: 8px;
      height: 8px;
      background: ${theme.colors.error};
      border-radius: 50%;
      border: 2px solid ${theme.colors.white};
    }
  `}
`;

// Notification Component
const NotificationItem = ({ notification, onClose, onAction }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(notification.id), 300);
  }, [onClose, notification.id]);

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 100);

    // Auto-close after duration (if specified)
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.duration, handleClose]);

  const handleAction = action => {
    if (action.callback) {
      action.callback(notification);
    }
    if (action.closeOnClick !== false) {
      handleClose();
    }
    if (onAction) {
      onAction(notification, action);
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <FaCheck />;
      case 'error':
        return <FaExclamationTriangle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'enquiry':
        return <FaEnvelope />;
      case 'order':
        return <FaShoppingBag />;
      case 'user':
        return <FaUser />;
      default:
        return <FaInfo />;
    }
  };

  const formatTime = timestamp => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return time.toLocaleDateString();
  };

  return (
    <NotificationCard type={notification.type} isVisible={isVisible}>
      <NotificationIcon type={notification.type}>{getIcon()}</NotificationIcon>

      <NotificationContent>
        <NotificationTitle>{notification.title}</NotificationTitle>
        <NotificationMessage>{notification.message}</NotificationMessage>

        {notification.meta && (
          <NotificationMeta>
            <span>{formatTime(notification.timestamp)}</span>
            {notification.meta.product && (
              <span>• {notification.meta.product}</span>
            )}
            {notification.meta.customer && (
              <span>• {notification.meta.customer}</span>
            )}
          </NotificationMeta>
        )}

        {notification.actions && notification.actions.length > 0 && (
          <NotificationActions>
            {notification.actions.map((action, index) => (
              <NotificationButton
                key={index}
                className={action.type || 'secondary'}
                onClick={() => handleAction(action)}
              >
                {action.label}
              </NotificationButton>
            ))}
          </NotificationActions>
        )}
      </NotificationContent>

      <CloseButton onClick={handleClose}>
        <FaTimes />
      </CloseButton>
    </NotificationCard>
  );
};

// Main Notification System
const NotificationSystem = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(notification => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      timestamp: Date.now(),
      duration: 5000, // Default 5 seconds
      ...notification,
    };

    setNotifications(prev => [newNotification, ...prev]);

    return id;
  }, []);

  const removeNotification = id => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = id => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Utility functions for common notification types
  const showSuccessNotification = (title, message, options = {}) => {
    return addNotification({
      type: 'success',
      title,
      message,
      ...options,
    });
  };

  const showErrorNotification = (title, message, options = {}) => {
    return addNotification({
      type: 'error',
      title,
      message,
      duration: 8000, // Longer duration for errors
      ...options,
    });
  };

  const showEnquiryNotification = useCallback(
    (enquiry, options = {}) => {
      return addNotification({
        type: 'enquiry',
        title: 'New Enquiry Received',
        message: `${enquiry.name} is interested in ${enquiry.productName}`,
        meta: {
          product: enquiry.productName,
          customer: enquiry.name,
        },
        actions: [
          {
            label: 'View Details',
            type: 'primary',
            callback: () => {
              // Navigate to enquiry management
              window.location.href =
                '/ecommerce/seller-dashboard?tab=enquiries';
            },
          },
          {
            label: 'Contact Customer',
            type: 'secondary',
            callback: () => {
              window.open(
                `mailto:${enquiry.email}?subject=Re: Enquiry for ${enquiry.productName}`
              );
            },
            closeOnClick: false,
          },
        ],
        duration: 0, // Don't auto-close enquiry notifications
        ...options,
      });
    },
    [addNotification]
  );

  // Check for new enquiries periodically
  useEffect(() => {
    const checkForNewEnquiries = () => {
      const lastCheck = localStorage.getItem('lastEnquiryCheck');
      const currentEnquiries = JSON.parse(
        localStorage.getItem('userEnquiries') || '[]'
      );

      if (lastCheck) {
        const newEnquiries = currentEnquiries.filter(
          enquiry => new Date(enquiry.timestamp) > new Date(lastCheck)
        );

        newEnquiries.forEach(enquiry => {
          showEnquiryNotification(enquiry);
        });
      }

      localStorage.setItem('lastEnquiryCheck', new Date().toISOString());
    };

    // Check immediately
    checkForNewEnquiries();

    // Set up periodic checking (every 30 seconds)
    const interval = setInterval(checkForNewEnquiries, 30000);

    return () => clearInterval(interval);
  }, [showEnquiryNotification]);

  const contextValue = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    markAsRead,
    showSuccessNotification,
    showErrorNotification,
    showEnquiryNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationContainer>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={removeNotification}
          />
        ))}
      </NotificationContainer>
    </NotificationContext.Provider>
  );
};

// Bell Icon Component for Header
export const NotificationBell = ({ onClick }) => {
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <BellIcon hasNotifications={unreadCount > 0} onClick={onClick}>
      <FaBell />
    </BellIcon>
  );
};

export default NotificationSystem;
export { NotificationSystem as NotificationProvider };
