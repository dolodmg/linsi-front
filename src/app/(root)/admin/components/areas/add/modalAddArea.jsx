"use client"
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent } from '@nextui-org/react';
import ButtonsAction from '../../buttonsAction';
import { createAreaAction } from '@/actions/area';
import { useRouter } from 'next/navigation';
import NameInput from './nameInput';

const ModalAddArea = ({ isOpen, onClose, onAddSuccess }) => {

    const router = useRouter();
    const [adding, setAdding] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [name, setName] = useState('');

    const addArea = async (event) => {
        event.preventDefault();
        setAdding(true);
        if (!name) {
            setErrors({ name: '* Este campo es obligatorio'});
            setAdding(false);
            return;
        } else {
            setErrors({});
        }

        const data = {
            name: name
        }

        try {
            const newArea = await createAreaAction(data);
            onAddSuccess(newArea)
            onClose();
            setErrors({});
            router.refresh();
        } catch (error) {
            console.log(error);
            setError(`Error al crear área: ${error.message}`);
        } finally {
            setAdding(false);
        }
    }


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="sm">
                <ModalContent>
                    {(onClose) => (
                        <div className='bg-white p-4 mt-4'>
                            <form onSubmit={addArea}>
                                <div className='w-full mt-2'>
                                    <NameInput onChange={(e) => { setName(e.target.value) }} />
                                    {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                                </div>
                            </form>
                            <ButtonsAction
                                isLoading={adding}
                                onClose={onClose}
                                onSubmit={addArea}
                                submitLabel="Agregar área"
                                className='flex justify-end gap-2 mt-4'
                            />
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAddArea;