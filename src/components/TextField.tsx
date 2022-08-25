import React from 'react';
import { useController } from 'react-hook-form';

interface TextFieldProps {
  name: string;
  label: string;
  type?: string;
  control: any;
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  type = 'text',
  control,
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
    rules: { required: true },
    defaultValue: '',
  });

  return (
    <div className="relative w-full">
      <input
        {...field}
        type={type}
        className="block px-4 pt-5 pb-2 w-full text-md font-semibold rounded-xl bg-slate-50 border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white focus:border-blue-500 peer"
        placeholder=""
        id={field.name}
      />
      <label
        className="absolute px-3 text-md font-medium text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 left-2 origin-[0] peer-focus:px-3 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:left-2 peer-focus:scale-75 "
        htmlFor={field.name}
      >
        {label}
      </label>
    </div>
  );
};
