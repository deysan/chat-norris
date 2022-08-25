import {
  collection,
  CollectionReference,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase';
import { Message } from '../types';

interface UserProps {
  email: string;
  username: string;
  photo: string;
  chatId?: string;
}

export const User: React.FC<UserProps> = ({
  email,
  username,
  photo,
  chatId,
}) => {
  const [messages] = useCollectionData(
    query(
      collection(
        firestore,
        `chats/${chatId}/messages`,
      ) as CollectionReference<Message>,
      orderBy('created', 'desc'),
      limit(1),
    ),
  );

  const lastMessage = messages?.[0]?.text;
  const lastTime = messages?.[0]?.created?.toDate().toLocaleDateString();

  return (
    <div className="flex items-center gap-4 p-2">
      <img className="w-12 h-12 rounded-full" src={photo} alt={username} />
      <div className="w-full overflow-hidden hidden sm:block">
        <div className="flex justify-between items-center">
          <h3 className="font-bold truncate">{username}</h3>
          <span className="text-xs text-gray-400">{lastTime && lastTime}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">
          {lastMessage ? lastMessage : email}
        </p>
      </div>
    </div>
  );
};
