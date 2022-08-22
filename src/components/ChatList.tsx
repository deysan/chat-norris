import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { firestore } from '../firebase';
import { User } from './User';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export const ChatList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [snapshot, loading] = useCollection(collection(firestore, 'chats'));
  const chats = snapshot?.docs.map((chat) => ({ id: chat.id, ...chat.data() }));

  console.log(loading);

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="overflow-y-scroll">
      {/* {chats.map((chat) => (
        <User key={chat.id} email />
      ))} */}
    </div>
  );
};
