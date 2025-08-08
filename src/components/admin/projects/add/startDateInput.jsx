"use client"
import React from "react";
import { DateInput } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";

const StartDateInput = ({ onChange }) => {
    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <DateInput 
            label="Fecha de inicio"
            isRequired
            placeholderValue={new CalendarDate(1995, 11, 6)} 
            className="max-w-sm" 
            onChange={onChange}
            classNames={{
                input: '[&>div[data-type="day"]]:text-black [&>div[data-type="month"]]:text-black [&>div[data-type="year"]]:text-black',
            }}
            />
        </div>
    );
}

export default StartDateInput;