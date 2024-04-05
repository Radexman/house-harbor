import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FaShareAlt as ShareIcon } from 'react-icons/fa';
import { ListingType } from '../../types/Listing.type';
import db, { firebaseApp } from '../../firebase.config';
import Spinner from '../../components/Spinner';

function Listing() {
  const [listing, setListing] = useState(null); // Initialize with null
  const [isLoading, setIsLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const docRef = doc(db, 'listings', params.listingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(docSnap.data());
          setListing(docSnap.data()); // Set listing state
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (isLoading) {
    return <Spinner />; // Show spinner while loading
  }

  if (!listing) {
    return <div>No data found</div>; // Handle case where listing is null
  }

  return (
    <div className="container mx-auto p-4">
      <h1>Single Listing</h1>
      {/* Render listing data here */}
    </div>
  );
}

export default Listing;
