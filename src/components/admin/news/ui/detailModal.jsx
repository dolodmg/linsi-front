"use client"
import React, { useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, Divider } from '@nextui-org/react';
import { Inter } from 'next/font/google';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const ModalDetalle = ({ isOpen, onClose, selectedNew }) => {

    if (!selectedNew) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='lg'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className={`${inter.className} text-bg-blue text-xl`}>Artículo: {selectedNew.title}</ModalHeader>
                        <Divider/>
                        <ModalBody>
                            <div className='bg-white flex flex-col gap-2 w-full p-4 '>
                                <div className='flex'>
                                    <p className={`${inter.className} text-sm text-gray-400`}>Fecha de publicación: {selectedNew.publicationDate}</p>
                                </div>
                                <div className='flex justify-center'>
                                    <img 
                                    src={selectedNew.s3Url} 
                                    alt={selectedNew.title} 
                                    className='w-[500px] h-[300px] rounded-md object-cover' />
                                </div>
                                <div className='flex flex-col'>
                                    <h1 className={`${inter.className} text-bg-blue text-md font-medium`}>Descripción</h1>
                                    <p className={`${inter.className} text-black`}>{selectedNew.description}</p>
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