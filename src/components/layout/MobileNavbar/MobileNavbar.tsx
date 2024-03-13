import { FaRegCompass as ExploreIcon, FaRegUser as ProfileIcon } from 'react-icons/fa';
import { IoIosPricetag as OffersIcon } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

function MobileNavbar() {
  return (
    <nav className="block sm:hidden">
      <div className="btm-nav">
        <NavLink to="/" className="">
          <button type="button" className="flex flex-col items-center">
            <ExploreIcon size={20} />
            <span className="btm-nav-label">Explore</span>
          </button>
        </NavLink>
        <NavLink to="/offers">
          <button type="button" className="flex flex-col items-center">
            <OffersIcon size={20} />
            <span className="btm-nav-label">Offers</span>
          </button>
        </NavLink>
        <NavLink to="/profile">
          <button type="button" className="flex flex-col items-center">
            <ProfileIcon size={20} />
            <span className="btm-nav-label">Profile</span>
          </button>
        </NavLink>
      </div>
    </nav>
  );
}

export default MobileNavbar;
