"use client"
import React from 'react';
import { Input } from '@nextui-org/react';

const TitleInput = ({onChange}) => {
    
    return (
        <Input
        isRequired
        label="Nombre del proyecto"
        id="name"
        placeholder="Ingrese el nombre del proyecto"
        className='text-black'
        onChange={onChange}
        />
    );
}

export default TitleInput;