import { Link } from 'react-router-dom';
import { MdDeleteForever as DeleteIcon } from 'react-icons/md';
import { IoIosBed as BedroomIcon } from 'react-icons/io';
import { FaBath as BathroomIcon } from 'react-icons/fa';
import { ListingOnePropTypes } from './ListingOne.types';

function ListingItem({ listing, id }: ListingOnePropTypes) {
  return (
    <li
      key={id}
      className="mx-auto max-w-6xl rounded-md shadow-md shadow-stone-500 transition-all hover:shadow-xl hover:shadow-stone-500"
    >
      <Link
        to={`/category/${listing.type}/${id}`}
        className="flex flex-col gap-3 rounded-md bg-secondary-content p-3 sm:flex-row"
      >
        <div>
          <img
            src={listing.imagesUrls[0]}
            alt={`${listing.name} house`}
            className="h-auto w-full rounded-md sm:h-32 sm:min-w-52"
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
