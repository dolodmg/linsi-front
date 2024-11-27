"use client"
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { useForm, FormProvider } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';
import ModalEditar from './edit/modalEditar'; 
import ModalDetalle from './modalDetalle';
import ModalDeleteProject from './delete/modalDeleteProject';
import ModalAddProject from './add/modalAddProject';
import ModalAddMembers from './add/modalAddMembers';
import ModalAddAreas from './add/modalAddAreas';
import { useProjectEditStore } from "@/app/store";
import DeleteButton from '../deleteButton';
import AddButton from '../addButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

export const TableProyectos = ({ projects, membersByProject, areasByProject, members, areas }) => {

    const methods = useForm();
    const [isModalDetalleOpen, setIsModalDetalleOpen] = useState(false); 
    const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalAddMembersOpen, setIsModalAddMembersOpen] = useState(false);
    const [isModalAddAreasOpen, setIsModalAddAreasOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [localProjects, setLocalProjects] = useState(projects);
    const { setProjectStore } = useProjectEditStore();

    const handleCloseModalDetalle = () => {
        setIsModalDetalleOpen(false);  
        setSelectedProject(null);
    };

    const handleEditClick = (projectToEdit) => {
        setProjectStore(projectToEdit);
        setIsModalEditarOpen(true);    
    };

    const handleCloseEdit = () => {
        setIsModalEditarOpen(false);   
    };

    const handleDeleteModal = (projectItem) => {
        setIsModalDeleteOpen(true);
        setSelectedProject(projectItem);
    }

    const handleCloseDelete = () => {
        setIsModalDeleteOpen(false);
        setSelectedProject(null);
    }

    const handleAddProject = () => {
        setIsModalAddOpen(true);
    }

    const handleCloseAdd = () => {
        setIsModalAddOpen(false);
    }

    const handleCloseAddMembers = () => {
        setIsModalAddMembersOpen(false);
        setSelectedProject(null);
    } 

    const handleMembersClick = (projectItem) => {
        setIsModalDetalleOpen(true);   
        setSelectedProject(projectItem);
    };

    const handleMembersAddClick = (projectItem) => {
        setIsModalAddMembersOpen(true);
        setSelectedProject(projectItem);
    }

    const handleCloseAddAreas = () => {
        setIsModalAddAreasOpen(false);
        setSelectedProject(null);
    }

    const handleAddAreasClick = (projectItem) => {
        setIsModalAddAreasOpen(true);
        setSelectedProject(projectItem);
    }

    const handleAddProjectSuccess = (newProject) => {
        setLocalProjects((prevProjects) => [newProject, ...prevProjects]);
    };    

    const handleDeleteProjectSuccess = (deletedProjectId) => {
        setLocalProjects((prevProjects) => prevProjects.filter((project) => project.id !== deletedProjectId));
    };

    return (
        <>
        <AddButton onClick={handleAddProject} component='proyecto' />
        <FormProvider {...methods}>
            <Table aria-label="Lista de proyectos" className='mt-2'>
                <TableHeader>
                    <TableColumn>TÍTULO</TableColumn>
                    <TableColumn>FECHA INICIO</TableColumn>
                    <TableColumn>FECHA FIN</TableColumn>
                    <TableColumn>INTEGRANTES</TableColumn>
                    <TableColumn>ÁREAS</TableColumn>
                    <TableColumn>MÁS INFORMACIÓN</TableColumn>
                    <TableColumn>ACCIONES</TableColumn>
                </TableHeader>
                <TableBody>
                    {localProjects.map((projectItem) => (
                        <TableRow key={projectItem.id}>
                            <TableCell className={`${inter.className} text-black`}>{projectItem.name}</TableCell>
                            <TableCell className={`${inter.className} text-black`}>{projectItem.startDate}</TableCell>
                            <TableCell className={`${inter.className} text-black`}>{projectItem.endDate}</TableCell>
                            <TableCell className={`${inter.className} text-black`}>
                            <div className='flex items-center'>
                                    <button className='bg-white p-1 text-green-700' aria-label='Agregar integrantes' onClick={() => handleMembersAddClick(projectItem)}>
                                        <AddCircleIcon/> Agregar
                                    </button>
                                    </div>
                            </TableCell>
                            <TableCell className={`${inter.className} text-black`}>
                            <div className='flex items-center'>
                                    <button className='bg-white p-1 text-green-700' aria-label='Agregar áreas' onClick={() => handleAddAreasClick(projectItem)}>
                                        <AddCircleIcon/> Agregar
                                    </button>
                                    </div>
                            </TableCell>
                            <TableCell className={`${inter.className} text-black`}>
                            <Button className='bg-bg-blue text-white' size='md' onClick={() => handleMembersClick(projectItem)}>
                                Ver detalle
                            </Button>
                            </TableCell>
                            <TableCell>
                                <div className='flex gap-1'>
                                    <button
                                    onClick={() => handleEditClick(projectItem)}
                                    className='p-1 bg-white text-bg-blue'>
                                        <EditIcon />
                                    </button>
                                    <DeleteButton onClick={() => handleDeleteModal(projectItem)} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ModalAddMembers isOpen={isModalAddMembersOpen} onClose={handleCloseAddMembers} selectedProject={selectedProject} membersByProject={membersByProject} members={members} />         
            <ModalAddAreas isOpen={isModalAddAreasOpen} onClose={handleCloseAddAreas} selectedProject={selectedProject} areasByProject={areasByProject} areas={areas} />
            <ModalDetalle isOpen={isModalDetalleOpen} onClose={handleCloseModalDetalle} selectedProject={selectedProject} membersByProject={membersByProject} areasByProject={areasByProject} members={members} />
            <ModalEditar isOpen={isModalEditarOpen} onClose={handleCloseEdit} />
            <ModalDeleteProject isOpen={isModalDeleteOpen} onClose={handleCloseDelete} selectedProject={selectedProject} onDeleteSuccess={handleDeleteProjectSuccess} />
            <ModalAddProject isOpen={isModalAddOpen} onClose={handleCloseAdd} onAddSuccess={handleAddProjectSuccess} />
        </FormProvider>
        </>
    )
}