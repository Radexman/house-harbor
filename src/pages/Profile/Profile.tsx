import { useNavigate, Link } from 'react-router-dom';
import {
  IoIosArrowForward as ArrowIcon,
  IoIosHome as HomeIcon,
} from 'react-icons/io';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { FaUserEdit as NameIcon } from 'react-icons/fa';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import db from '../../firebase.config';

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const { currentUser } = auth;
    if (currentUser) {
      setFormData({
        name: currentUser.displayName!,
        email: currentUser.email!,
      });
    }
  }, [auth, auth.currentUser]);

  const { name, email } = formData;

  const handleLogout = () => {
    auth.signOut();
    navigate('/sign-in');
  };

  const handleSubmit = async () => {
    try {
      if (auth.currentUser?.displayName !== name) {
        // update diaplay name in db
        await updateProfile(auth.currentUser!, {
          displayName: name,
        });

        // update in firestore
        const userRef = doc(db, 'users', auth.currentUser!.uid);
        await updateDoc(userRef, {
          name,
        });
        toast.info('Upate succesfull');
      }
    } catch (error) {
      toast.error('Could not update profile details');
    }
  };

  const handleClick = () => {
    if (changeDetails) {
      handleSubmit();
    }
    setChangeDetails((prevState) => !prevState);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    if (changeDetails && inputRef.current) {
      inputRef.current.focus();
    }
  }, [changeDetails]);

  return (
    <div className="container mx-auto min-h-screen p-4">
      <header className="mt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold">My Profile</h1>
          <button
            onClick={handleLogout}
            type="button"
            className="btn btn-primary btn-sm"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="py-4">
        <p className="pb-4">
          Welcome to your profile page. Here, you can review and update your
          information, create captivating listings for sale or rent, and easily
          log out when you&apos;re done. Take control of your home listing
          journey effortlessly.
        </p>
        <h2 className="pb-2 text-xl font-semibold">Profile Details</h2>
        <div className="mb-6 rounded-md p-2 shadow-md">
          <p className="font-semibold">{name}</p>
          <p className="font-semibold">{email}</p>
          <div className="mt-8 flex items-center justify-between">
            <p>Change Personal Data</p>
            <button
              onClick={handleClick}
              type="button"
              className="btn btn-primary btn-sm"
            >
              {changeDetails ? 'Done' : 'Change'}
            </button>
          </div>
          <div>
            <form
              className={`${changeDetails ? 'block' : 'hidden'} mt-8 space-y-4`}
            >
              <label
                htmlFor="name"
                className="input input-bordered flex items-center gap-2"
              >
                <NameIcon />
                <input
                  ref={inputRef}
                  value={name}
                  onChange={handleChange}
                  id="name"
                  type="text"
                  className="grow"
                  placeholder="Name"
                />
              </label>
            </form>
          </div>
        </div>
        <button type="button" className="btn btn-primary btn-wide">
          <Link to="/create-listing" className="flex space-x-4">
            <HomeIcon />
            <p>Sell or rent your home</p>
            <ArrowIcon />
          </Link>
        </button>
      </main>
    </div>
  );
}

export default Profile;
