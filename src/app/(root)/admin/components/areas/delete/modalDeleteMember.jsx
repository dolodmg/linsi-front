"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal, ModalContent, ModalBody } from '@nextui-org/react';
import ButtonsAction from '../../buttonsAction';
import { removeMemberFromAreaAction } from '@/actions/area_member';
import { Inter } from 'next/font/google';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)


const ModalDeleteMember = ({ isOpen, onClose, selectedArea, member, onDeleteSuccess }) => {

    const router = useRouter();
    const [deleting, setDeleting] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setDeleting(true);
        setError(null);

        try {
            await removeMemberFromAreaAction(member.id, selectedArea.id);
            onDeleteSuccess(member.id);
            onClose();
            setErrors({});
            router.refresh();
        } catch (error) {
            setError(`Error al desvincular el integrante: ${error.message}`);
            console.error('Error al desvincular el integrante:', error);
        } finally {
            setDeleting(false);
        }
    }

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalBody>
                    <div className='bg-white flex flex-col mt-2 gap-1 justify-center'>
                        <p className={`${inter.className} text-black text-sm font-medium items-center justify-center`}>¿Está seguro que desea desvincular a {member.firstName} {member.lastName} del área "{selectedArea.name}"?</p>
                        <p className={`${inter.className} text-black text-sm justify-start items-start`}>Esta acción es irreversible.</p>
                    </div>
                    <ButtonsAction
                            isLoading={deleting}
                            onClose={onClose}
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

export default ModalDeleteMember;