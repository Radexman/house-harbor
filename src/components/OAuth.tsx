import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import db, { firebaseApp } from '../firebase.config';

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleClick = async () => {
    try {
      const auth = getAuth(firebaseApp);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // eslint-disable-next-line prefer-destructuring
      const user = result.user;

      // check for user
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // if user doesnt exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/');
    } catch (error) {
      toast.error('Could not authorize with Google');
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center space-y-3 md:items-start">
      <p className="text-center text-sm">
        {location.pathname === '/sign-in' ? 'You can login' : 'You can create an account'} with Google instead
      </p>
      <button onClick={handleGoogleClick} type="button" className="btn btn-outline btn-primary">
        {location.pathname === '/sign-in' ? 'Login with Google' : 'Create account with Google'}
        <GoogleIcon size={20} />
      </button>
    </div>
  );
}

export default OAuth;
