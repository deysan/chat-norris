import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { LoginForm } from './LoginForm';
import React from 'react';
import { setUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignUp = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          }),
        );
        navigate('/');
      })
      .catch(console.error);
  };

  return (
    <>
      <h2 className="font-bold mb-3">Sign up to Chat-Norris</h2>
      <LoginForm title="Create Account" handleClick={handleSignUp} />
    </>
  );
};
