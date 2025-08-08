"use client"
import React from 'react';
import { Input } from '@nextui-org/react';

const LastNameInput = ({onChange}) => {
    return (
        <div className="flex flex-col">
            <p className="text-black font-medium text-md mb-2">Apellido</p>
            <Input
            isRequired
            id='lastName'
            placeholder='Perez'
            className='text-black'
            onChange={onChange}
            />
        </div>

    );
}

export default LastNameInput;