import { ListingType } from '../types/Listing.type';
import { CategoryPropTypes } from '../pages/Category/Category.types';

function Listings({ listings }: CategoryPropTypes) {
  return (
    <main>
      <ul>
        {listings.map((listing: ListingType) => (
          <div key={listing.id}>
            <p>{listing.data.name}</p>
            <p>{`${
              listing.data.parking ? 'This property has parking spot' : 'This property does not have parking spot'
            }`}</p>
          </div>
        ))}
      </ul>
    </main>
  );
}

export default Listings;
