"use client"
import React, { useState } from 'react';
import { Input } from '@nextui-org/react';

const EmailInput = ({onChange}) => {
    return (
        <div className="flex flex-col">
            <p className="text-black font-medium text-md mb-2">Email</p>
            <Input
            isRequired
            id='email'
            placeholder='email@hotmail.com'
            className='text-black'
            onChange={onChange}
            />
        </div>
    )
}

export default EmailInput;