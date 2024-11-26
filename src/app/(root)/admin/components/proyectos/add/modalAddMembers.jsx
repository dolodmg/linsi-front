"use client"
import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, Divider, Select, SelectItem } from '@nextui-org/react';
import { Inter } from 'next/font/google';
import ButtonsAction from '../../buttonsAction';
import { addMemberToProjectAction } from '@/actions/project_member';
import { useRouter } from 'next/navigation';
import CreateComponentButton from '../../createComponentButton';
import ModalAgregar from '../../integrantes/add/modalAgregar';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const ModalAddMembers = ({ isOpen, onClose, selectedProject, membersByProject, members }) => {

    const [selectedMembers, setSelectedMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [adding, setAdding] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    if (!selectedProject) return null;
    const projectMembers = membersByProject[selectedProject.id] || [];

    const availableMembers = members.filter(member => 
        !projectMembers.some(projectMember => projectMember.id === member.id)
    );

    const handleSelectionChange = (selected) => {
        setSelectedMembers(selected);
    };

    const addMemberToProject = async () => {
        setAdding(true);
        try {
            await Promise.all(
                Array.from(selectedMembers).map(async (memberId) => {
                    await addMemberToProjectAction(memberId, selectedProject.id);
                })
            );
            router.refresh();
            onClose();
        } catch (error) {
            console.error('Error al agregar miembros al proyecto', error);
        } finally {
            setSelectedMembers([]);
            setAdding(false);
        }
    };

    const handleCloseModal = () => {
        setSelectedMembers([]);
        onClose();
    }

    const handleOpenAddMemberModal = () => {
        setIsModalAddOpen(true);
    }

    const handleAddClose = () => {
        setIsModalAddOpen(false);
        router.refresh();
    }

    return (
        <>
        <Modal isOpen={isOpen} onClose={handleCloseModal} size='2xl'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className={`${inter.className} text-bg-blue text-xl`}>
                            Proyecto: {selectedProject.name}
                        </ModalHeader>
                        <Divider/>
                        <ModalBody>
                            <div className='flex flex-col py-2'>
                                <p className={`${inter.className} text-black font-medium text-sm mb-2`}>Seleccioná uno o más integrantes para agregar al proyecto {selectedProject.name}:</p>
                                <Select
                                label='Integrantes'
                                placeholder='Seleccioná los integrantes'
                                selectionMode='multiple'
                                selectedKeys={selectedMembers}
                                onSelectionChange={handleSelectionChange}
                                value={selectedMembers}
                                aria-label='Seleccionar integrantes'
                                className='text-black'>
                                    {availableMembers.map((member) => (
                                        <SelectItem 
                                        key={member.id} 
                                        value={member.id.toString()}
                                        textValue={`${member.firstName} ${member.lastName}`} 
                                        className='text-black'
                                        aria-label='Integrante(s) seleccionado(s)'
                                        >
                                            {member.firstName} {member.lastName}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <CreateComponentButton onClick={handleOpenAddMemberModal} component="integrante" />
                            </div>
                            
                            <ButtonsAction
                            isLoading={adding}
                            onClose={handleCloseModal}
                            onSubmit={addMemberToProject}
                            submitLabel="Agregar"
                            className='flex justify-end gap-2 mt-4'
                        /> 
                        </ModalBody>
                    </> 
                )}
            </ModalContent>
        </Modal>
        <ModalAgregar isOpen={isModalAddOpen} onClose={handleAddClose} />
        </>
    )
}

export default ModalAddMembers;