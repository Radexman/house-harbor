import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContextProvider } from './context/AppContext';
import Explore from './pages/Explore/Explore';
import Category from './pages/Category/Category';
import Offers from './pages/Offers/Offers';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Footer from './components/layout/Footer/Footer';
import Navbar from './components/layout/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound/NotFound';
import MobileNavbar from './components/layout/MobileNavbar/MobileNavbar';
import Profile from './pages/Profile/Profile';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing/CreateListing';
import Listing from './pages/Listing/Listing';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <AppContextProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route
          path="/category/:categoryName/:listingId"
          element={<Listing />}
        />
        <Route path="/contact/:landlordId" element={<Contact />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MobileNavbar />
      <Footer />
    </AppContextProvider>
  );
}

export function WrappedApp() {
  return (
    <>
      <Router>
        <App />
      </Router>
      <ToastContainer position="bottom-left" />
    </>
  );
}

export default App;
