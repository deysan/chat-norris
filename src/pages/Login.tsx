import React from 'react';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';

interface PropsLogin {}

export const Login: React.FC<PropsLogin> = () => {
  return (
    <>
      <h1>Login</h1>
      <SignUp />
    </>
  );
};
