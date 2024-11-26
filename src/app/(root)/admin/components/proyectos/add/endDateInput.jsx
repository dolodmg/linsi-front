"use client"
import React from "react";
import { DateInput } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";

const EndDateInput = ({ onChange }) => {
    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <DateInput 
            label={"Fecha de fin"} 
            placeholderValue={new CalendarDate(1995, 11, 6)} 
            className="max-w-sm text-black" 
            onChange={(date) => onChange(date)}
            classNames={{
                input: '[&>div[data-type="day"]]:text-black [&>div[data-type="month"]]:text-black [&>div[data-type="year"]]:text-black',
            }}
            />
        </div>
    );
}

export default EndDateInput;