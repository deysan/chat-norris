import React from 'react';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';
import { useAppSelector } from '../hooks/redux-hooks';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { isLogin } = useAppSelector((state) => state.login);

  return (
    <div className="w-full max-w-md mx-auto px-5 py-10 bg-white rounded-xl shadow-md">
      {isLogin ? <SignIn /> : <SignUp />}
    </div>
  );
};

export default Login;
