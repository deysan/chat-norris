import * as Yup from 'yup';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from './Button';
import { TextField } from './TextField';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(3).max(60),
  lastName: Yup.string().min(3).max(60),
  email: Yup.string().required().min(3).max(100),
  password: Yup.string().required().min(6).max(20),
});

export interface FormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginFormProps {
  title: string;
  submit: (data: FormInput) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ title, submit }) => {
  const { control, handleSubmit, reset, formState } = useForm<FormInput>({
    mode: 'onBlur',
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
      <div className="mt-3">
        <Button
          title={title}
          type="submit"
          // disabled
        />
      </div>
    </form>
  );
};
