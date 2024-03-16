import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FaLongArrowAltRight as ArrowRightIcon } from 'react-icons/fa';
import { IoMdMail as MailIcon } from 'react-icons/io';
import { firebaseApp } from '../../firebase.config';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(firebaseApp);
      await sendPasswordResetEmail(auth, email);
      toast.success('Email was sent');
    } catch (error) {
      toast.error('Could not send reset email');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header>
        <h1 className="text-center text-4xl font-bold md:text-left">Forgot Password</h1>
      </header>
      <main className="mt-12">
        <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-3 md:mx-0">
          <p className="text-center md:text-left">Please input your email addresse to reset your password.</p>
          <label htmlFor="email" className="input input-bordered flex items-center gap-2">
            <MailIcon />
            <input type="email" className="grow" placeholder="Email" id="email" value={email} onChange={handleChange} />
          </label>
          <div className="flex justify-between">
            <button type="submit" className="btn btn-primary">
              Send Reset Link
              <ArrowRightIcon />
            </button>
            <Link to="/sign-in">
              <button type="button" className="text-sm underline duration-150 hover:text-primary">
                Login
              </button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
