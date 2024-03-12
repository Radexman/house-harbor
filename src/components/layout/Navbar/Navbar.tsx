import { useNavigate, useLocation, Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/">
          <span>House Harbor</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
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
      </div>
    </nav>
  );
}

export default Navbar;
