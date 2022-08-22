import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { LoginForm } from './LoginForm';
import React from 'react';
import { setLogin } from '../store/slices/loginSlice';
import { setUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignIn = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      console.log(user);
      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        }),
      );
      navigate('/');
    });
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-3">Sign up to Chat-Norris</h2>
      <p className="mb-6 text-gray-500">
        Don't have an account?{' '}
        <a
          href="#signup"
          className="font-medium text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700"
          onClick={() => dispatch(setLogin())}
        >
          Register
        </a>
      </p>
      <LoginForm title="Sign In" handleClick={handleSignIn} />
    </>
  );
};
