"use client"
import React from "react";
import { useFormContext, Controller } from 'react-hook-form';
import { DateInput } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";

const StartDateInput = ({ name, labelStartDate, defaultValue }) => {
    const { control, formState: { errors } } = useFormContext();

    const parseToCalendarDate = (dateString) => {
        if (!dateString) return new CalendarDate(2000, 1, 1); 
        try {
            const [day, month, year] = dateString.split('/');
            return new CalendarDate(parseInt(year), parseInt(month), parseInt(day));
        } catch (error) {
            console.error('Error parsing date:', error);
            return new CalendarDate(2000, 1, 1); 
        }
    };

    const formatDateToString = (date) => {
        if (!date) return '';
        try {
            const day = date.day.toString().padStart(2, '0');
            const month = date.month.toString().padStart(2, '0');
            const year = date.year.toString();
            return `${day}/${month}/${year}`;
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    };

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue || new CalendarDate(1995, 11, 6)}
                render={({ field: { value, onChange } }) => (
                    <DateInput 
                        label={labelStartDate}
                        value={parseToCalendarDate(value)}
                        onChange={(date) => {
                            const formattedDate = formatDateToString(date);
                            onChange(formattedDate);
                        }}
                        validationState={errors[name] ? "invalid" : "valid"}
                        errorMessage={errors[name]?.message}
                        isRequired
                        className="max-w-sm"
                        classNames={{
                            input: '[&>div[data-type="day"]]:text-black [&>div[data-type="month"]]:text-black [&>div[data-type="year"]]:text-black',
                        }}
                    />
                )}
            />
        </div>
    );
};

export default StartDateInput;