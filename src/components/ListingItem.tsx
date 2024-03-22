import { Link } from 'react-router-dom';
import { MdDeleteForever as DeleteIcon } from 'react-icons/md';
import { IoIosBed as BedroomIcon } from 'react-icons/io';
import { FaBath as BathroomIcon } from 'react-icons/fa';
import utils from '../utils/utils';
import { ListingOnePropTypes } from './ListingOne.types';

function ListingItem({ listing }: ListingOnePropTypes) {
  return (
    <li key={listing.id} className="mx-auto max-w-6xl">
      <Link
        to={`/category/${listing.data.type}/${listing.id}`}
        className="flex gap-3 rounded-md bg-secondary-content p-3"
      >
        <div>
          <img
            src={listing.data.imagesUrls[0]}
            alt={`${listing.data.name} house`}
            className="h-32 w-60 rounded-lg"
          />
        </div>
        <div>
          <p className="text-sm">{listing.data.location}</p>
          <h2 className="text-2xl font-bold">{listing.data.name}</h2>
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
                : 'Bedroom'}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <BathroomIcon />
            <p className="text-sm">
              {listing.data.bathrooms > 1
                ? `${listing.data.bathrooms} Bathrooms`
                : 'Bathroom'}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ListingItem;
