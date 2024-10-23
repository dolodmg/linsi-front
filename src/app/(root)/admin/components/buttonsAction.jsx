"use client"
import { Button } from '@nextui-org/react';
import { Inter } from 'next/font/google';

const inter = Inter({ 
    subsets: ['latin'],
    weights: ['400', '500', '600', '700']
});

const ButtonsAction = ({ isLoading, onClose, onSubmit, submitLabel = 'Guardar' }) => {
    return (
        <div className='flex justify-end gap-2 mt-4'>
            <Button 
                type='button' 
                className={`${inter.className} bg-red-700 text-white`} 
                onClick={onClose}
                aria-label='Cancelar'
            >
                Cancelar
            </Button>
            <Button 
                type='submit' 
                className={`${inter.className} bg-bg-blue text-white`} 
                disabled={isLoading}
                onClick={onSubmit}
                aria-label='Guardar'
            >
                {isLoading ? 'Guardando...' : submitLabel}
            </Button>
        </div>
    )
}

export default ButtonsAction;