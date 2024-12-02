"use client"
import React from 'react';
import { Input } from '@nextui-org/react';

const FirstNameInput = ({onChange}) => {
    return (
        <div className="flex flex-col">
            <p className="text-black font-medium text-md mb-2">Nombre</p>
            <Input
            isRequired
            id='firstName'
            placeholder='Juan'
            className='text-black'
            onChange={onChange}
            />
        </div>
    );
}

export default FirstNameInput;