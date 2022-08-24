import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { LoginForm } from './LoginForm';
import React, { useEffect, useState } from 'react';
import { setLoading, setLogin } from '../store/slices/loginSlice';
import { setUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { FormInput, User } from '../types';
import { GoogleLogin } from './GoogleLogin';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<User[]>([]);

  const handleSignUp = ({
    email,
    password,
    firstName,
    lastName,
  }: FormInput) => {
    const username = `${firstName} ${lastName}`;
    const photo = `https://joeschmoe.io/api/v1/${firstName}`;

    dispatch(setLoading());
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            id: user.uid,
            email: user.email,
            username,
            photo,
            token: user.refreshToken,
          }),
        );
        updateProfile(user, { displayName: username, photoURL: photo });
        users.map((user) =>
          addDoc(collection(firestore, 'chats'), {
            users: [email, user.email],
            profile: {
              id: user.id,
              email: user.email,
              username: `${user.first_name} ${user.last_name}`,
              photo: user.avatar,
            },
          }),
        );
        navigate('/');
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setLoading());
      });
  };

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Sign up to Chat-Norris</h2>
      <GoogleLogin />
      <LoginForm title="Create Account" submit={handleSignUp} />
      <p className="mt-6 text-gray-500">
        Already have an account?{' '}
        <a
          href="#signin"
          className="font-medium text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700"
          onClick={() => dispatch(setLogin())}
        >
          Login
        </a>
      </p>
    </>
  );
};
