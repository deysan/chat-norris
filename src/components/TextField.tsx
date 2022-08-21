import React from 'react';
import { useController } from 'react-hook-form';

interface TextFieldProps {
  name: string;
  label: string;
  type?: string;
  control: any;
  required: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  type = 'text',
  control,
  required,
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
    rules: { required },
    defaultValue: '',
  });

  return (
    <div className="relative w-full">
      <input
        type={type}
        className="block px-4 py-3 w-full text-sm rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
        placeholder=""
        id={field.name}
      />
      <label
        className="absolute px-3 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-2 z-10 origin-[0] bg-white peer-focus:px-3 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:left-2 peer-focus:scale-75 peer-focus:-translate-y-4"
        htmlFor={field.name}
      >
        {label}
      </label>
    </div>
  );
};
