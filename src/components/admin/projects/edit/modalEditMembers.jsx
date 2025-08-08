"use client"
import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, Divider, Select, SelectItem } from '@nextui-org/react';
import RemoveIcon from '@mui/icons-material/Remove';
import { Inter } from 'next/font/google';
import ButtonsAction from '@/components/admin/ui/buttonsAction';
import { addMemberToProjectAction } from '@/actions/project_member';
import { useRouter } from 'next/navigation';
import CreateComponentButton from '@/components/admin/ui/createComponentButton';
import ModalAgregar from '@/components/admin/members/add/modalAgregar';
import ModalDeleteMember from '@/components/admin/members/delete/modalDeleteMember';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const ModalEditMembers = ({ isOpen, onClose, selectedProject, membersByProject, members, onUpdateProjectMembers, onUpdateAreasAndMembers }) => {

    const [selectedMembers, setSelectedMembers] = useState([]);
    const router = useRouter();
    const [adding, setAdding] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [ member, setMember ] = useState(null);
    const [localMembers, setLocalMembers] = useState(members);

    const [projectMembers, setProjectMembers] = useState(
        membersByProject[selectedProject?.id] || []
    );

    useEffect(() => {
        if (selectedProject) {
            setProjectMembers(membersByProject[selectedProject.id] || []);
        }
    }, [selectedProject, membersByProject]);

    // Actualizar localMembers cuando cambien los miembros desde el padre
    useEffect(() => {
        setLocalMembers(members);
    }, [members]);

    if (!selectedProject) return null;
    const availableMembers = localMembers.filter(member => 
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
            // Actualizar el estado del proyecto específico
            if (onUpdateProjectMembers) {
                await onUpdateProjectMembers(selectedProject.id);
            }
            onClose();
        } catch (error) {
            console.error('Error al agregar miembros al proyecto', error);
        } finally {
            setSelectedMembers([]);
            setAdding(false);
        }
    };

    const handleOpenAddMemberModal = () => {
        setIsModalAddOpen(true);
    }

    const handleAddClose = async () => {
        setIsModalAddOpen(false);
        // Actualizar los miembros disponibles cuando se agrega un nuevo miembro
        if (onUpdateAreasAndMembers) {
            await onUpdateAreasAndMembers();
        }
    }

    const handleOpenDeleteModal = (member) => {
        setMember(member);
        setIsModalDeleteOpen(true);
    }

    const handleDeleteClose = async () => {
        setIsModalDeleteOpen(false);
        // Actualizar el estado del proyecto cuando se elimina un miembro
        if (onUpdateProjectMembers) {
            await onUpdateProjectMembers(selectedProject.id);
        }
    }

    const handleAddMemberSuccess = (newMember) => {
        setLocalMembers((prev) => [newMember, ...prev]);
        // No necesitamos router.refresh() aquí ya que se maneja en handleAddClose
    };
    
    const handleDeleteMemberSuccess = (deletedMemberId) => {
        setProjectMembers((prev) => prev.filter((member) => member.id !== deletedMemberId));
        // No necesitamos router.refresh() aquí ya que se maneja en handleDeleteClose
    };

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className={`${inter.className} text-bg-blue text-xl`}>
                            Proyecto: {selectedProject.name}
                        </ModalHeader>
                        <Divider/>
                        <ModalBody>
                            <div className='flex flex-col py-2'>
                                <p className={`${inter.className} text-black font-medium text-sm mb-2`}>Seleccioná uno o más integrantes para agregar al proyecto "{selectedProject.name}":</p>
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
                            <div>
                                <p className={`${inter.className} text-black text-sm font-medium mb-2`}>Integrantes actuales:</p>
                                {projectMembers.length > 0 ? (
                                    <ul>
                                        {projectMembers.map(member => (
                                            <li key={member.id} className={`${inter.className} text-black text-sm`}>
                                                <div className='flex flex-row items-center mb-2'>
                                                    <button onClick={() => handleOpenDeleteModal(member) }>
                                                        <RemoveIcon fontSize='small' className='text-white bg-red-700 rounded-md mr-1' />
                                                    </button>                                       
                                                    {`${member.firstName} ${member.lastName}`}
                                                </div>
                                            </li>
                                        )) }
                                    </ul> 
                                ) : (
                                    <p className={`${inter.className} text-sm text-gray-400`}>
                                        No se encontraron integrantes para este proyecto
                                    </p>
                                )}
                            </div>
                            <ButtonsAction
                            isLoading={adding}
                            onClose={onClose}
                            onSubmit={addMemberToProject}
                            submitLabel="Agregar"
                            className='flex justify-end gap-2 mt-4'
                        /> 
                        </ModalBody>
                    </> 
                )}
            </ModalContent>
        </Modal>
        <ModalAgregar isOpen={isModalAddOpen} onClose={handleAddClose} onAddSuccess={handleAddMemberSuccess} />
        <ModalDeleteMember isOpen={isModalDeleteOpen} onClose={handleDeleteClose} selectedProject={selectedProject} member={member} onDeleteSuccess={handleDeleteMemberSuccess}/>
        </>
    )
}

export default ModalEditMembers;