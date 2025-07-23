import AutomobileMain from "./src/automobiles/pages/AutomobileMain";
import DealerDashboard from "./src/automobiles/pages/DealerDashboard";
import VehicleDetail from "./src/automobiles/pages/VehicleDetail";
import Vehicles from "./src/automobiles/pages/Vehicles";
import Wishlist from "./src/automobiles/pages/Wishlist";
import BusinessWebsitePage from "./src/business/pages/BusinessWebsitePage";
import LoginPage from "./src/components/auth/LoginPage";
import RegisterPage from "./src/components/auth/RegisterPage";
import AutomobileCategoryLanding from "./src/components/category/AutomobileCategoryLanding";
import BusinessCategoryLanding from "./src/components/category/BusinessCategoryLanding";
import EcommerceCategoryLanding from "./src/components/category/EcommerceCategoryLanding";
import HotelCategoryLanding from "./src/components/category/HotelCategoryLanding";
import WeddingCategoryLanding from "./src/components/category/WeddingCategoryLanding";
import OwnerDashboard from "./src/components/owner/OwnerDashboard";
import { OwnerDashboard as BuisnessOwner } from "./src/business/pages/OwnerDashboard";
import SmartRouter from "./src/components/SmartRouter";
import StartBuilding from "./src/components/StartBuilding";
import PlatformHomePage from "./src/components/user/PlatformHomePage";
import PricingPage from "./src/components/user/PricingPage";
import Cart from "./src/ecommerce/pages/Cart";
import EcommerceMain from "./src/ecommerce/pages/EcommerceMain";
import MyEnquiries from "./src/ecommerce/pages/MyEnquiries";
import ProductDetail from "./src/ecommerce/pages/ProductDetail";
import Products from "./src/ecommerce/pages/Products";
import SellerDashboard from "./src/ecommerce/pages/SellerDashboard";
import Booking from "./src/hotel/pages/Booking";
import BookingConfirmation from "./src/hotel/pages/BookingConfirmation";
import HotelDetail from "./src/hotel/pages/HotelDetail";
import MyBookings from "./src/hotel/pages/MyBookings";
import RoomDetail from "./src/hotel/pages/RoomDetail";
import RoomsBooking from "./src/hotel/pages/RoomsBooking";
import VendorDashboard from "./src/weddings/pages/VendorDashboard";
import VendorPage from "./src/weddings/pages/VendorPage";
import VendorPortfolio from "./src/weddings/pages/VendorPortfolio";
import WeddingHome from "./src/weddings/pages/WeddingHome";
import RoomList from "./src/hotel/pages/RoomList";

