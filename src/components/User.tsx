import React from 'react';

export interface UserProps {
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  id: number;
}

export const User: React.FC<UserProps> = ({
  avatar,
  email,
  first_name,
  last_name,
}) => {
  return (
    <div className="flex items-center gap-4 p-2">
      <img className="w-12 h-12 rounded-full" src={avatar} alt="Avatar" />
      <div className="block">
        <h3 className="font-bold">{`${first_name} ${last_name}`}</h3>
        <p className="text-gray-500">{email}</p>
      </div>
    </div>
  );
};
