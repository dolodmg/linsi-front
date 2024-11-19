"use client"
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader, Divider, Button } from '@nextui-org/react';
import { useProjectEditStore, useFormStoreProject } from '@/app/store';
import { editProjectAction } from '@/actions/project';
import Title from './titleInput';
import Description from './descriptionInput';
import StartDateInput from './startDateInput';
import EndDateInput from './endDateInput';
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import ButtonsAction from '../../buttonsAction';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
);

const ModalEditar = ({ isOpen, onClose }) => {
    const { project } = useProjectEditStore();
    const { setName, setDescription, setStartDate, setEndDate } = useFormStoreProject();
    const router = useRouter();
    const [name] = useState('');
    const [description] = useState('');
    const [startDate] = useState('');
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);

    const methods = useForm({
        defaultValues: {
            name: '',
            description: '',
            startDate: '',
            endDate: ''
        }
    });

    useEffect(() => {
        if (project) {
            setName(project.name);
            setDescription(project.description);
            setStartDate(project.startDate);
            setEndDate(project.endDate || '');

            methods.reset({
                name: project.name,
                description: project.description,
                startDate: project.startDate,
                endDate: project.endDate || ''
            });
        }
    }, [project, methods, setName, setDescription, setStartDate, setEndDate]);

    const onEdit = async (data) => {
        let newErrors = {};
        const fields = {
            name: data.name,
            description: data.description,
            startDate: data.startDate
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
            setEditing(true);
        }

        const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('startDate', data.startDate || project.startDate || '');
            if (data.endDate) {
                formData.append('endDate', data.endDate);
            } else {
                formData.append('endDate', Date(null));
            }
            
            try {
                await editProjectAction(project.id, formData);
                onClose();
                router.refresh();
                setErrors({});
            } catch (error) {
                setError(`Error al editar el proyecto: ${error.message}`);
                console.error('Error al editar el proyecto:', error);
            } finally {
                setEditing(false);
            }
    }   ;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className={`${inter.className} text-bg-blue text-xl`}>
                        Proyecto: {project.name}
                    </ModalHeader>
                    <Divider/>
                    <ModalBody>
                        <div className='bg-white p-6'>
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onEdit)}>
                                    <div className='flex flex-col gap-4'>
                                        <div className='w-2/3'>
                                            <Title name="name" labelTitle="Nombre" />
                                            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                                        </div>
                                        <div className='w-2/3'>
                                            <Description name="description" labelDescription="Descripción" />
                                            {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
                                        </div>
                                        <div className='flex flex-row gap-2 w-2/3'>
                                            <div className='w-1/2'>
                                                <StartDateInput name="startDate" labelStartDate="Fecha de inicio" />
                                                {errors.startDate && <p className="text-red-500 text-sm mt-2">{errors.startDate}</p>}
                                            </div>
                                            <div className='w-1/2'>
                                                <EndDateInput name="endDate" labelEndDate="Fecha de fin" />
                                            </div>
                                        </div>            
                                    </div>
                                    {error && <p className="text-red-500 mt-2">{error}</p>}
                                    <div className="flex justify-end gap-2 mt-4">
                                    <ButtonsAction
                                isLoading={editing}
                                onClose={onClose}

                                submitLabel="Editar proyecto"
                                className='flex justify-end gap-2 mt-4'
                                />
                                
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                    </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalEditar;