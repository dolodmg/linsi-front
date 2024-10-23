"use client"
import React, { useState } from 'react';
import { Input } from '@nextui-org/react';

const LastNameInput = ({onChange}) => {
    return (
        <Input
          label="Apellido"
          id="lastName"
          placeholder="Pérez"
          className='text-black'
          onChange={onChange}
        />
    )
}

export default LastNameInput;