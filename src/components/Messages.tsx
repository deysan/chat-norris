import React, { useEffect, useRef } from 'react';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase';
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  orderBy,
  query,
} from 'firebase/firestore';
import { Chat, Message } from '../types';
import { useAuth } from '../hooks/use-auth';

interface MessagesProps {
  chatId: string;
}
export const Messages: React.FC<MessagesProps> = ({ chatId }) => {
  const bottomOfChat = useRef<HTMLDivElement | null>(null);
  const { email, username, photo } = useAuth();

  const [messages] = useCollectionData(
    query(
      collection(
        firestore,
        `chats/${chatId}/messages`,
      ) as CollectionReference<Message>,
      orderBy('created'),
    ),
  );

  const [chat] = useDocumentData(
    doc(firestore, 'chats', chatId) as DocumentReference<Chat>,
  );

  const profile = chat?.profile;

  console.log(messages);

  useEffect(() => {
    bottomOfChat.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 gap-4 p-2 overflow-y-scroll">
      {messages?.map((message) => (
        <div
          className={`flex gap-x-2${
            message.sender !== email
              ? 'justify-end self-end flex-row-reverse'
              : ''
          }`}
        >
          <img
            className="w-12 h-12 rounded-full"
            src={(message.sender === email ? photo : profile?.photo) || ''}
            alt={
              (message.sender === email ? username : profile?.username) ||
              'Avatar'
            }
          />
          <p
            className={`min-w-min max-w-xl p-3 rounded-3xl ${
              message.sender === email
                ? 'text-white bg-gray-700'
                : 'bg-gray-300'
            }`}
          >
            {message.text}
          </p>
        </div>
      ))}
      <div ref={bottomOfChat}></div>
    </div>
  );
};
