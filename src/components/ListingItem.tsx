import { Link } from 'react-router-dom';
import { MdDeleteForever as DeleteIcon } from 'react-icons/md';
import { IoIosBed as BedroomIcon } from 'react-icons/io';
import { FaBath as BathroomIcon } from 'react-icons/fa';
import { ListingOnePropTypes } from './ListingOne.types';

function ListingItem({ listing }: ListingOnePropTypes) {
  return (
    <li key={listing.id} className="mx-auto max-w-6xl shadow-md">
      <Link
        to={`/category/${listing.data.type}/${listing.id}`}
        className="flex flex-col gap-3 rounded-md bg-secondary-content p-3 md:flex-row"
      >
        <div>
          <img
            src={listing.data.imagesUrls[0]}
            alt={`${listing.data.name} house`}
            className="h-auto w-full rounded-lg md:h-32 md:min-w-52"
          />
        </div>
        <div>
          <p className="text-sm">{listing.data.location}</p>
          <h2 className="text-xl font-bold md:text-2xl">{listing.data.name}</h2>
          <p className="pt-1 text-sm font-semibold text-primary">
            $
            {listing.data.offer
              ? listing.data.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.data.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
          <div className="flex items-center gap-1">
            <BedroomIcon />
            <p className="text-sm">
              {listing.data.bedrooms > 1
                ? `${listing.data.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <BathroomIcon />
            <p className="text-sm">
              {listing.data.bathrooms > 1
                ? `${listing.data.bathrooms} Bathrooms`
                : '1 Bathroom'}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ListingItem;
