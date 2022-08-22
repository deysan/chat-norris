import * as Yup from 'yup';

import React, { useState } from 'react';

import { Button } from './Button';
import { TextField } from './TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(3).max(60),
  lastName: Yup.string().min(3).max(60),
  email: Yup.string().required().min(3).max(100),
  password: Yup.string().required().min(6).max(20),
});

interface LoginFormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { control, handleSubmit, reset, formState } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // handleClick(email, password);
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
      <Button
        title={title}
        type="submit"
        // disabled
      />
    </form>
  );
};
