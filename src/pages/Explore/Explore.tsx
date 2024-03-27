import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import db from '../../firebase.config';
import AppContext from '../../context/AppContext';
import rentImage from '../../assets/images/interior-2.jpg';
import saleImage from '../../assets/images/house-1.jpg';
import { ListingType } from '../../types/Listing.type';

function Explore() {
  const [rentListings, setRentListings] = useState<ListingType[]>([]);
  const [saleListings, setSaleListings] = useState<ListingType[]>([]);

  const { theme } = useContext(AppContext);

  const fetchListigs = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings');

      // Create a query for listings
      const qr = query(listingsRef, where('type', '==', 'rent'));
      const qs = query(listingsRef, where('type', '==', 'sale'));

      // Execute query
      const queryrSnap = await getDocs(qr);
      const querysSnap = await getDocs(qs);

      const fetchedListingsRent: ListingType[] = [];
      const fetchedListingsSale: ListingType[] = [];

      queryrSnap.forEach((doc) => {
        const data = doc.data() as ListingType['data'];
        fetchedListingsRent.push({
          id: doc.id,
          data,
        });
      });

      querysSnap.forEach((doc) => {
        const data = doc.data() as ListingType['data'];
        fetchedListingsSale.push({
          id: doc.id,
          data,
        });
      });

      setRentListings(fetchedListingsRent);
      setSaleListings(fetchedListingsSale);
    } catch (error) {
      toast.error('Something went wrong with getting listings');
    }
  };

  useEffect(() => {
    fetchListigs();
  });

  return (
    <div className="container mx-auto mb-20 p-4">
      <header>
        <h1 className="text-center text-4xl font-semibold md:text-left">
          Explore
        </h1>
      </header>
      <main>
        <p className="py-4 text-justify md:text-left">
          Welcome to our House Harbor! Whether you&apos;re in search of your
          dream home to buy or a cozy place to rent, explore our diverse
          selection of listings. Browse through our collection of available
          properties categorized conveniently for sale or rent, and embark on
          your journey to find the perfect place to call home.
        </p>
        <div className="mx-auto flex flex-col items-center justify-center gap-6 md:flex-row">
          <Link to="/category/sale" className="w-full md:w-1/2">
            <div
              className={`card rounded-xl bg-base-100 transition-all duration-200 ${
                theme === 'dark'
                  ? 'shadow-sm shadow-primary hover:shadow-lg hover:shadow-primary'
                  : 'shadow-lg hover:shadow-2xl'
              }`}
            >
              <figure>
                <img src={saleImage} alt="Properties for sale page" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Properties For Rent
                  <div className="badge badge-secondary">
                    {saleListings.length} Avialable
                  </div>
                </h2>
                <p>
                  Discover your dream home for sale here. Explore a variety of
                  houses on the market, from charming cottages to luxurious
                  estates.
                </p>
              </div>
            </div>
          </Link>
          <Link to="category/rent" className="w-full md:w-1/2">
            <div
              className={`card rounded-xl bg-base-100  transition-all duration-200 ${
                theme === 'dark'
                  ? 'shadow-sm shadow-primary hover:shadow-lg hover:shadow-primary'
                  : 'shadow-lg hover:shadow-2xl'
              }`}
            >
              <figure>
                <img src={rentImage} alt="Properties for rent page" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Properties For Sale
                  <div className="badge badge-secondary">
                    {rentListings.length} Avialable
                  </div>
                </h2>
                <p>
                  Find your perfect rental home here. Explore a range of houses
                  available for rent, from cozy apartments to spacious family
                  homes.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
