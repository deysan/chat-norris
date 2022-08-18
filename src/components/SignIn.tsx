import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { LoginForm } from './LoginForm';
import React from 'react';
import { setUser } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface PropsSignIn {}

export const SignIn: React.FC<PropsSignIn> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      console.log(user);
      dispatch(
        setUser({
          email: user.email,
          token: user.accessToken,
          id: user.uid,
        }),
      );
      navigate('/');
    });
  };

  return <LoginForm title="Sign In" handleClick={handleSignIn} />;
};
