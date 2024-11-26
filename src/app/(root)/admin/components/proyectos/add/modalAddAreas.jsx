"use client"
import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, Divider, Select, SelectItem } from '@nextui-org/react';
import { Inter } from 'next/font/google';
import ButtonsAction from '../../buttonsAction';
import { addAreaToProjectAction } from '@/actions/project_area';
import { useRouter } from 'next/navigation';
import CreateComponentButton from '../../createComponentButton';
import ModalAddArea from '../../areas/add/modalAddArea';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const ModalAddAreas = ({ isOpen, onClose, selectedProject, areasByProject, areas }) => {

    const [selectedAreas, setSelectedAreas] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [adding, setAdding] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    if (!selectedProject) return null;
    const projectAreas = areasByProject[selectedProject.id] || [];

    const availableAreas = areas.filter(area => 
        !projectAreas.some(projectAreas => projectAreas.id === area.id)
    );

    const handleSelectionChange = (selected) => {
        setSelectedAreas(selected);
    };

    const addAreaToProject = async () => {
        setAdding(true);
        try {
            await Promise.all(
                Array.from(selectedAreas).map(async (areaId) => {
                    await addAreaToProjectAction(areaId, selectedProject.id);
                })
            );
            router.refresh();
            onClose();
        } catch (error) {
            console.error('Error al agregar áreas al proyecto', error);
        } finally {
            setSelectedAreas([]);
            setAdding(false);
        }
    };

    const handleCloseModal = () => {
        setSelectedAreas([]);
        onClose();
    }

    const handleOpenAddAreaModal = () => {
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
                                <p className={`${inter.className} text-black font-medium text-sm mb-2`}>Seleccioná una o más áreas para agregar al proyecto {selectedProject.name}:</p>
                                <Select
                                label='Áreas'
                                placeholder='Seleccioná una o más áreas'
                                selectionMode='multiple'
                                selectedKeys={selectedAreas}
                                onSelectionChange={handleSelectionChange}
                                value={selectedAreas}
                                aria-label='Seleccionar áreas'
                                className='text-black'>
                                    {availableAreas.map((area) => (
                                        <SelectItem 
                                        key={area.id} 
                                        value={area.id.toString()}
                                        textValue={`${area.name}`} 
                                        className='text-black'
                                        aria-label='Área(s) seleccionada(s)'
                                        >
                                            {area.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <CreateComponentButton onClick={handleOpenAddAreaModal} component="área" />
                            </div>
                            
                            <ButtonsAction
                            isLoading={adding}
                            onClose={handleCloseModal}
                            onSubmit={addAreaToProject}
                            submitLabel="Agregar"
                            className='flex justify-end gap-2 mt-4'
                        /> 
                        </ModalBody>
                    </> 
                )}
            </ModalContent>
        </Modal>
        <ModalAddArea isOpen={isModalAddOpen} onClose={handleAddClose} />
        </>
    )
}

export default ModalAddAreas;