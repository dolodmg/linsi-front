"use client"
import React from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { Inter } from 'next/font/google'

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
);

const DeleteButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            aria-label='Botón de eliminar'
            className="bg-white text-sm text-red-700 p-1"
        >
            <DeleteIcon fontSize="medium"/>
        </button>
    )
}

export default DeleteButton;