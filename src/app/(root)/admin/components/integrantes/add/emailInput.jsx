"use client"
import React, { useState } from 'react';
import { Input } from '@nextui-org/react';

const EmailInput = ({onChange}) => {
    return (
        <Input
          isRequired
          label="Email"
          id="email"
          placeholder="email@hotmail.com"
          className='text-black'
          onChange={onChange}
        />
    )
}

export default EmailInput;