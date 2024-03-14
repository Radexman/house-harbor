import { useState, useEffect } from 'react';
import { User, getAuth } from 'firebase/auth';
import { firebaseApp } from '../../firebase.config';

function Profile() {
  const [user, setUser] = useState<User | null>({} as User);

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth.currentUser]);

  return user ? <h1>{user.email}</h1> : <h1>Not logged in</h1>;
}

export default Profile;
