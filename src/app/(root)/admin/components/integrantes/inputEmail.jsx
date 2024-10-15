"use client"
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@nextui-org/react';

const EmailLabel = ({ name, labelEmail, actualEmail }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <>
        <label htmlFor={name}>{labelEmail}</label>
        <Controller
            name={name}
            control={control}
            defaultValue={actualEmail}
            render={({ field }) => (
            <Input
                {...field}
                aria-label="Email"
                id={name}
                type="text"
                placeholder={actualEmail}
            />
            )}
        />
      </>
  );
};

export default EmailLabel;