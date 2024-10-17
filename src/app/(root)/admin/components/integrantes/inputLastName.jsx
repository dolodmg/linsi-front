"use client"
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@nextui-org/react';

const LastNameLabel = ({ name, labelLastName, defaultValue }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Input
          {...field}
          label={labelLastName}
          id={name}
          placeholder={defaultValue}
          isInvalid={!!errors[name]}
          errorMessage={errors[name]?.message}
          className='text-black'
        />
      )}
    />
  );
};

export default LastNameLabel;