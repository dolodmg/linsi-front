"use client"
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@nextui-org/react';

const RoleLabel = ({ name, labelRole, actualRole, actualRoleId }) => {
  const { control } = useFormContext();

  return (
    <>
      <label htmlFor={name}>{labelRole}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={actualRole}
        render={({ field }) => (
          <Input
            {...field}
            aria-label={labelRole}
            id={name}
            type="text"
            placeholder={actualRole}
          />
        )}
      />
      <input 
        type="hidden" 
        name={`${name}-id`} 
        value={actualRoleId} 
      />
    </>
  );
};

export default RoleLabel;
