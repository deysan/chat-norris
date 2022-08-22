import React, { useEffect, useState } from 'react';
import { User, UserProps } from './User';

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
      <div className="max-h-screen flex flex-col border-r">
        <div className="border-b bg-slate-200">
          <User {...users[0]} />
          <input />
        </div>
        <div className="overflow-y-scroll">
          {users.slice(1).map((user) => (
            <User key={user.id} {...user} />
          ))}
        </div>
      </div>

      <div className="flex"></div>
    </div>
  );
};