const folderStructure = {
  MainWebsite: [
    {
      route: "/",
      component: <PlatformHomePage />,
      description: "this is main home page with all cards of website we offer",
    },
    {
      route: "/pricing",
      component: <PricingPage />,
      description: "this is pricing page",
    },

    {
      route: "/login",
      component: <LoginPage />,
      description:
        "this is main login page which comes after clicking login in landing page",
    },

    {
      route: "/register",
      component: <RegisterPage />,
      description:
        "this is main register page which comes after clicking register in landing page",
    },
    {
      route: "/start-building",
      component: <StartBuilding />,
      description:
        "this page is for creating website , stepper type form while creating website",
    },
    {
      route: "/category/hotel",
      component: <HotelCategoryLanding />,
      description: "this page has sample websites for hotel",
    },
    {
      route: "/category/ecommerce",
      component: <EcommerceCategoryLanding />,
      description: "this page has sample websites for Ecommerce",
    },
    {
      route: "/category/wedding",
      component: <WeddingCategoryLanding />,
      description: "this page has sample websites for wedding",
    },
    {
      route: "/category/automobile",
      component: <AutomobileCategoryLanding />,
      description: "this page has sample websites for automobile",
    },
    {
      route: "/category/business",
      component: <BusinessCategoryLanding />,
      description: "this page has sample websites for business",
    },
  ],

  // smart router for specific demo website routes

  SmartRouter: [
    {
      route: "/:slug",
      component: <SmartRouter />,
      description:
        "this is not page, it detectes type of module and redirects to that route for demo website",
    },
  ],

  // routes for specific demo website routes in smartrouter or app.js
  Hotels: [
    {
      route: "/:slug",
      component: <HotelDetail />,
      location: "in smart router in hotel module",
      description:
        "this page is landing page, basis on regex it comes here, you can check what regex does",
    },
    {
      route: "/:slug/owner",
      component: <OwnerDashboard />,
      location: "in smart router in hotel module",
      description:
        "this page is dashboard page, .includes check is there on path ",
    },
    {
      route: "/:slug/booking",
      component: <RoomList />,
      location: "in smart router in hotel module",
      description:
        "this page is room list , it comes after clicking 'Book Your Stay' on landing page ",
    },
    {
      route: "unknown",
      component: <RoomDetail />,
      location: "in smart router in hotel module",
      description:
        "this page is particular room detail page , it comes after clicking 'View Room' ",
    },
    {
      route: "unknown",
      component: <MyBookings />,
      location: "in smart router in hotel module",
      description: "its for user this page is to see booking made by the user ",
    },
    {
      route: "unknown",
      component: <Booking />,
      location: "in smart router in hotel module",
      description: "its booking screen which comes after book now",
    },
    {
      route: "unknown",
      component: <BookingConfirmation />,
      location: "in smart router in hotel module",
      description: "its booking confirmed screen",
    },
  ],

  Ecommerce: [
    {
      route: "/:slug",
      component: <EcommerceMain />,
      location: "in smart router in ecommerce module",
      description:
        "this page is landing page, basis on regex it comes here, you can check what regex does",
    },
    {
      route: "/:slug/products",
      component: <Products />,
      location: "in smart router in ecommerce module",
      description:
        "this page shows all products under category, categry can be selected here only",
    },
    {
      route: "/:slug/product/",
      component: <ProductDetail />,
      location: "in smart router in ecommerce module",
      description: "this page shows productdetail of any product",
    },
    {
      route: "/:slug/cart",
      component: <Cart />,
      location: "in smart router in ecommerce module",
      description: "this page shows Cart with cart items",
    },
    {
      route: "/:slug/my-enquiries",
      component: <MyEnquiries />,
      location: "in smart router in ecommerce module",
      description: "its for user, user can see all enquiries sent",
    },
    {
      route: "/:slug/owner",
      component: <SellerDashboard />,
      location: "in smart router in ecommerce module",
      description: "its seller dasboard",
    },
  ],
  Wedding: [
    {
      route: "/:slug",
      component: <VendorPage />,
      location: "in smart router in wedding module",
      description:
        "this page is landing page, basis on multiple ternary condition",
    },
    {
      route: "/:slug/portfolio",
      component: <VendorPortfolio />,
      location: "in smart router in wedding module",
      description: "this page shows work and locations",
    },
    {
      route: "/:slug/dashboard",
      component: <VendorDashboard />,
      location: "in smart router in wedding module",
      description: "this page shows dashboard",
    },
  ],
  AutoMobile: [
    {
      route: "/:slug",
      component: <AutomobileMain />,
      location: "in smart router in AutoMobile module",
      description: "this page is landing page, basis on regex",
    },
    {
      route: "/:slug/vehicles",
      component: <Vehicles />,
      location: "in smart router in AutoMobile module",
      description: "this page opens all vehicles list",
    },
    {
      route: "/:slug/vehicle/",
      component: <VehicleDetail />,
      location: "in smart router in AutoMobile module",
      description: "this page opens specific vehicle detail",
    },
    {
      route: "/:slug/wishlist",
      component: <Wishlist />,
      location: "in smart router in AutoMobile module",
      description: "this page opens wishlist",
    },
    {
      route: "/:slug/dealer-dashboard",
      component: <DealerDashboard />,
      location: "in smart router in AutoMobile module",
      description: "this page opens dasboard",
    },
  ],
  Buisness: [
    {
      route: "/:slug",
      component: <BusinessWebsitePage />,
      location: "in smart router in Buisness module",
      description: "this page is landing page, basis on regex",
    },
    {
      route: "/:slug/owner",
      component: <BuisnessOwner />, // this is import OwnerDashboard, we have imported it {OwnerDashboard as BuisnessOwner}
      location: "in smart router in Buisness module",
      description: "this page is dashboard",
    },
  ],
};
