import { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FaEye as VisibleIcon, FaKey as KeyIcon, FaUserEdit as NameIcon } from 'react-icons/fa';
import { IoMdMail as MailIcon, IoMdCreate as CreateIcon } from 'react-icons/io';
import { SignUpFormTypes } from '../../types/Form.types';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpFormTypes>({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <header>
        <p className="text-center text-4xl md:text-left">Create Account</p>
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
            <label htmlFor="name" className="input input-bordered flex items-center gap-2">
              <NameIcon />
              <input type="text" className="grow" placeholder="Name" id="name" value={name} onChange={handleChange} />
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
              <button type="button" className="btn btn-primary ">
                Create New Account
                <CreateIcon />
              </button>
            </div>
          </div>
        </form>
        <div className="mx-auto mt-16 max-w-md text-center text-sm md:mx-0 md:text-left">
          <p>Already have an account?</p>
          <Link to="/sign-in">
            <button type="submit" className="underline duration-150 hover:text-primary">
              Login
            </button>
          </Link>
        </div>
        {/* Google OAuth */}
      </main>
    </div>
  );
}

export default SignUp;
