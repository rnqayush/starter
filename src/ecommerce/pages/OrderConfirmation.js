import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  FaCheckCircle,
  FaEnvelope,
  FaTruck,
  FaCalendarAlt,
  FaPrint,
  FaDownload,
  FaShoppingBag,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  flex: 1;
`;

const SuccessCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing.xxl};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const SuccessIcon = styled.div`
  width: 100px;
  height: 100px;
  background: ${theme.colors.success};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.xl};
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  .icon {
    font-size: 3rem;
    color: ${theme.colors.white};
  }
`;

const SuccessTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
`;

const SuccessMessage = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.6;
`;

const OrderNumber = styled.div`
  background: ${theme.colors.gray100};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.xl};
  border-left: 4px solid ${theme.colors.primary};

  .label {
    font-size: 0.9rem;
    color: ${theme.colors.gray600};
    margin-bottom: ${theme.spacing.xs};
  }

  .number {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    font-family: monospace;
  }
`;

const OrderDetails = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const InfoCard = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  border-left: 3px solid ${theme.colors.primary};

  .icon {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
    font-size: 1.2rem;
  }

  .title {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.sm};
  }

  .content {
    color: ${theme.colors.gray700};
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const Timeline = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const TimelineItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "completed",
})`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 12px;
    top: 30px;
    width: 2px;
    height: 40px;
    background: ${(props) =>
      props.completed ? theme.colors.success : theme.colors.gray300};
  }
`;

const TimelineIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "completed",
})`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${(props) =>
    props.completed ? theme.colors.success : theme.colors.gray300};
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  flex-shrink: 0;
  margin-top: 2px;
`;

const TimelineContent = styled.div`
  .title {
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.xs};
  }

  .description {
    font-size: 0.9rem;
    color: ${theme.colors.gray600};
    margin-bottom: ${theme.spacing.xs};
  }

  .date {
    font-size: 0.8rem;
    color: ${theme.colors.gray500};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "primary",
})`
  background: ${(props) =>
    props.primary ? theme.colors.primary : theme.colors.white};
  color: ${(props) =>
    props.primary ? theme.colors.white : theme.colors.gray700};
  border: 2px solid
    ${(props) => (props.primary ? theme.colors.primary : theme.colors.gray200)};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${(props) =>
      props.primary ? theme.colors.primaryDark : theme.colors.gray50};
    transform: translateY(-1px);
  }
`;

const ContinueShoppingButton = styled(Link)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  box-shadow: ${theme.shadows.md};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const OrderConfirmation = () => {
  const location = useLocation();
  const orderData = location.state || {
    orderNumber: "ORD-" + Date.now(),
    total: 489.97,
    paymentMethod: "card",
    email: "customer@example.com",
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Mock download functionality
    alert("Order receipt download would start here");
  };

  const getEstimatedDelivery = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5); // Add 5 days
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPaymentMethodName = (method) => {
    switch (method) {
      case "card":
        return "Credit Card";
      case "paypal":
        return "PayPal";
      case "apple":
        return "Apple Pay";
      case "google":
        return "Google Pay";
      default:
        return "Credit Card";
    }
  };

  const timelineSteps = [
    {
      title: "Order Confirmed",
      description: "Your order has been received and confirmed",
      date: new Date().toLocaleDateString(),
      completed: true,
    },
    {
      title: "Payment Processed",
      description: "Payment successfully processed",
      date: new Date().toLocaleDateString(),
      completed: true,
    },
    {
      title: "Preparing for Shipment",
      description: "Your items are being prepared for shipping",
      date: "In progress",
      completed: false,
    },
    {
      title: "Shipped",
      description: "Your order is on its way",
      date: "Pending",
      completed: false,
    },
    {
      title: "Delivered",
      description: "Your order has been delivered",
      date: getEstimatedDelivery(),
      completed: false,
    },
  ];

  return (
    <PageContainer>
      <Navbar cartItemsCount={0} />

      <Container>
        <SuccessCard>
          <SuccessIcon>
            <FaCheckCircle className="icon" />
          </SuccessIcon>

          <SuccessTitle>Order Confirmed!</SuccessTitle>
          <SuccessMessage>
            Thank you for your purchase! Your order has been successfully placed
            and we've sent a confirmation email to {orderData.email}.
          </SuccessMessage>

          <OrderNumber>
            <div className="label">Order Number</div>
            <div className="number">{orderData.orderNumber}</div>
          </OrderNumber>

          <ActionButtons>
            <ActionButton onClick={handlePrint}>
              <FaPrint />
              Print Receipt
            </ActionButton>
            <ActionButton onClick={handleDownload}>
              <FaDownload />
              Download Receipt
            </ActionButton>
          </ActionButtons>

          <ContinueShoppingButton to="/ecommerce/products">
            <FaShoppingBag />
            Continue Shopping
          </ContinueShoppingButton>
        </SuccessCard>

        <OrderDetails>
          <SectionTitle>Order Information</SectionTitle>

          <InfoGrid>
            <InfoCard>
              <FaEnvelope className="icon" />
              <div className="title">Confirmation Email</div>
              <div className="content">
                A confirmation email has been sent to:
                <br />
                <strong>{orderData.email}</strong>
              </div>
            </InfoCard>

            <InfoCard>
              <FaTruck className="icon" />
              <div className="title">Estimated Delivery</div>
              <div className="content">
                <strong>{getEstimatedDelivery()}</strong>
                <br />
                Free standard shipping
              </div>
            </InfoCard>

            <InfoCard>
              <FaCalendarAlt className="icon" />
              <div className="title">Payment Method</div>
              <div className="content">
                {getPaymentMethodName(orderData.paymentMethod)}
                <br />
                <strong>Total: ${orderData.total.toFixed(2)}</strong>
              </div>
            </InfoCard>
          </InfoGrid>

          <SectionTitle>Order Status</SectionTitle>
          <Timeline>
            {timelineSteps.map((step, index) => (
              <TimelineItem key={index} completed={step.completed}>
                <TimelineIcon completed={step.completed}>
                  {step.completed ? <FaCheckCircle /> : index + 1}
                </TimelineIcon>
                <TimelineContent>
                  <div className="title">{step.title}</div>
                  <div className="description">{step.description}</div>
                  <div className="date">{step.date}</div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>

          <div
            style={{
              background: theme.colors.gray50,
              padding: theme.spacing.lg,
              borderRadius: theme.borderRadius.md,
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, color: theme.colors.gray700 }}>
              <strong>Need help?</strong> Contact our customer support at{" "}
              <a
                href="mailto:support@shopmart.com"
                style={{ color: theme.colors.primary }}
              >
                support@shopmart.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+15551234567"
                style={{ color: theme.colors.primary }}
              >
                (555) 123-4567
              </a>
            </p>
          </div>
        </OrderDetails>
      </Container>

      <Footer />
    </PageContainer>
  );
};

export default OrderConfirmation;
