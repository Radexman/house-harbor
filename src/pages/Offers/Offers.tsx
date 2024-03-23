import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import db from '../../firebase.config';
import { ListingType } from '../../types/Listing.type';
import Spinner from '../../components/Spinner';
import Listings from '../../components/Listings';

function Offers() {
  const [listings, setListings] = useState<ListingType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings');

      // Create a query for offer collection
      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        limit(10)
      );

      // Execute query
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

      console.log(listings);
    } catch (error) {
      toast.error('Could not fetch offer listings');
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold">Offers</h1>
    </div>
  );
}

export default Offers;
