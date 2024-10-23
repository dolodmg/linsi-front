"use client";
import React, { useState } from "react";
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@nextui-org/react';
import { format, parse } from 'date-fns';
import { Inter } from 'next/font/google';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
);

const StartDatePicker = ({ name, labelStartDate, defaultValue }) => {
    const { control, formState: { errors } } = useFormContext();
    const [inputValue, setInputValue] = useState(defaultValue ? format(new Date(defaultValue), 'dd/MM/yyyy') : '');

    const handleDateChange = (e) => {
        const formattedDate = e.target.value;
        setInputValue(formattedDate);
    };

    const handleBlur = (field) => {
        try {
            // Convertimos la fecha del input (dd/mm/yyyy) a un formato Date en ISO
            const parsedDate = parse(inputValue, 'dd/MM/yyyy', new Date());
            field.onChange(parsedDate);
        } catch (error) {
            console.error('Fecha no válida:', error);
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <Input
                    type="date"
                    value={inputValue}
                    onChange={handleDateChange}
                    onBlur={() => handleBlur(field)} // Al salir del input, transformamos el valor
                    label={labelStartDate}
                    placeholder="dd/mm/yyyy"
                    isInvalid={!!errors[name]}
                    className={`${inter.className} text-black`}
                />
            )}
        />
    );
};

export default StartDatePicker;
