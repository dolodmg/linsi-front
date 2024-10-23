"use client"
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Textarea } from '@nextui-org/react';

const Description = ({ name, labelDescription, defaultValue }) => {
    const { control, formState: { errors } } = useFormContext();
    
    return (
        <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
            <Textarea
            {...field}
            label={labelDescription}
            id={name}
            placeholder={defaultValue}
            isInvalid={!!errors[name]}
            className='text-black'
            />
        )}
        />
    );
}

export default Description;