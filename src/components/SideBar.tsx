import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/redux-hooks';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slices/userSlice';
import { ChatList } from './ChatList';
import { User } from './User';

export const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { email, username, photo } = useAuth();
  const [search, setSearch] = useState('');

  return (
    <div className="max-h-screen flex flex-col border-r border-gray-300">
      <div className="border-b border-gray-300 bg-slate-200">
        <div className="flex items-center justify-between">
          <User
            email={email || ''}
            username={username || ''}
            photo={photo || ''}
          />
          <button
            type="button"
            className="text-white bg-blue-400 shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-300 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out w-8 h-8 rounded-full p-2 mr-2"
            onClick={() => dispatch(removeUser())}
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" />
            </svg>
            <span className="sr-only">Sign Out</span>
          </button>
        </div>
        <div className="p-2">
          <input
            type="search"
            className="form-control block w-full px-3 py-1.5 text-base font-semibold text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
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
