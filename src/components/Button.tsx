import React from 'react';

interface ButtonProps {
  title: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className="inline-block px-6 py-2.5 bg-blue-500 text-white font-normal text-sm leading-tight  rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out disabled:pointer-events-none disabled:opacity-60"
      {...props}
    >
      {title}
    </button>
  );
};
