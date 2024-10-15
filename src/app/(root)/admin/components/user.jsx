"use client"
import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter(
    {subsets: ['latin']},
    {weight: '400'}
);

export const User = () => {
    return (
        <div className='flex flex-col my-2'>
            <p className={`${inter.className} font-bold text-xl text-bg-blue`}>Martín Jorge</p>
            <p className={`${inter.className} text-sm text-gray-500`}>martinjorge@gmail.com</p>
        </div>
    )
}