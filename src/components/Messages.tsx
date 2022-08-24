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
import { Spinner } from './Spinner';

interface MessagesProps {
  chatId: string;
}
export const Messages: React.FC<MessagesProps> = ({ chatId }) => {
  const bottomOfChat = useRef<HTMLDivElement | null>(null);
  const { email, username, photo } = useAuth();

  const [messages, loading] = useCollectionData(
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

  useEffect(() => {
    bottomOfChat.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [messages]);

  return (
    <div className="relative flex flex-col flex-1 gap-4 m-2 overflow-y-scroll">
      {loading && <Spinner />}
      {messages && messages?.length > 0 ? (
        messages?.map((message) => (
          <div
            key={message?.created?.seconds}
            className={`flex gap-x-2${
              message.sender !== email
                ? ' justify-end self-end flex-row-reverse'
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
            <div
              className={`flex flex-col gap-y-2${
                message.sender !== email ? ' items-end' : ''
              }`}
            >
              <p
                className={`min-w-min max-w-xl p-3 rounded-3xl ${
                  message.sender === email
                    ? 'text-white bg-gray-700'
                    : 'bg-gray-300'
                }`}
              >
                {message.text}
              </p>
              <p className="text-xs text-gray-500">
                {messages?.[0]?.created?.toDate().toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="absolute flex flex-col justify-center items-center w-full h-full p-10 gap-10 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className="max-w-[200px] text-gray-200"
          >
            <path
              fill="currentColor"
              d="M284.046,224.8a34.114,34.114,0,1,0,34.317,34.113A34.217,34.217,0,0,0,284.046,224.8Zm-110.45,0a34.114,34.114,0,1,0,34.317,34.113A34.217,34.217,0,0,0,173.6,224.8Zm220.923,0a34.114,34.114,0,1,0,34.317,34.113A34.215,34.215,0,0,0,394.519,224.8Zm153.807-55.319c-15.535-24.172-37.31-45.57-64.681-63.618-52.886-34.817-122.374-54-195.666-54a405.975,405.975,0,0,0-72.032,6.357,238.524,238.524,0,0,0-49.51-36.588C99.684-11.7,40.859.711,11.135,11.421A14.291,14.291,0,0,0,5.58,34.782C26.542,56.458,61.222,99.3,52.7,138.252c-33.142,33.9-51.112,74.776-51.112,117.337,0,43.372,17.97,84.248,51.112,118.148,8.526,38.956-26.154,81.816-47.116,103.491a14.284,14.284,0,0,0,5.555,23.34c29.724,10.709,88.549,23.147,155.324-10.2a238.679,238.679,0,0,0,49.51-36.589A405.972,405.972,0,0,0,288,460.14c73.313,0,142.8-19.159,195.667-53.975,27.371-18.049,49.145-39.426,64.679-63.619,17.309-26.923,26.07-55.916,26.07-86.125C574.394,225.4,565.634,196.43,548.326,169.485ZM284.987,409.9a345.65,345.65,0,0,1-89.446-11.5l-20.129,19.393a184.366,184.366,0,0,1-37.138,27.585,145.767,145.767,0,0,1-52.522,14.87c.983-1.771,1.881-3.563,2.842-5.356q30.258-55.68,16.325-100.078c-32.992-25.962-52.778-59.2-52.778-95.4,0-83.1,104.254-150.469,232.846-150.469s232.867,67.373,232.867,150.469C517.854,342.525,413.6,409.9,284.987,409.9Z"
            />
          </svg>
          <p className="text-gray-300">No messages here yet...</p>
        </div>
      )}
      <div ref={bottomOfChat}></div>
    </div>
  );
};
