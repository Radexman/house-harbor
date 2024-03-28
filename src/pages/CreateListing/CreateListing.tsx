/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useRef, FormEvent } from 'react';
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

  const {
    type,
    name,
    bedrooms,
    userRef,
    bathrooms,
    parking,
    furnished,
    location,
    offer,
    regularPrice,
    discountedPrice,
    imagesUrls,
    latitude,
    longitude,
  } = formData;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleMutate = () => {};

  return (
    <div className="container mx-auto min-h-screen p-4">
      <h1 className="text-4xl font-semibold">Create a Listing</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <header>
          <form onSubmit={handleSubmit} className="rounded-md p-4 shadow-md">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Sell / Rent</p>
              <label id="type">
                <div className="space-x-2">
                  <button
                    type="button"
                    id="type"
                    value="sale"
                    onClick={handleMutate}
                    className={`${
                      type === 'sale' ? 'btn-primary' : ''
                    } btn btn-wide`}
                  >
                    Sell
                  </button>
                  <button
                    type="button"
                    id="type"
                    value="rent"
                    onClick={handleMutate}
                    className={`${
                      type === 'rent' ? 'btn-primary' : ''
                    } btn btn-wide`}
                  >
                    Rent
                  </button>
                </div>
              </label>
            </div>
            <div className="divider" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Name</p>
              <label
                htmlFor="name"
                id="name"
                className="input input-bordered flex items-center gap-2"
              >
                <input
                  type="text"
                  id="name"
                  value={name}
                  className="grow font-semibold"
                  onChange={handleMutate}
                  required
                />
              </label>
            </div>
            <div className="divider" />
            <div className="flex space-x-6">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Bedrooms</p>
                <label
                  htmlFor="bedrooms"
                  id="bedrooms"
                  className="input input-bordered flex items-center gap-2"
                >
                  <input
                    type="number"
                    id="bedrooms"
                    onChange={handleMutate}
                    min="1"
                    max="50"
                    className="w-20 grow font-semibold"
                    required
                  />
                </label>
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Bathrooms</p>
                <label
                  htmlFor="bathrooms"
                  id="bathrooms"
                  className="input input-bordered flex items-center gap-2"
                >
                  <input
                    type="number"
                    id="bathrooms"
                    onChange={handleMutate}
                    min="1"
                    max="50"
                    className="w-20 grow font-semibold "
                    required
                  />
                </label>
              </div>
            </div>
          </form>
        </header>
      )}
    </div>
  );
}

export default CreateListing;
