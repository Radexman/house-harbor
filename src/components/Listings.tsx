import { ListingType } from '../types/Listing.type';
import { CategoryPropTypes } from '../pages/Category/Category.types';

function Listings({ listings }: CategoryPropTypes) {
  return (
    <main>
      <ul>
        {listings.map((listing: ListingType) => (
          <p>{listing.data.name}</p>
        ))}
      </ul>
    </main>
  );
}

export default Listings;
