import { useNavigate } from 'react-router-dom';
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
    <div className="container mx-auto p-4">
      <header className="mt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold">My Profile</h1>
          <button onClick={handleLogout} type="button" className="btn btn-primary btn-sm">
            Logout
          </button>
        </div>
      </header>
      <main className="mt-12">
        <div className="rounded-md bg-primary-content p-2">
          <p>Name: {name}</p>
          <p>Email: {email}</p>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <p>Change Personal Data</p>
          <button onClick={handleClick} type="button" className="btn btn-primary btn-sm">
            {changeDetails ? 'Done' : 'Change'}
          </button>
        </div>
        <div className="mt-8">
          <form className={`${changeDetails ? 'block' : 'hidden'} space-y-4`}>
            <label htmlFor="name" className="input input-bordered flex items-center gap-2">
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
      </main>
    </div>
  );
}

export default Profile;
