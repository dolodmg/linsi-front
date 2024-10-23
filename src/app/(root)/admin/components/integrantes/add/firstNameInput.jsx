"use client"
import React, { useState } from 'react';
import { Input } from '@nextui-org/react';

const FirstNameInput = ({onChange}) => {
    return (
        <Input
          label="Nombre"
          id="firstName"
          placeholder="Juan"
          className='text-black'
          onChange={onChange} 
        />
    )
}

export default FirstNameInput;