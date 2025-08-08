"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal, ModalContent, ModalHeader, ModalBody, Divider } from '@nextui-org/react';
import ButtonsAction from '@/components/admin/ui/buttonsAction';
import { deleteProjectAction } from '@/actions/project';
import { Inter } from 'next/font/google';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)


const ModalDeleteProject = ({ isOpen, onClose, selectedProject, onDeleteSuccess }) => {

    const router = useRouter();
    const [deleting, setDeleting] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setDeleting(true);
        setError(null);

        try {
            await deleteProjectAction(selectedProject.id);
            onDeleteSuccess(selectedProject.id);
            onClose();
        } catch (error) {
            setError(`Error al eliminar el proyecto: ${error.message}`);
            console.error('Error al eliminar el proyecto:', error);
        } finally {
            setDeleting(false);
        }
    }

    const handleCloseModal = () => {
        onClose();
    }

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className={`${inter.className} text-bg-blue text-xl`}>Proyecto: {selectedProject.name}</ModalHeader>
                    <Divider/>
                    <ModalBody>
                    <div className='bg-white flex flex-col gap-1'>
                        <p className={`${inter.className} text-black text-md font-medium items-center justify-center`}>¿Está seguro que desea eliminar el proyecto "{selectedProject.name}"?</p>
                        <p className={`${inter.className} text-black text-sm justify-start items-start`}>El proyecto se eliminará permanentemente. Esta acción es irreversible.</p>
                    </div>
                    <ButtonsAction
                            isLoading={deleting}
                            onClose={handleCloseModal}
                            onSubmit={handleDelete}
                            submitLabel="Eliminar"
                            className='flex justify-end gap-2 mt-2'
                        /> 
                    </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    )
}

export default ModalDeleteProject;