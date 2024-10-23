"use client"
import React from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, Divider } from '@nextui-org/react';
import { Inter } from 'next/font/google';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const ModalDetalle = ({ isOpen, onClose, selectedProject, membersByProject, areasByProject }) => {

    if (!selectedProject) return null;
    const projectMembers = membersByProject[selectedProject.id] || [];
    const projectAreas = areasByProject[selectedProject.id] || [];

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className={`${inter.className} text-bg-blue text-xl`}>Proyecto: {selectedProject.name}</ModalHeader>
                        <Divider/>
                        <ModalBody>
                            <div className='bg-white flex flex-col gap-2 w-full p-4'>
                                <div className='flex flex-row space-x-1'>
                                    <p className={`${inter.className} text-sm text-gray-400`}>Inicio: {selectedProject.startDate}</p>
                                    <p className={`${inter.className} text-sm text-gray-400`}>{selectedProject.endDate != null ? `- Fin: ${selectedProject.endDate}` : ''}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <h1 className={`${inter.className} text-bg-blue text-md font-medium`}>Descripción</h1>
                                    <p className={`${inter.className} text-black`}>{selectedProject.description}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <h1 className={`${inter.className} text-bg-blue text-md font-medium`}>Integrantes</h1>
                                    {projectMembers.length > 0 ? (
                                        <ul className='list-disc pl-5 text-black'>
                                        {projectMembers.map(member => (
                                            <li key={member.id} className={`${inter.className} text-black`}>
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
                                <div className='flex flex-col'>
                                    <h1 className={`${inter.className} text-bg-blue text-md font-medium`}>Áreas asociadas</h1>
                                    {projectAreas.length > 0 ? (
                                        <ul className='list-disc pl-5 text-black'>
                                            {projectAreas.map(area => (
                                                <li key={area.id} className={`${inter.className} text-black`}>
                                                    {area.name}
                                                </li>
                                            ))}
                                        </ul>
                                        ) : (
                                            <p className={`${inter.className} text-gray-400`}>
                                                No se encontraron áreas asociadas a este proyecto
                                            </p>
                                        )
                                    }
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