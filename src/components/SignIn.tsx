import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { FormInput, LoginForm } from './LoginForm';
import React from 'react';
import { setLogin } from '../store/slices/loginSlice';
import { setUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignIn = ({ email, password }: FormInput) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      console.log(user);
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
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Welcome back to Chat-Norris</h2>
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
      <LoginForm title="Sign In" submit={handleSignIn} />
    </>
  );
};
