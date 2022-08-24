import * as Yup from 'yup';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from './Button';
import { TextField } from './TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '../types';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(3).max(60),
  lastName: Yup.string().min(3).max(60),
  email: Yup.string().required().min(3).max(100),
  password: Yup.string().required().min(6).max(20),
});

interface LoginFormProps {
  title: string;
  submit: (data: FormInput) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ title, submit }) => {
  const { control, handleSubmit, reset, formState, register } =
    useForm<FormInput>({
      mode: 'onBlur',
      defaultValues: {
        checkbox: false,
      },
      resolver: yupResolver(validationSchema),
    });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    submit(data);
  };

  return (
    <form
      className="flex flex-col items-center gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {title === 'Create Account' && (
        <div className="flex gap-x-5">
          <TextField name="firstName" label="First Name" control={control} />
          <TextField name="lastName" label="Last Name" control={control} />
        </div>
      )}
      <TextField name="email" label="Email" type="email" control={control} />
      <TextField
        name="password"
        label="Password"
        type="password"
        control={control}
      />
      {title === 'Create Account' && (
        <div className="flex items-center">
          <input
            {...(register('checkbox'), { required: true })}
            id="checkbox"
            type="checkbox"
            name="checkbox"
            className="w-4 h-4 rounded focus:outline-none focus:right-4 focus:ring-slate-200 cursor-pointer"
          />
          <label
            htmlFor="checkbox"
            className="ml-2 text-sm font-medium text-gray-400 cursor-pointer"
          >
            I agree with the{' '}
            <a href="#!" className="text-blue-400 hover:underline">
              terms and conditions
            </a>
            .
          </label>
        </div>
      )}
      <div className="mt-3">
        <Button title={title} type="submit" disabled={!formState.isValid} />
      </div>
    </form>
  );
};
