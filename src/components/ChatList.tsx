import React, { useMemo } from 'react';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
} from 'firebase/firestore';
import { firestore } from '../firebase';
import { User } from './User';
import { useAuth } from '../hooks/use-auth';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { setChat } from '../store/slices/chatSlice';
import { Chat } from '../types';

export const ChatList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { chatId = ' ' } = useAppSelector((state) => state.chat);

  const { email } = useAuth();

  const [snapshot, loading] = useCollection(
    collection(firestore, 'chats') as CollectionReference<Chat>,
  );

  const [chat] = useDocumentData(
    doc(firestore, 'chats', chatId) as DocumentReference<Chat>,
  );

  const chatProfile = chat?.profile;

  const chats = useMemo(
    () => snapshot?.docs.map((chat) => ({ id: chat.id, ...chat.data() })),
    [snapshot],
  );

  const chatList = useMemo(
    () => chats?.filter((chat) => chat.users.includes(email || '')),
    [chats],
  );

  return (
    <div className="overflow-y-scroll">
      {chatList?.map(({ id, profile }) => (
        <div
          key={id}
          className={`cursor-pointer hover:bg-gray-200${
            chatProfile?.id === profile.id ? ' bg-blue-100' : ''
          }`}
          onClick={() => dispatch(setChat(id))}
        >
          <User
            email={profile.email}
            photo={profile.photo}
            username={profile.username}
          />
        </div>
      ))}
    </div>
  );
};
