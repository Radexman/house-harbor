import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
  FaEye as VisibleIcon,
  FaKey as KeyIcon,
  FaUserEdit as NameIcon,
  FaEyeSlash as NonVisibleIcon,
} from 'react-icons/fa';
import { IoMdMail as MailIcon, IoMdCreate as CreateIcon } from 'react-icons/io';
import bgImage from '../../assets/images/login-bg.jpg';
import { SignUpFormTypes } from '../../types/Form.types';
import db, { firebaseApp } from '../../firebase.config';

import OAuth from '../../components/OAuth';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpFormTypes>({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { name, email, password } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(firebaseApp);

      if (password === undefined) {
        throw new Error('Password is undefined');
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // eslint-disable-next-line prefer-destructuring
      const user = userCredential.user;

      updateProfile(auth.currentUser!, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with registration');
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-3/5">
          <img src={bgImage} alt="Abstract shapes" className="h-auto saturate-50 md:h-[90vh]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center text-primary-content md:p-8">
            <p className="text-2xl font-semibold">Welcome To House Harbor</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="w-full p-8 md:w-2/4">
          <header>
            <h1 className="text-center text-4xl font-semibold md:text-left">Create Account</h1>
          </header>
          <main>
            <form onSubmit={handleSubmit} className="mx-auto max-w-md md:mx-0">
              <div className="mt-6 flex flex-col space-y-3">
                <label htmlFor="email" className="input input-bordered flex items-center gap-2">
                  <MailIcon />
                  <input
                    type="email"
                    className="grow"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="name" className="input input-bordered flex items-center gap-2">
                  <NameIcon />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Name"
                    id="name"
                    value={name}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="password" className="input input-bordered flex items-center gap-2">
                  <KeyIcon />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="grow"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={handleChange}
                  />
                  <button type="button" onClick={() => setShowPassword((prevState) => !prevState)}>
                    {showPassword ? <NonVisibleIcon /> : <VisibleIcon />}
                  </button>
                </label>
                <div className="flex justify-between">
                  <button type="submit" className="btn btn-primary ">
                    Create New Account
                    <CreateIcon />
                  </button>
                </div>
              </div>
            </form>
            <OAuth />
            <div className="mx-auto mb-14 mt-8 max-w-md text-center text-sm md:mx-0 md:mb-0 md:text-left">
              <p>Already have an account?</p>
              <Link to="/sign-in">
                <button type="submit" className="underline duration-150 hover:text-primary">
                  Login
                </button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
