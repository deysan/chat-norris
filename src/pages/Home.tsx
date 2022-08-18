import { Navigate } from 'react-router-dom';
import React from 'react';

interface PropsHome {}

export const Home: React.FC<PropsHome> = () => {
  return <Navigate to="/login" />;
};
