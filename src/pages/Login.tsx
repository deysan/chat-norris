import React from 'react';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  return (
    <>
      <h1>Login</h1>
      <SignUp />
    </>
  );
};
