import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightLong as ArrowRightIcon } from 'react-icons/fa6';
import { FaEye as VisibleIcon, FaKey as KeyIcon, FaEyeSlash as NonVisibleIcon } from 'react-icons/fa';
import { IoMdMail as MailIcon } from 'react-icons/io';
import { SignInFormTypes } from '../../types/Form.types';
import bgImage from '../../assets/images/login-bg.jpg';
import { firebaseApp } from '../../firebase.config';
import OAuth from '../../components/OAuth';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignInFormTypes>({} as SignInFormTypes);

  const navigate = useNavigate();

  const { email, password } = formData;

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

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Bad user credentials');
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-3/5">
          <img src={bgImage} alt="Abstract shapes" className="h-auto saturate-50 md:h-[90vh]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center text-primary-content md:p-8">
            <p className="text-3xl font-semibold">Welcome To House Harbor</p>
            <p className="lg">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="w-full p-8 md:w-2/4">
          <header>
            <h1 className="text-center text-4xl font-semibold md:text-left">Login</h1>
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
                  <button type="submit" className="btn btn-primary w-40">
                    Sign in
                    <ArrowRightIcon />
                  </button>
                  <Link to="/forgot-password" className="text-sm underline duration-200 hover:text-primary">
                    Forgot Password
                  </Link>
                </div>
              </div>
            </form>
            <OAuth />
            <div className="mx-auto mb-14 mt-8 max-w-md text-center text-sm md:mx-0 md:text-left">
              <p>Don&apos;t have an account yet? Create one for free.</p>
              <Link to="/sign-up">
                <button type="submit" className="underline duration-150 hover:text-primary">
                  Create Account
                </button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
