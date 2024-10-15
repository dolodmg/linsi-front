"use client"
import React from 'react';
import Link from 'next/link';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Inter } from 'next/font/google';

const inter = Inter(
    {subsets: ['latin']},
    {weight: '400'}
)

export const LinkInicio = () => {
    return (
        <Link href='/.'>
                <div className='flex flex-row items-center gap-1'>
                    <KeyboardBackspaceIcon className='text-bg-blue my-2'/>
                    <p className={`${inter.className} text-bg-blue font-medium`}>Inicio</p>
                </div>
            </Link>
    )
}