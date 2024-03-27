import { Link } from 'react-router-dom';
import {
  FaLinkedin as LinkedInIcon,
  FaTwitterSquare as TwitterIcon,
  FaFacebookSquare as FacebookIcon,
} from 'react-icons/fa';
import logo from '../../../assets/images/logo.png';

function Footer() {
  return (
    <div className="absolute inset-x-0">
      <footer className="footer bg-base-200 p-10 text-base-content">
        <nav>
          <h6 className="footer-title">Menu</h6>
          <Link className="hover:underline" to="/">
            Explore
          </Link>
          <Link className="hover:underline" to="/offers">
            Offers
          </Link>
          <Link className="hover:underline" to="/profile">
            Profile
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Listings</h6>
          <Link className="hover:underline" to="/category/rent">
            Properties For Rent
          </Link>
          <Link className="hover:underline" to="/category/sale">
            Properties For Sale
          </Link>
          <Link className="hover:underline" to="/create-listing">
            Create Listing
          </Link>
        </nav>
      </footer>
      <footer className="footer border-t border-base-300 bg-base-200 px-10 py-4 text-base-content">
        <aside className="grid-flow-col items-center">
          <img
            src={logo}
            alt="House Harbor logo created by Maxim Kulikov from Noun Project"
            className="h-10"
          />
          <p>
            House Harbor
            <br />
            Designed and created by Radosław Siek
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://www.linkedin.com/in/rados%C5%82aw-siek-320b66209/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon size={30} />
            </a>
            <a
              href="https://www.linkedin.com/in/rados%C5%82aw-siek-320b66209/"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon size={30} />
            </a>
            <a
              href="https://www.linkedin.com/in/rados%C5%82aw-siek-320b66209/"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon size={30} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default Footer;
