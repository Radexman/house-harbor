import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <button type="button" className="text-2xl font-semibold" onClick={() => navigate('')}>
          House Harbor
        </button>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal hidden px-1 sm:flex">
          <li>
            <button type="button" onClick={() => navigate('')}>
              Explore
            </button>
          </li>
          <li>
            <button type="button" onClick={() => navigate('/offers')}>
              Offers
            </button>
          </li>
          <li>
            <button type="button" onClick={() => navigate('/profile')}>
              Profile
            </button>
          </li>
        </ul>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

export default Navbar;
