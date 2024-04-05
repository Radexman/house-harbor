import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc, Timestamp, GeoPoint } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FaShareAlt as ShareIcon } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ListingType } from '../../types/Listing.type';

import db, { firebaseApp } from '../../firebase.config';
import Spinner from '../../components/Spinner';

function Listing() {
  const [listing, setListing] = useState<ListingType>({
    data: {
      bathrooms: 0,
      bedrooms: 0,
      discountedPrice: 0,
      furnished: false,
      geolocation: new GeoPoint(0, 0),
      imagesUrls: [],
      location: '',
      name: '',
      offer: false,
      parking: false,
      regularPrice: 0,
      timestamp: new Timestamp(0, 0),
      type: '',
      userRef: '',
    },
    id: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        if (params.listingId) {
          const docRef = doc(db, 'listings', params.listingId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setListing((prevState) => ({
              ...prevState,
              data: {
                ...prevState.data,
                ...docSnap.data(),
              },
            }));
          } else {
            toast.error('No such document!');
          }
        }
      } catch (error) {
        toast.error(`Error fetching document: , ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!listing) {
    return <div>No data found</div>;
  }

  return (
    <main className="container mx-auto p-4">
      {/* SLIDER */}
      <div className="flex justify-between pt-4">
        <h1 className="text-3xl font-semibold">{listing.data.name}</h1>
        <button
          type="button"
          className="btn tooltip tooltip-bottom rounded-full"
          data-tip="Share Listing"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShareLinkCopied(true);

            setTimeout(() => {
              setShareLinkCopied(false);
            }, 2000);
          }}
        >
          <ShareIcon />
        </button>
      </div>
      <div className="flex justify-between">
        <div />
        {shareLinkCopied && <p className="-mr-4 text-sm">Link Copied</p>}
      </div>
      <p className="text-xl font-semibold">{listing.data.location}</p>
      <div className="flex items-center gap-2">
        <p className="text-xl font-semibold">
          $
          {listing.data.offer
            ? listing.data.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.data.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <div className="badge badge-primary">
          For {listing.data.type === 'rent' ? 'Rent' : 'Sale'}
        </div>
        {listing.data.offer && (
          <div className="badge badge-secondary badge-outline">
            ${listing.data.regularPrice - listing.data.discountedPrice} discount
          </div>
        )}
      </div>
      <div className="my-6">
        <h2 className="text-xl font-semibold">Home Equipment</h2>
        <ul className="my-2 space-y-1 text-sm font-semibold">
          <li>
            {listing.data.bedrooms > 1
              ? `${listing.data.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {listing.data.bathrooms > 1
              ? `${listing.data.bathrooms} Bathrooms`
              : '1 Bathroom'}
          </li>
          <li>{listing.data.parking && 'Parking Spot'}</li>
          <li>{listing.data.furnished && 'Furnished'}</li>
        </ul>
      </div>
      <div className="my-6">
        <h2 className="text-xl font-semibold">Location</h2>
        {/* Map */}
      </div>
      <div className="my-6">
        {auth.currentUser?.uid !== listing.data.userRef && (
          <button type="button" className="btn btn-primary">
            <Link
              to={`/contact/${listing.data.userRef}?listingName=${listing.data.name}`}
            >
              Contact Landlord
            </Link>
          </button>
        )}
      </div>
    </main>
  );
}

export default Listing;
