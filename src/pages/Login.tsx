import React from 'react';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="h-screen flex place-items-center">
      <div className="w-full max-w-md m-auto p-4 shadow-md">
        <SignUp />
      </div>
    </div>
  );
};

export default Login;
