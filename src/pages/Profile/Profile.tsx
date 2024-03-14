import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '../../firebase.config';

function Profile() {
  const auth = getAuth(firebaseApp);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser!.displayName,
    email: auth.currentUser!.email,
  });

  const { name, email } = formData;

  const handleLogout = () => {
    auth.signOut();
    navigate('/sign-in');
  };

  return (
    <div className="container mx-auto p-4">
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold">My Profile</h1>
          <button onClick={handleLogout} type="button" className="btn btn-sm">
            Logout
          </button>
        </div>
      </header>
    </div>
  );
}

export default Profile;
