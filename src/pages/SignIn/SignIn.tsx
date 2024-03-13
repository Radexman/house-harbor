import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightLong as ArrowRightIcon } from 'react-icons/fa6';
import { FaEye as VisibleIcon, FaKey as KeyIcon } from 'react-icons/fa';
import { IoMdMail as MailIcon } from 'react-icons/io';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const handleChange = () => {};

  return (
    <div className="container mx-auto p-4">
      <header>
        <p className="text-center text-4xl md:text-left">Welcome Back!</p>
      </header>
      <main>
        <form className="mx-auto max-w-md md:mx-0">
          <div className="mt-4 flex flex-col space-y-2">
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
              <button type="button" className="btn btn-primary btn-wide">
                Sign in
                <ArrowRightIcon />
              </button>
              <Link to="/forgot-password" className="">
                Forgot Password
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default SignIn;
