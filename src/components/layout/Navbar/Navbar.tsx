import { useNavigate, useLocation, Link } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

function Navbar() {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/">
          <p className="text-2xl">House Harbor</p>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal hidden px-1 sm:flex">
          <li>
            <Link to="/">Explore</Link>
          </li>
          <li>
            <Link to="/offers">Offers</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

export default Navbar;
