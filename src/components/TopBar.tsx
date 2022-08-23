import { doc } from 'firebase/firestore';
import React from 'react';
import { firestore } from '../firebase';
import { useAppSelector } from '../hooks/redux-hooks';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';

export const TopBar: React.FC = () => {
  const { chatId } = useAppSelector((state) => state.chat);

  const [value, loading] = useDocument(doc(firestore, 'chats', chatId));

  const profile = value?.data()?.profile;

  return (
    <div className="border-b border-gray-300 bg-slate-200">
      {profile && (
        <div className="flex items-center gap-4 p-2">
          <img
            className="w-12 h-12 rounded-full"
            src={profile.photo}
            alt={profile.username}
          />
          <div className="flex gap-2">
            <h3 className="font-bold">{profile.username}</h3>
            <p className="text-gray-500">({profile.email})</p>
          </div>
        </div>
      )}
    </div>
  );
};
