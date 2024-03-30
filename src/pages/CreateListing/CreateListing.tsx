/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useEffect, useRef, ChangeEvent, useContext } from 'react';
import AppContext from '../../context/AppContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import db, { firebaseApp } from '../../firebase.config';
import { SingleListingType } from './SingleListing.types';
import Spinner from '../../components/Spinner';

function CreateListing() {
  const apiKey = import.meta.env.VITE_APP_GEOCODE_API_KEY;
  const apiUrl = import.meta.env.VITE_APP_GEOCODE_API_URL;
  const { theme } = useContext(AppContext);
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
    imagesUrls: {
      length: 0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      item(_index: number): File | null {
        throw new Error('Function not implemented.');
      },
      [Symbol.iterator](): IterableIterator<File> {
        throw new Error('Function not implemented.');
      },
    },
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
      const response = await fetch(`${apiUrl}${address}${apiKey}`);

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

    // Store images in Firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(firebaseApp);
        const fileName = `${auth.currentUser!.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, `images/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const transferProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                console.log('OK');
            }
          },
          (error) => {
            reject(error); // Rejecting the promise in case of an error
          },
          () => {
            // Resolving the promise with the download URL when upload is complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    // Store images in Firebase
    const imgUrls = await Promise.all(
      [...imagesUrls].map((image) => storeImage(image))
    ).catch(() => {
      setIsLoading(false);
      toast.error('Images not uploaded');
    });

    setIsLoading(false);
  };

  type FormEvent =
    | MouseEvent<HTMLButtonElement>
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>
    | ChangeEvent<HTMLInputElement & { files: FileList }>;

  const handleMutate = (e: FormEvent) => {
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
    <div className="mx-auto min-h-screen max-w-3xl p-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <header>
          <h1 className="text-center text-3xl font-semibold md:text-left md:text-4xl">
            Create A Listing
          </h1>
          <form
            onSubmit={handleSubmit}
            className={`${
              theme === 'dark' ? 'shadow-sm shadow-primary' : 'shadow-2xl'
            } mx-auto my-4 rounded-md p-4 `}
          >
            <div className="flex flex-col space-y-4">
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
                    } btn w-36 md:btn-wide`}
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
                    } btn w-36 md:btn-wide`}
                  >
                    Rent
                  </button>
                </div>
              </label>
            </div>
            <div className="divider" />
            <div className="flex flex-col space-y-4">
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
              <div className="flex flex-col space-y-4">
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
              <div className="flex flex-col space-y-4">
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
            <div className="flex flex-col space-y-4">
              <p className="text-lg font-semibold">Parking Spot</p>
              <label id="parking">
                <div className="space-x-2">
                  <button
                    type="button"
                    id="parking"
                    value="true"
                    onClick={handleMutate}
                    className={`${
                      parking ? 'btn-primary' : ''
                    } btn w-36 md:btn-wide`}
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
                    } btn w-36 md:btn-wide`}
                  >
                    No
                  </button>
                </div>
              </label>
            </div>
            <div className="divider" />
            <div className="flex flex-col space-y-4">
              <p className="text-lg font-semibold">Furnished</p>
              <label id="furnished">
                <div className="space-x-2">
                  <button
                    type="button"
                    id="furnished"
                    value="true"
                    onClick={handleMutate}
                    className={`${
                      furnished ? 'btn-primary' : ''
                    } btn w-36 md:btn-wide`}
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
                    } btn w-36 md:btn-wide`}
                  >
                    No
                  </button>
                </div>
              </label>
            </div>
            <div className="divider" />
            <div className="flex flex-col space-y-4">
              <p className="text-lg font-semibold">Address</p>
              <label htmlFor="address" />
              <textarea
                name="address"
                id="address"
                value={address}
                onChange={handleMutate}
                className="grow rounded-md border-2 bg-base-100 p-2 font-semibold"
                cols={30}
                rows={3}
              />
              {!geolocationEnabled && (
                <div className="flex flex-col space-y-4">
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
            <div className="flex flex-col space-y-4">
              <p className="text-lg font-semibold">Offer</p>
              <label id="offer">
                <div className="space-x-2">
                  <button
                    type="button"
                    id="offer"
                    value="true"
                    onClick={handleMutate}
                    className={`${
                      offer ? 'btn-primary' : ''
                    } btn w-36 md:btn-wide`}
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
                    } btn w-36 md:btn-wide`}
                  >
                    No
                  </button>
                </div>
              </label>
            </div>
            <div className="divider" />
            <div className="flex space-x-6">
              <div className="flex flex-col space-y-4">
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
                  <div className="flex flex-col space-y-4">
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
                className="file-input file-input-bordered file-input-primary w-full"
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
