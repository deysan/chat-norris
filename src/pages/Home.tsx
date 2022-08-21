import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../hooks/use-auth';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { isAuth } = useAuth();

  console.log(isAuth);

  return isAuth ? <h1>Welcome!</h1> : <Navigate to="/login" />;
};

export default Home;
