"use client"
import React from 'react';
import { Input } from '@nextui-org/react';

const NameInput = ({onChange}) => {
    
    return (
        <Input
        label="Nombre del área"
        id="name"
        placeholder="Ingrese el nombre del área"
        className='text-black'
        onChange={onChange}
        />
    );
}

export default NameInput;