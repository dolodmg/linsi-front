"use client"
import React from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, Divider } from '@nextui-org/react';
import { Inter } from 'next/font/google';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const ModalMembers = ({ isOpen, onClose, selectedArea, membersByArea }) => {
    if (!selectedArea) return null;
    const areaMembers = membersByArea[selectedArea.id] || [];

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className={`${inter.className} text-bg-blue text-xl`}>
                            Área: {selectedArea.name}
                        </ModalHeader>
                        <Divider/>
                        <ModalBody>
                            <div className='flex flex-col py-2'>
                                <h1 className={`${inter.className} text-bg-blue text-md font-medium`}>Integrantes</h1>
                                {areaMembers.length > 0 ? (
                                    <ul className='list-disc pl-5 text-black'>
                                        {areaMembers.map(member => (
                                            <li key={member.id} className={`${inter.className} text-sm text-black`}>
                                                {`${member.firstName} ${member.lastName}`}
                                            </li>
                                        ))}
                                    </ul>              
                                ) : (
                                    <p className={`${inter.className} text-gray-400`}>
                                        No se encontraron integrantes para este proyecto
                                    </p>
                                )}
                            </div>
                        </ModalBody>
                    </> 
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalMembers;