import React, { useEffect, useState } from 'react';
import { User, UserProps } from './User';

const SideBar = ({ users }) => {
  return (
    <div className="max-h-screen flex flex-col border-r border-gray-300">
      <div className="border-b border-gray-300 bg-slate-200">
        <User {...users[0]} />
        <input />
      </div>
      <div className="overflow-y-scroll">
        {users.slice(1).map((user) => (
          <User key={user.id} {...user} />
        ))}
      </div>
    </div>
  );
};

const TopBar = ({ users }) => {
  return (
    <div className="border-b border-gray-300 bg-slate-200">
      <div className="flex items-center gap-4 p-2">
        <img
          className="w-12 h-12 rounded-full"
          src={users[0]?.avatar}
          alt="Avatar"
        />
        <div className="flex gap-2">
          <h3 className="font-bold">{`${users[0]?.first_name} ${users[0]?.last_name}`}</h3>
          <p className="text-gray-500">({users[0]?.email})</p>
        </div>
      </div>
    </div>
  );
};

const BottomBar = () => {
  return (
    <div className="p-5 bg-slate-200">
      <input type="text" />
    </div>
  );
};

const Messages = ({ users }) => {
  return (
    <div className="flex flex-col flex-1 gap-4 p-2 overflow-y-scroll">
      <div className="flex gap-x-2">
        <img
          className="w-12 h-12 rounded-full"
          src={users[0]?.avatar}
          alt="Avatar"
        />
        <p className="min-w-min max-w-xl p-3 text-white bg-gray-700 rounded-3xl">
          Some text
        </p>
      </div>
      <div className="flex gap-x-2 justify-end self-end flex-row-reverse">
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
      </div>
    </div>
  );
};

export const Chat: React.FC = () => {
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full h-screen grid grid-cols-[minmax(300px,_1fr)_minmax(0,_3fr)]">
      <SideBar users={users} />

      <div className="max-h-screen flex flex-col ">
        <TopBar users={users} />
        <Messages users={users} />
        <BottomBar />
      </div>
    </div>
  );
};
