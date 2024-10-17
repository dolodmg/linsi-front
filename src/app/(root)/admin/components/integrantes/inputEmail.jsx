"use client"
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@nextui-org/react';

const EmailLabel = ({ name, labelEmail, defaultValue }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Input
          {...field}
          label={labelEmail}
          id={name}
          placeholder={defaultValue}
          isInvalid={!!errors[name]}
          className='text-black'
        />
      )}
    />
  );
};

export default EmailLabel;