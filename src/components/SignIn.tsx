import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { LoginForm } from './LoginForm';
import React from 'react';
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

  return <LoginForm title="Sign In" handleClick={handleSignIn} />;
};
