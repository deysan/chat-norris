import React from 'react';
import { useAuth } from '../hooks/use-auth';
import { ChatList } from './ChatList';
import { User } from './User';

export const SideBar: React.FC<any> = ({ users }) => {
  const { email, username, photo } = useAuth();

  return (
    <div className="max-h-screen flex flex-col border-r border-gray-300">
      <div className="border-b border-gray-300 bg-slate-200">
        <User
          email={email || ''}
          username={username || ''}
          photo={photo || ''}
        />
        <input />
      </div>
      <ChatList />
    </div>
  );
};
