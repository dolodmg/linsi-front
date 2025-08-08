"use client"
import React, { useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, Divider } from '@nextui-org/react';
import { Inter } from 'next/font/google';
import { changeInscriptionStatusAction } from '@/actions/inscription';
import ButtonsAction from '@/components/admin/ui/buttonsAction';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const ModalStatusChange = ({ isOpen, onClose, selectedInscription }) => {
    if (!selectedInscription) return null;
    const [changing, setChanging] = useState(false);

    const handleChangeStatus = async (event) => {
        event.preventDefault();
        try {
            setChanging(true);
            await changeInscriptionStatusAction(selectedInscription.id, 'CONFIRMED');
            onClose();
        } catch (error) {
            console.log('Error al cambiar estado de inscripción', error);
        } finally {
            setChanging(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='md'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody>
                            <div className="bg-white flex flex-col w-full p-4 justify-center">
                                <div className={`${inter.className} text-black text-sm flex justify-center flex-col`}>
                                    <h2>
                                        ¿Está seguro de cambiar el estado de la inscripción de {' '}
                                        {selectedInscription.firstName} {selectedInscription.lastName} de {' '}
                                        <span className="font-semibold">pendiente</span> a {' '}
                                      <span className="font-semibold">confirmada</span>?
                                    </h2>
                                    <p>Esta acción es irreversible y no tendrá más acceso a esta inscripción.</p>

                                </div>
                                <ButtonsAction
                                    isLoading={changing}
                                    onClose={onClose}
                                    onSubmit={handleChangeStatus}
                                    submitLabel="Cambiar estado"
                                    className='flex justify-end gap-2 mt-4'
                                />
                            </div>
                        </ModalBody>
                    </>
                ) }
            </ModalContent>
        </Modal>
    )
}

export default ModalStatusChange;