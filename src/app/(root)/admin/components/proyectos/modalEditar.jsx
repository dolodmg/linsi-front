"use client"
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader, Divider } from '@nextui-org/react';
import { useProjectEditStore, useFormStoreProject } from '@/app/store';
import { editProjectAction } from '@/actions/project';
import Title from './inputTitle'
import Description from './inputDescription';
import StartDatePicker from './startDatePicker';
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from 'next/navigation'
import { Inter } from 'next/font/google';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)


const ModalEditar = ({ isOpen, onClose }) => {
    const { project } = useProjectEditStore();
    const { name, description, startDate, endDate, setName, setDescription, setStartDate, setEndDate } = useFormStoreProject();
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);
    const methods = useForm();
    
    useEffect(() => {
        if (project) { 
            setName(project.name);
            setDescription(project.description);
            setStartDate(project.startDate);
            setEndDate(project.endDate);
            methods.reset({
                name: project.name,
                description: project.description,
                startDate: project.startDate,
                endDate: project.endDate
            });
        }
    }, [project, methods, setName, setDescription, setStartDate, setEndDate]);

    const onEdit = async (data) => {
        setEditing(true);
        setError(null);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('startDate', data.startDate);
        formData.append('endDate', data.endDate);

        try {
            await editProjectAction(project.id, formData);
            onClose();
            router.refresh();
        } catch (error) {
            setError(`Error al editar el proyecto: ${error.message}`);
            console.error('Error al editar el proyecto:', error);
        } finally {
            setEditing(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className={`${inter.className} text-bg-blue text-xl`}>Proyecto: {project.name}</ModalHeader>
                    <Divider/>
                    <ModalBody>
                    <div className='bg-white p-6'>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onEdit)}>
                                <div className='w-full md:w-2/3 flex flex-col gap-4'>
                                    <Title name="name" labelTitle="Nombre" defaultValue={name}/>
                                    <Description name="description" labelDescription="Descripción" defaultValue={description} />
                                    <StartDatePicker name="startDate" labelStartDate="Fecha de inicio" defaultValue={startDate} />
                                </div>
                                {error && <p className="text-red-500">{error}</p>}
  
                            </form>
                        </FormProvider>
                    </div>
                    </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalEditar;