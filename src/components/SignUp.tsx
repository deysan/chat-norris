import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';

import { FormInput, LoginForm } from './LoginForm';
import React from 'react';
import { setLogin } from '../store/slices/loginSlice';
import { setUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignUp = ({
    email,
    password,
    firstName,
    lastName,
  }: FormInput) => {
    const auth = getAuth();
    const username = `${firstName} ${lastName}`;
    const photo = `https://joeschmoe.io/api/v1/${firstName}`;

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            id: user.uid,
            email: user.email,
            username,
            photo,
            token: user.refreshToken,
          }),
        );
        updateProfile(user, { displayName: username, photoURL: photo });
        navigate('/');
      })
      .catch(console.error);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Sign up to Chat-Norris</h2>
      <p className="mb-6 text-gray-500">
        Already have an account?{' '}
        <a
          href="#signin"
          className="font-medium text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700"
          onClick={() => dispatch(setLogin())}
        >
          Login
        </a>
      </p>
      <LoginForm title="Create Account" submit={handleSignUp} />
    </>
  );
};
