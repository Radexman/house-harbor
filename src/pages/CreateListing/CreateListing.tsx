import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { firebaseApp } from '../../firebase.config';
import Spinner from '../../components/Spinner';

function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'rent',
    userRef: '',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    location: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    imagesUrls: {},
    latitude: 0,
    longitude: 0,
  });

  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate('/sign-in');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [auth, formData, isMounted, navigate]);

  return (
    <div className="container mx-auto min-h-screen p-4">
      <h1 className="text-4xl font-semibold">Create Listing</h1>
      {isLoading ? <Spinner /> : <div>Form</div>}
    </div>
  );
}

export default CreateListing;
