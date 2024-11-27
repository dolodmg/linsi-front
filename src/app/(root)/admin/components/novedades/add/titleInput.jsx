"use client"
import React from 'react';
import { Input } from '@nextui-org/react';

const TitleInput = ({onChange}) => {
    
    return (
        <Input
        isRequired
        label="Título"
        id="name"
        placeholder="Ingrese un título para el artículo"
        className='text-black'
        onChange={onChange}
        />
    );
}

export default TitleInput;