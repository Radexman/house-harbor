import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteForever as DeleteIcon } from 'react-icons/md';
import { IoIosBed as BedroomIcon } from 'react-icons/io';
import { FaBath as BathroomIcon } from 'react-icons/fa';
import { ListingOnePropTypes } from './ListingOne.types';
import AppContext from '../context/AppContext';

function ListingItem({ listing, id }: ListingOnePropTypes) {
  const { theme } = useContext(AppContext);

  return (
    <li
      key={id}
      className={`${
        theme === 'dark'
          ? 'shadow-sm shadow-primary hover:shadow-lg hover:shadow-primary'
          : 'shadow-lg hover:shadow-2xl'
      } container mx-auto rounded-md  transition-all `}
    >
      <Link
        to={`/category/${listing.type}/${id}`}
        className="flex flex-col gap-3 rounded-md p-3 sm:flex-row"
      >
        <div>
          <img
            src={listing.imagesUrls[0]}
            alt={`${listing.name} house`}
            className="h-auto w-full rounded-md sm:h-32 sm:w-60"
          />
        </div>
        <div>
          <p className="text-sm">{listing.location}</p>
          <h2 className="text-xl font-bold md:text-2xl">{listing.name}</h2>
          <p className="pt-1 text-sm font-semibold text-primary">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>

          <div className="flex items-center gap-1">
            <BedroomIcon />
            <p className="text-sm">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <BathroomIcon />
            <p className="text-sm">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : '1 Bathroom'}
            </p>
          </div>
        </div>
      </Link>
      {/* Add on delete incon */}
    </li>
  );
}

export default ListingItem;
