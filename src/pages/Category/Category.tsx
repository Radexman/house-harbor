/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import db from '../../firebase.config';
import { ListingType } from '../../types/Listing.type';
import Spinner from '../../components/Spinner';
import Listings from '../../components/Listings';

function Category() {
  const [listings, setListings] = useState<ListingType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const fetchListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings');

      //  Create a query
      const q = query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(10));

      //   Execute query
      const querySnap = await getDocs(q);

      const fetchedListings: ListingType[] = [];

      querySnap.forEach((doc) => {
        const data = doc.data() as ListingType['data'];
        fetchedListings.push({
          id: doc.id,
          data,
        });
      });

      setListings(fetchedListings);
      setIsLoading(false);
    } catch (error) {
      toast.error('Could not fetch listings');
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="container mx-auto mb-20 p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">
          {params.categoryName === 'rent' ? 'Properties For Rent' : 'Properties For Sale'}
        </h1>
      </header>
      {isLoading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <Listings listings={listings} />
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
