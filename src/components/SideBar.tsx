import React, { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { ChatList } from './ChatList';
import { User } from './User';

export const SideBar: React.FC = () => {
  const { email, username, photo } = useAuth();
  const [search, setSearch] = useState('');

  return (
    <div className="max-h-screen flex flex-col border-r border-gray-300">
      <div className="border-b border-gray-300 bg-slate-200">
        <User
          email={email || ''}
          username={username || ''}
          photo={photo || ''}
        />
        <div className="p-2">
          <input
            type="search"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="Search contact"
            value={search}
            onChange={(e) => setSearch(e.target.value.trimStart())}
          />
        </div>
      </div>
      <ChatList searchValue={search} />
    </div>
  );
};
