import { doc, DocumentReference } from 'firebase/firestore';
import React from 'react';
import { firestore } from '../firebase';
import { useAppSelector } from '../hooks/redux-hooks';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Chat } from '../types';

export const TopBar: React.FC = () => {
  const { chatId = '' } = useAppSelector((state) => state.chat);

  const [chat] = useDocumentData(
    doc(firestore, 'chats', chatId) as DocumentReference<Chat>,
  );

  const profile = chat?.profile;

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
