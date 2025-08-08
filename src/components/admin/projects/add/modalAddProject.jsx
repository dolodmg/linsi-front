"use client"
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent } from '@nextui-org/react';
import ButtonsAction from '@/components/admin/ui/buttonsAction';
import { createProjectAction } from '@/actions/project';
import { useRouter } from 'next/navigation';
import TitleInput from './titleInput'
import DescriptionInput from './descriptionInput';
import StartDateInput from './startDateInput';
import EndDateInput from './endDateInput';
import { Inter } from 'next/font/google';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const ModalAddProject = ({ isOpen, onClose, onAddSuccess }) => {

    const router = useRouter();
    const [adding, setAdding] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const addProject = async (event) => {
        event.preventDefault();

        let newErrors = {};
        const fields = {
            name,
            description,
            startDate
        }

        Object.entries(fields).forEach(([key, value]) => {
            if (!value) {
                newErrors[key] = '* Este campo es obligatorio';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; 
        } else {
            setErrors({}); 
            setAdding(true);
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('startDate', startDate);
        if (endDate) {
            formData.append('endDate', endDate);
        }
        try {
            const newProject = await createProjectAction(formData);
            onAddSuccess(newProject);
            onClose();
            setErrors({});
        } catch (error) {
            console.log(error);
            setError(`Error al crear proyecto: ${error.message}`);
        } finally {
            setAdding(false);
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <div className='bg-white p-6'>
                            <form onSubmit={addProject}>
                                <div className='flex flex-col gap-4'>
                                    <div className='w-2/3'>
                                        <TitleInput onChange={(e) => { setName(e.target.value)}} />
                                        {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                                    </div>
                                    <div className='w-2/3'>
                                        <DescriptionInput onChange={(e) => { setDescription(e.target.value) }} />
                                        {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
                                    </div>
                                    <div className='flex flex-row gap-2 w-2/3'>
                                        <div className='w-1/2'>
                                            <StartDateInput onChange={(date) => { setStartDate(date) }} />
                                            {errors.startDate && <p className="text-red-500 text-sm mt-2">{errors.startDate}</p>}
                                         </div>
                                        <div className='w-1/2'>
                                            <EndDateInput onChange={(date) => { setEndDate(date) }} />
                                        </div>   
                                    </div>
                                </div>                    
                                <ButtonsAction
                                isLoading={adding}
                                onClose={onClose}
                                onSubmit={addProject}
                                submitLabel="Agregar proyecto"
                                className='flex justify-end gap-2 mt-4'
                                />
                            </form>   
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAddProject;