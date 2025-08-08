"use client"
import React from 'react';
import { Input } from '@nextui-org/react';

const FileInput = ({onChange}) => {
    return (
        <div className="flex flex-col">
            <p className="text-black font-medium text-md mb-2">Legajo</p>
            <Input
            isRequired
            id='file'
            type='number'
            placeholder='92000'
            className='text-black'
            onChange={onChange}
            />
        </div>
    );
}

export default FileInput;