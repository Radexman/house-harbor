import { Link } from 'react-router-dom';
import { MdDeleteForever as DeleteIcon } from 'react-icons/md';
import { IoIosBed as BedroomIcon } from 'react-icons/io';
import { FaBath as BathroomIcon } from 'react-icons/fa';
import utils from '../utils/utils';
import { ListingOnePropTypes } from './ListingOne.types';

function ListingItem({ listing }: ListingOnePropTypes) {
  const { formatAmount } = utils;

  return (
    <li key={listing.id}>
      <Link
        to={`/category/${listing.data.type}/${listing.id}`}
        className="flex gap-3 rounded-md bg-secondary-content p-4"
      >
        <div>
          <img src={listing.data.imagesUrls[0]} alt={`${listing.data.name} house`} className="h-32 w-60 rounded-lg" />
        </div>
        <div>
          <p className="text-sm">{listing.data.location}</p>
          <p className="text-2xl">{listing.data.name}</p>
          <p>
            ${listing.data.offer ? formatAmount(listing.data.regularPrice) : formatAmount(listing.data.discountedPrice)}
          </p>
        </div>
      </Link>
    </li>
  );
}

export default ListingItem;
