import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { LoginForm } from './LoginForm';
import React from 'react';
import { setUser } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface PropsSignUp {}

export const SignUp: React.FC<PropsSignUp> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
          }),
        );
        navigate('/');
      })
      .catch(console.error);
  };

  return <LoginForm title="Sign Up" handleClick={handleSignUp} />;
};
