"use client"
import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@nextui-org/react'
import { Inter } from 'next/font/google'; 

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const CreateComponentButton = ({ onClick, component }) => {
    return (
        <Button
            className={`${inter.className} bg-light-blue text-white gap-1`}
            onClick={onClick}
        >
            <AddBoxIcon />
            Crear {component}
        </Button>
    );
}

export default CreateComponentButton;