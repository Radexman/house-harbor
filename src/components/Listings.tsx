import { ListingType } from '../types/Listing.type';
import { CategoryPropTypes } from '../pages/Category/Category.types';
import ListingItem from './ListingItem';

function Listings({ listings }: CategoryPropTypes) {
  return (
    <main>
      <ul className="space-y-8">
        {listings.map((listing: ListingType) => (
          <ListingItem listing={listing} />
        ))}
      </ul>
    </main>
  );
}

export default Listings;
