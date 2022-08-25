import { signInWithEmailAndPassword } from 'firebase/auth';

import { LoginForm } from './LoginForm';
import React from 'react';
import { setLoading, setLogin } from '../store/slices/loginSlice';
import { setUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '../types';
import { GoogleLogin } from './GoogleLogin';
import { auth } from '../firebase';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignIn = ({ email, password }: FormInput) => {
    dispatch(setLoading());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            id: user.uid,
            email: user.email,
            username: user.displayName,
            photo: user.photoURL,
            token: user.refreshToken,
          }),
        );
        navigate('/');
      })
      .finally(() => {
        dispatch(setLoading());
      });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Welcome back to Chat-Norris</h2>
      <GoogleLogin />
      <LoginForm title="Sign In" submit={handleSignIn} />
      <p className="mt-6 text-gray-500">
        Don't have an account?{' '}
        <a
          href="#signup"
          className="font-medium text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700"
          onClick={() => dispatch(setLogin())}
        >
          Register
        </a>
      </p>
    </>
  );
};
