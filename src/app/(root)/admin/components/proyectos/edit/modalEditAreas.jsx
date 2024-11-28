"use client"
import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, Divider, Select, SelectItem } from '@nextui-org/react';
import RemoveIcon from '@mui/icons-material/Remove';
import { Inter } from 'next/font/google';
import ButtonsAction from '../../buttonsAction';
import { addAreaToProjectAction } from '@/actions/project_area';
import { useRouter } from 'next/navigation';
import CreateComponentButton from '../../createComponentButton';
import ModalAddArea from '../../areas/add/modalAddArea';
import ModalDeleteArea from '../delete/modalDeleteArea';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const ModalEditAreas = ({ isOpen, onClose, selectedProject, areasByProject, areas }) => {

    const [selectedAreas, setSelectedAreas] = useState([]);
    const router = useRouter();
    const [adding, setAdding] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [ area, setArea ] = useState(null);
    const [localAreas, setLocalAreas] = useState(areas);

    const [projectAreas, setProjectAreas] = useState(
        areasByProject[selectedProject?.id] || []
    );

    useEffect(() => {
        if (selectedProject) {
            setProjectAreas(areasByProject[selectedProject.id] || []);
        }
    }, [selectedProject, areasByProject]);

    if (!selectedProject) return null;
    
    const availableAreas = localAreas.filter(area => 
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


    const handleOpenAddAreaModal = () => {
        setIsModalAddOpen(true);
    }

    const handleAddClose = () => {
        setIsModalAddOpen(false);
        router.refresh();
    }

    const handleOpenDeleteModal = (area) => {
        setArea(area);
        setIsModalDeleteOpen(true);
    }

    const handleDeleteClose = () => {
        setIsModalDeleteOpen(false);
        router.refresh();
    }

    const handleAddAreaSuccess = (newArea) => {
        setLocalAreas((prev) => [newArea, ...prev]);
        router.refresh();
    }

    const handleDeleteAreaSuccess = (deletedAreaId) => {
        setProjectAreas((prev) => prev.filter((area) => area.id !== deletedAreaId));
        router.refresh();
    }

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
                            <div>
                                <p className={`${inter.className} text-sm text-black font-medium mb-2`}>Áreas vinculadas:</p>
                                {projectAreas.length > 0 ? (
                                    <ul>
                                        {projectAreas.map((area) => (
                                            <li key={area.id} className={`${inter.className} text-black text-sm`}>
                                                <div className='flex flex-row items-center mb-2'>
                                                    <button onClick={() => handleOpenDeleteModal(area) }>
                                                        <RemoveIcon fontSize='small' className='text-white bg-red-700 rounded-md mr-1' />
                                                    </button>                                       
                                                    {`${area.name}`}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className={`${inter.className} text-gray-400 text-sm`}>No hay áreas vinculadas</p>
                                )}
                            </div>
                            <ButtonsAction
                            isLoading={adding}
                            onClose={onClose}
                            onSubmit={addAreaToProject}
                            submitLabel="Agregar"
                            className='flex justify-end gap-2 mt-4'
                        /> 
                        </ModalBody>
                    </> 
                )}
            </ModalContent>
        </Modal>
        <ModalAddArea isOpen={isModalAddOpen} onClose={handleAddClose} onAddSuccess={handleAddAreaSuccess}/>
        <ModalDeleteArea isOpen={isModalDeleteOpen} onClose={handleDeleteClose} selectedProject={selectedProject} area={area} onDeleteSuccess={handleDeleteAreaSuccess} />
        </>
    )
}

export default ModalEditAreas;