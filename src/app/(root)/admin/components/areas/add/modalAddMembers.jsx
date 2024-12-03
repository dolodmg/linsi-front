"use client"
import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, Divider, Select, SelectItem } from '@nextui-org/react';
import { Inter } from 'next/font/google';
import ButtonsAction from '../../buttonsAction';
import { addMemberToAreaAction } from '@/actions/area_member';
import { useRouter } from 'next/navigation';
import CreateComponentButton from '../../createComponentButton';
import ModalAgregar from '../../integrantes/add/modalAgregar';
import ModalDeleteMember from '../delete/modalDeleteMember';
import RemoveIcon from '@mui/icons-material/Remove';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const ModalAddMembers = ({ isOpen, onClose, selectedArea, membersByArea, members }) => {

    const [selectedMembers, setSelectedMembers] = useState([]);
    const router = useRouter();
    const [adding, setAdding] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [ member, setMember ] = useState(null);
    const [localMembers, setLocalMembers] = useState(members);
    const [areaMembers, setAreaMembers] = useState(
        membersByArea[selectedArea?.id] || []
    );

    useEffect(() => {
        if (selectedArea) {
            setAreaMembers(membersByArea[selectedArea.id] || []);
        }
    }, [selectedArea, membersByArea]);

    if (!selectedArea) return null;
    const availableMembers = localMembers.filter(member => 
        !areaMembers.some(areaMember => areaMember.id === member.id)
    );

    const handleSelectionChange = (selected) => {
        setSelectedMembers(selected);
    };

    const addMemberToArea = async () => {
        setAdding(true);
        try {
            await Promise.all(
                Array.from(selectedMembers).map(async (memberId) => {
                    await addMemberToAreaAction(memberId, selectedArea.id);
                })
            );
            router.refresh();
            onClose();
        } catch (error) {
            console.error('Error al agregar miembros al área', error);
        } finally {
            setSelectedMembers([]);
            setAdding(false);
        }
    };

    const handleOpenAddMemberModal = () => {
        setIsModalAddOpen(true);
    }

    const handleAddClose = () => {
        setIsModalAddOpen(false);
        router.refresh();
    }

    const handleOpenDeleteModal = (member) => {
        setMember(member);
        setIsModalDeleteOpen(true);
    }

    const handleDeleteClose = () => {
        setIsModalDeleteOpen(false);
        router.refresh();
    }

    const handleAddMemberSuccess = (newMember) => {
        setLocalMembers((prev) => [newMember, ...prev]);
        router.refresh(); 
    };
    
    const handleDeleteMemberSuccess = (deletedMemberId) => {
        setAreaMembers((prev) => prev.filter((member) => member.id !== deletedMemberId));
        router.refresh();
    };

    return (
        <>
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
                                <p className={`${inter.className} text-black font-medium text-sm mb-2`}>Seleccioná uno o más integrantes para agregar al área de {selectedArea.name}:</p>
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
                            {areaMembers.length > 0 ? (
                                    <ul>
                                        {areaMembers.map(member => (
                                            <li key={member.id} className={`${inter.className} text-sm text-black`}>
                                                <div className='flex flex-row items-center mb-2'>
                                                    <button onClick={() => handleOpenDeleteModal(member) }>
                                                        <RemoveIcon fontSize='small' className='text-white bg-red-700 rounded-md mr-1' />
                                                    </button>                                       
                                                    {`${member.firstName} ${member.lastName}`}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>              
                                ) : (
                                    <p className={`${inter.className} text-gray-400 text-sm`}>
                                        No se encontraron integrantes para este área
                                    </p>
                                )}
                            </div>
                            <ButtonsAction
                            isLoading={adding}
                            onClose={onClose}
                            onSubmit={addMemberToArea}
                            submitLabel="Agregar"
                            className='flex justify-end gap-2 mt-4'
                        /> 
                        </ModalBody>
                    </> 
                )}
            </ModalContent>
        </Modal>
        <ModalAgregar isOpen={isModalAddOpen} onClose={handleAddClose} onAddSuccess={handleAddMemberSuccess}/>
        <ModalDeleteMember isOpen={isModalDeleteOpen} onClose={handleDeleteClose} selectedArea={selectedArea} member={member} onDeleteSuccess={handleDeleteMemberSuccess}/>
        </>
    )
}

export default ModalAddMembers;