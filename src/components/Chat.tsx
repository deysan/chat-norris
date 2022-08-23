import React from 'react';
import { SideBar } from './SideBar';
import { Messages } from './Messages';
import { TopBar } from './TopBar';
import { useAppSelector } from '../hooks/redux-hooks';
import { BottomBar } from './BottomBar';

export const Chat: React.FC = () => {
  const { chatId } = useAppSelector((state) => state.chat);

  return (
    <div className="w-full h-screen grid grid-cols-[minmax(300px,_1fr)_minmax(0,_3fr)]">
      <SideBar />

      <div className="max-h-screen flex flex-col ">
        {chatId && (
          <>
            <TopBar chatId={chatId} />
            <Messages chatId={chatId} />
            <BottomBar chatId={chatId} />
          </>
        )}
      </div>
    </div>
  );
};
