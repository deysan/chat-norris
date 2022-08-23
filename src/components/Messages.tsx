import React from 'react';
import { useAppSelector } from '../hooks/redux-hooks';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase';
import { collection, orderBy, query } from 'firebase/firestore';

export const Messages: React.FC = ({}) => {
  const { chatId } = useAppSelector((state) => state.chat);

  const [messages] = useCollectionData(
    query(
      collection(firestore, `chats/${chatId}/messages`),
      orderBy('created'),
    ),
  );

  console.log(messages);

  return (
    <div className="flex flex-col flex-1 gap-4 p-2 overflow-y-scroll">
      {messages?.map((message) => (
        <div className="flex gap-x-2">
          <img className="w-12 h-12 rounded-full" src={''} alt="Avatar" />
          <p className="min-w-min max-w-xl p-3 text-white bg-gray-700 rounded-3xl">
            {message.text}
          </p>
        </div>
      ))}
      {/* <div className="flex gap-x-2 justify-end self-end flex-row-reverse">
        <img
          className="w-12 h-12 rounded-full"
          src={users[0]?.avatar}
          alt="Avatar"
        />
        <p className="min-w-min max-w-xl p-3 bg-gray-300 rounded-3xl">
          Some text Some textSome text Some textSome text Some textSome text
          Some textSome text Some textSome text Some text
        </p>
      </div>
      <div className="flex gap-x-2">
        <img
          className="w-12 h-12 rounded-full"
          src={users[0]?.avatar}
          alt="Avatar"
        />
        <p className="min-w-min max-w-xl p-3 text-white bg-gray-700 rounded-3xl">
          Some text
        </p>
      </div> */}
    </div>
  );
};
