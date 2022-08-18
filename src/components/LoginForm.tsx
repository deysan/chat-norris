import React, { useState } from 'react';

interface LoginFormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleClick(email, password);
        }}
      >
        {title}
      </button>
    </form>
  );
};
