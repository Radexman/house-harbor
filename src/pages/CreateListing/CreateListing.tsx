/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useRef, FormEvent } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { firebaseApp } from '../../firebase.config';
import { SingleListingType } from './SingleListing.types';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SingleListingType>({
    type: 'rent',
    userRef: '',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
    imagesUrls: FileList,
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
    address,
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    if (discountedPrice >= regularPrice) {
      setIsLoading(false);
      toast.error('Discounted price needs to be less than regular price');
    }

    if (imagesUrls.length > 6) {
      setIsLoading(false);
      toast.error('Max 6 images');
    }

    const geolocation = {
      lat: 0,
      lng: 0,
    };

    let location = '';

    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`
      );

      const data = await response.json();
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location =
        data.status === 'ZERO_RESULTS'
          ? 'undefined'
          : data.results[0]?.formatted_address;

      if (location === undefined || location.includes('undefined')) {
        setIsLoading(false);
        toast.error('Please enter a corret address');
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
      location = address;
    }

    setIsLoading(false);
  };

  const handleMutate = (e) => {
    let boolean: null | boolean = null;

    if (e.target.value === 'true') {
      boolean = true;
    }

    if (e.target.value === 'false') {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        imagesUrls: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

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
                    value={bedrooms}
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
                    value={bathrooms}
                    min="1"
                    max="50"
                    className="w-20 grow font-semibold "
                    required
                  />
                </label>
              </div>
            </div>
            <div className="divider" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Parking Spot</p>
              <label id="parking">
                <div className="space-x-2">
                  <button
                    type="button"
                    id="parking"
                    value="true"
                    onClick={handleMutate}
                    className={`${parking ? 'btn-primary' : ''} btn btn-wide`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="parking"
                    value="false"
                    onClick={handleMutate}
                    className={`${
                      !parking && parking !== null ? 'btn-primary' : ''
                    } btn btn-wide`}
                  >
                    No
                  </button>
                </div>
              </label>
            </div>
            <div className="divider" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Furnished</p>
              <label id="furnished">
                <div className="space-x-2">
                  <button
                    type="button"
                    id="furnished"
                    value="true"
                    onClick={handleMutate}
                    className={`${furnished ? 'btn-primary' : ''} btn btn-wide`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="furnished"
                    value="false"
                    onClick={handleMutate}
                    className={`${
                      !furnished && furnished !== null ? 'btn-primary' : ''
                    } btn btn-wide`}
                  >
                    No
                  </button>
                </div>
              </label>
            </div>
            <div className="divider" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Address</p>
              <label htmlFor="address" />
              <textarea
                name="address"
                id="address"
                value={address}
                onChange={handleMutate}
                className="grow rounded-md border-2 p-2 font-semibold"
                cols={30}
                rows={10}
              />
              {!geolocationEnabled && (
                <div className="flex flex-col space-y-2">
                  <p className="text-lg font-semibold">Latitude</p>
                  <label
                    htmlFor="latitude"
                    id="latitude"
                    className="input input-bordered flex items-center gap-2"
                  >
                    <input
                      type="text"
                      id="latitude"
                      value={latitude}
                      className="grow font-semibold"
                      onChange={handleMutate}
                      required
                    />
                  </label>
                  <p className="text-lg font-semibold">Longitude</p>
                  <label
                    htmlFor="longitude"
                    id="longitude"
                    className="input input-bordered flex items-center gap-2"
                  >
                    <input
                      type="text"
                      id="longitude"
                      value={longitude}
                      className="grow font-semibold"
                      onChange={handleMutate}
                      required
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="divider" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Offer</p>
              <label id="offer">
                <div className="space-x-2">
                  <button
                    type="button"
                    id="offer"
                    value="true"
                    onClick={handleMutate}
                    className={`${offer ? 'btn-primary' : ''} btn btn-wide`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="offer"
                    value="false"
                    onClick={handleMutate}
                    className={`${
                      !offer && offer !== null ? 'btn-primary' : ''
                    } btn btn-wide`}
                  >
                    No
                  </button>
                </div>
              </label>
            </div>
            <div className="divider" />
            <div className="flex space-x-6">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Regular Price</p>
                <label
                  htmlFor="regularPrice"
                  id="regularPrice"
                  className="input input-bordered flex items-center gap-2"
                >
                  <input
                    type="number"
                    id="regularPrice"
                    value={regularPrice}
                    onChange={handleMutate}
                    min="50"
                    max="7500000000"
                    className="w-20 grow font-semibold"
                    required
                  />
                  <p className="font-semibold">$</p>
                  {type === 'rent' && <p className="font-semibold"> / Month</p>}
                </label>
              </div>
            </div>
            <div className="divider" />
            {offer && (
              <>
                <div className="flex space-x-6">
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">Discounted Price</p>
                    <label
                      htmlFor="discountedPrice"
                      id="discountedPrice"
                      className="input input-bordered flex items-center gap-2"
                    >
                      <input
                        type="number"
                        id="discountedPrice"
                        onChange={handleMutate}
                        value={discountedPrice}
                        min="50"
                        max="7500000000"
                        className="w-20 grow font-semibold"
                        required
                      />
                      <p className="font-semibold">$</p>
                      {type === 'rent' && (
                        <p className="font-semibold"> / Month</p>
                      )}
                    </label>
                  </div>
                </div>
                <div className="divider" />
              </>
            )}
            <div className="flex flex-col space-y-2">
              <p className="text-lg font-semibold">Images</p>
              <p>The first image will be the cover (max 6).</p>
              <label htmlFor="imagesUrls" id="imagesUrls" />
              <input
                type="file"
                id="imagesUrls"
                onChange={handleMutate}
                name="imagesUrls"
                max={6}
                accept=".jpg,.png,.jpeg"
                multiple
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                required
              />
            </div>
            <div className="divider" />
            <button type="submit" className="btn btn-primary btn-wide mt-8">
              Create Listing
            </button>
          </form>
        </header>
      )}
    </div>
  );
}

export default CreateListing;
