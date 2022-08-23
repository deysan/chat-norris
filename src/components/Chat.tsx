import React, { useEffect, useState } from 'react';
import { SideBar } from './SideBar';
import { useAppSelector } from '../hooks/redux-hooks';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { Messages } from './Messages';
import { TopBar } from './TopBar';
import { Profile } from '../types';

const BottomBar = () => {
  return (
    <div className="p-5 bg-slate-200">
      <input type="text" />
    </div>
  );
};

export const Chat: React.FC = () => {
  const [users, setUsers] = useState<Profile[]>([]);

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full h-screen grid grid-cols-[minmax(300px,_1fr)_minmax(0,_3fr)]">
      <SideBar />

      <div className="max-h-screen flex flex-col ">
        <TopBar />
        <Messages />
        <BottomBar />
      </div>
    </div>
  );
};
