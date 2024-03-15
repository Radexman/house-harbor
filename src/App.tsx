import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContextProvider } from './context/AppContext';
import Explore from './pages/Explore/Explore';
import Offers from './pages/Offers/Offers';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Navbar from './components/layout/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound/NotFound';
import MobileNavbar from './components/layout/MobileNavbar/MobileNavbar';
import Profile from './pages/Profile/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AppContextProvider>
      <div className="min-h-screen">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <MobileNavbar />
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
