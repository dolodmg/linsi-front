"use client"
import { Button } from '@nextui-org/react';
import { Inter } from 'next/font/google';

const inter = Inter({ 
    subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
);

const ButtonsEditar = ({editing, onClose}) => {
    return (
        <div className='flex justify-end gap-2 mt-4'>
            <Button type='button' className={`${inter.className} bg-red-700 text-white`} onClick={onClose}>Cancelar</Button>
            <Button type='submit' className={`${inter.className} bg-bg-blue text-white`} disabled={editing}>
                {editing ? 'Guardando...' : 'Guardar'}
            </Button>
        </div>
    )
}

export default ButtonsEditar;