import React, { useEffect, useMemo, useState } from 'react';
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
import { Spinner } from './Spinner';
import orderBy from 'lodash/orderBy';

interface ChatListProps {
  searchValue: string;
}

export const ChatList: React.FC<ChatListProps> = ({ searchValue }) => {
  const dispatch = useAppDispatch();
  const { chatId = ' ' } = useAppSelector((state) => state.chat);

  const { email } = useAuth();

  const [chatList, setChatList] = useState<Chat[]>([]);

  const [snapshot, loading] = useCollection(
    collection(firestore, 'chats') as CollectionReference<Chat>,
  );

  const [chat] = useDocumentData(
    doc(firestore, 'chats', chatId) as DocumentReference<Chat>,
  );

  const chatProfile = chat?.profile;

  const chats = useMemo(
    () =>
      snapshot?.docs
        .map((chat) => ({ id: chat.id, ...chat.data() }))
        ?.filter((chat) => chat.users.includes(email || '')),
    [snapshot],
  );

  const sortedChatList = useMemo(
    () => orderBy(chatList, 'time', 'desc'),
    [chatList],
  );

  const filteredChatList = useMemo(
    () =>
      sortedChatList?.filter((chat) =>
        chat?.profile.username
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      ),
    [chatList, searchValue],
  );

  useEffect(() => {
    if (chats) {
      const chatsTime = chats.map((chat) => ({ ...chat, time: 0 }));
      setChatList(chatsTime);
    }
  }, [chats]);

  return (
    <div className="h-full overflow-y-scroll">
      {loading && <Spinner />}
      {filteredChatList?.map(({ id, profile }) => (
        <div
          key={id}
          className={`border-b cursor-pointer ${
            chatProfile?.id === profile.id ? 'bg-blue-100' : 'hover:bg-gray-200'
          }`}
          onClick={() =>
            chatProfile?.id !== profile.id && dispatch(setChat(id))
          }
        >
          <User
            email={profile.email}
            photo={profile.photo}
            username={profile.username}
            chatId={id}
            setChatList={setChatList}
          />
        </div>
      ))}
    </div>
  );
};
