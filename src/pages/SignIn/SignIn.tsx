import { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightLong as ArrowRightIcon } from 'react-icons/fa6';
import { FaEye as VisibleIcon, FaKey as KeyIcon } from 'react-icons/fa';
import { IoMdMail as MailIcon } from 'react-icons/io';
import { SignInFormTypes } from '../../types/Form.types';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignInFormTypes>({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <header>
        <p className="text-center text-4xl md:text-left">Welcome Back</p>
      </header>
      <main>
        <form className="mx-auto max-w-md md:mx-0">
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
                <VisibleIcon />
              </button>
            </label>
            <div className="flex justify-between">
              <button type="button" className="btn btn-primary w-40">
                Sign in
                <ArrowRightIcon />
              </button>
              <Link to="/forgot-password" className="">
                Forgot Password
              </Link>
            </div>
          </div>
        </form>
        <div className="mx-auto mt-16 max-w-md text-center text-sm md:mx-0 md:text-left">
          <p>Don&apos;t have an account yet? Create one for free.</p>
          <Link to="/sign-up">
            <button type="submit" className="underline duration-150 hover:text-primary">
              Create Account
            </button>
          </Link>
        </div>
        {/* Google OAuth */}
      </main>
    </div>
  );
}

export default SignIn;
