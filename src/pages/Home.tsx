import { Chat } from '../components/Chat';
import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../hooks/use-auth';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Chat /> : <Navigate to="/login" />;
};

export default Home;
