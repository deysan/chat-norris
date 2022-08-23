import React, { useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  serverTimestamp,
} from 'firebase/firestore';
import { firestore } from '../firebase';
import { useAuth } from '../hooks/use-auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Chat, ChuckNorris } from '../types';

interface BottomBarProps {
  chatId: string;
}

export const BottomBar: React.FC<BottomBarProps> = ({ chatId }) => {
  const { email } = useAuth();

  const [textMessage, setTextMessage] = useState('');
  const [] = useState('');

  const [chat] = useDocumentData(
    doc(firestore, 'chats', chatId) as DocumentReference<Chat>,
  );

  const profile = chat?.profile;

  const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const sendMessage = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!textMessage) return;

    await addDoc(collection(firestore, `chats/${chatId}/messages`), {
      text: textMessage,
      sender: email,
      created: serverTimestamp(),
    });

    setTimeout(async () => {
      const response: ChuckNorris = await fetch(
        'https://api.chucknorris.io/jokes/random',
      ).then((res) => res.json());
      const textRandom = response.value;

      await addDoc(collection(firestore, `chats/${chatId}/messages`), {
        text: textRandom,
        sender: profile?.email,
        created: serverTimestamp(),
      });
    }, getRandomIntInclusive(10000, 15000));

    setTextMessage('');
  };

  return (
    <div className="flex items-center gap-x-2 p-5 bg-slate-200">
      <textarea
        className="form-control block w-full px-3 py-1.5 text-base font-semibold text-gray-800 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl transition ease-in-out m-0 focus:text-gray-800 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
        rows={2}
        placeholder="Your message"
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value.trimStart())}
      />
      <button
        type="button"
        className="p-2 cursor-pointer inline-block rounded-full bg-blue-400 text-white shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out w-8 h-8"
        onClick={sendMessage}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="reply"
          className="w-4 h-4"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258 0 61.441-39.581 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328z"
          ></path>
        </svg>
      </button>
    </div>
  );
};
