"use client"
import React, { useState } from 'react';
import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { Inter } from 'next/font/google';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const ModalDetalle = ({ isOpen, onClose, selectedInscription }) => {
    if (!selectedInscription) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='sm'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody>
                            <div className='bg-white flex flex-col gap-1 w-full p-4 '>
                                <div className='flex'>
                                    <p className={`${inter.className} text-black font-medium`}>{selectedInscription.firstName} {selectedInscription.lastName}</p>
                                </div>
                                <div className='flex flex-col text-sm'>
                                    <div className='mb-1'>
                                        <h1 className={`${inter.className} text-bg-blue font-medium`}>Correo electrónico</h1>
                                        <p className={`${inter.className} text-black`}>{selectedInscription.email}</p>
                                    </div>
                                    <div className='mb-1'>
                                        <h1 className={`${inter.className} text-bg-blue font-medium`}>DNI</h1>
                                        <p className={`${inter.className} text-black`}>{selectedInscription.dni}</p>
                                    </div>
                                    <div className='mb-1'>
                                        <h1 className={`${inter.className} text-bg-blue font-medium`}>Legajo</h1>
                                        <p className={`${inter.className} text-black `}>{selectedInscription.file}</p>
                                    </div>
                                    <div className='mb-1'>
                                        <h1 className={`${inter.className} text-bg-blue font-medium`}>Año de cursada</h1>
                                        <p className={`${inter.className} text-black`}>{selectedInscription.universityYear}° año</p>
                                    </div>
                                    <div className='mb-1'>
                                        <h1 className={`${inter.className} text-bg-blue font-medium`}>Área de interés</h1>
                                        <p className={`${inter.className} text-black`}>{selectedInscription.area.name}</p>
                                    </div>
                                    <div className='mb-1'>
                                        <h1 className={`${inter.className} text-bg-blue font-medium`}>Estado de inscripción</h1>
                                        <div className={`${inter.className} text-black`}>{selectedInscription.registrationStatusType == 'PENDING' ? 
                                        (
                                            <p>Pendiente</p>
                                        ) : (
                                            <p>Confirmada</p>
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                    </>
                ) }
            </ModalContent>
        </Modal>
    )
}

export default ModalDetalle;