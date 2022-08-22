import React from 'react';

export interface UserProps {
  email: string;
  username: string;
  photo: string;
}

export const User: React.FC<UserProps> = ({ email, username, photo }) => {
  return (
    <div className="flex items-center gap-4 p-2">
      <img className="w-12 h-12 rounded-full" src={photo} alt={username} />
      <div className="block">
        <h3 className="font-bold">{username}</h3>
        <p className="text-gray-500">{email}</p>
      </div>
    </div>
  );
};
