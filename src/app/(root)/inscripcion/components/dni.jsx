"use client"
import React from 'react';
import { Input } from '@nextui-org/react';

const DniInput = ({onChange}) => {
    return (
        <div className="flex flex-col">
            <p className="text-black font-medium text-md mb-2">DNI</p>
            <Input
            isRequired
            id='dni'
            type='number'
            placeholder='22111000'
            className='text-black'
            onChange={onChange}
            />
        </div>
    );
}

export default DniInput;