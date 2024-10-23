"use client"
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { useForm, FormProvider } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';
import ModalEditar from './modalEditar'; 
import ModalDetalle from './modalDetalle';
import { useProjectEditStore } from "@/app/store";

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

export const TableProyectos = ({ projects, membersByProject, areasByProject }) => {

    const methods = useForm();
    const [isModalDetalleOpen, setIsModalDetalleOpen] = useState(false); 
    const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const { setProjectStore } = useProjectEditStore();

    const handleMembersClick = (projectItem) => {
        setIsModalDetalleOpen(true);   
        setSelectedProject(projectItem);
    };
    
    const handleCloseModalDetalle = () => {
        setIsModalDetalleOpen(false);  
        setSelectedProject(null);
    };

    const handleEditClick = (projectItem) => {
        setProjectStore(projectItem);
        setIsModalEditarOpen(true);    
    };

    const handleCloseEdit = () => {
        setIsModalEditarOpen(false);   
    };

    return (
        <FormProvider {...methods}>
            <Table aria-label="Lista de proyectos">
                <TableHeader>
                    <TableColumn>TÍTULO</TableColumn>
                    <TableColumn>FECHA INICIO</TableColumn>
                    <TableColumn>FECHA FIN</TableColumn>
                    <TableColumn>MÁS INFORMACIÓN</TableColumn>
                    <TableColumn>ACCIONES</TableColumn>
                </TableHeader>
                <TableBody>
                    {projects.map((projectItem) => (
                        <TableRow key={projectItem.id}>
                            <TableCell className={`${inter.className} text-black`}>{projectItem.name}</TableCell>
                            <TableCell className={`${inter.className} text-black`}>{projectItem.startDate}</TableCell>
                            <TableCell className={`${inter.className} text-black`}>{projectItem.endDate}</TableCell>
                            <TableCell className={`${inter.className} text-black`}>
                            <Button className='bg-bg-blue text-white' size='md' onClick={() => handleMembersClick(projectItem)}>
                                Ver detalle
                            </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                onClick={() => handleEditClick(projectItem)}
                                className='bg-bg-blue' size='sm'>
                                    <EditIcon className='text-white' />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ModalDetalle isOpen={isModalDetalleOpen} onClose={handleCloseModalDetalle} selectedProject={selectedProject} membersByProject={membersByProject} areasByProject={areasByProject} />
            <ModalEditar isOpen={isModalEditarOpen} onClose={handleCloseEdit} />
        </FormProvider>
    )
}