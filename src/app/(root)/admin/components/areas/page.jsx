"use client"
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { useForm, FormProvider } from "react-hook-form";
import ModalMembers from './modalMembers';
import ModalAddMembers from './add/modalAddMembers';
import ModalAddArea from './add/modalAddArea';
import ModalDeleteArea from './delete/modalDeleteArea';
import AddButton from '../addButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

export const TableAreas = ({ areas, membersByArea, members }) => {
    const methods = useForm();
    const [localAreas, setLocalAreas] = useState(areas);
    const [isModalDetalleOpen, setIsModalDetalleOpen] = useState(false);
    const [selectedArea, setSelectedArea] = useState(null);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalAddAreaOpen, setIsModalAddAreaOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [areaToDelete, setAreaToDelete] = useState(null);
    
    const handleMembersClick = (area) => {
        setIsModalDetalleOpen(true);   
        setSelectedArea(area);
    };
    
    const handleCloseModalDetalle = () => {
        setIsModalDetalleOpen(false);  
        setSelectedArea(null);
    };

    const handleMembersAddClick = (area) => {
        setIsModalAddOpen(true);
        setSelectedArea(area);
    }

    const handleCloseAdd = () => {
        setIsModalAddOpen(false);
        setSelectedArea(null);
    }

    const handleAddAreaClose = () => {
        setIsModalAddAreaOpen(false);
    }

    const handleAddArea = () => {
        setIsModalAddAreaOpen(true);
    }

    const handleDeleteArea = (area) => {
        setSelectedArea(area);
        setIsModalDeleteOpen(true);
    }

    const handleCloseDelete = () => {
        setIsModalDeleteOpen(false);
        setSelectedArea(null);
    }

    const handleAddAreaSuccess = (newArea) => {
        setLocalAreas((prevAreas) => [newArea, ...prevAreas]);
    };    

    const handleDeleteAreaSuccess = (deletedAreaId) => {
        setLocalAreas((prevAreas) => prevAreas.filter((area) => area.id !== deletedAreaId));
    };
    
    return (
        <>
            <AddButton onClick={handleAddArea} component='área' />
            <FormProvider {...methods}>
                <Table aria-label="Lista de áreas" className='mt-2'>
                    <TableHeader>
                        <TableColumn>NOMBRE</TableColumn>
                        <TableColumn>INTEGRANTES</TableColumn>
                        <TableColumn>ACCIONES</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {localAreas.map((area) => (
                            <TableRow key={area.id}>
                                <TableCell className={`${inter.className} text-black`}>{area.name}</TableCell>
                                <TableCell className={`${inter.className} text-black`}>
                                    <div className='flex gap-2'>
                                    <button className='bg-white p-1 text-bg-blue' aria-label='Ver integrantes' onClick={() => handleMembersClick(area)}>
                                        <VisibilityIcon/> Ver
                                    </button>
                                    <button className='bg-white p-1 text-green-700' aria-label='Agregar integrantes' onClick={() => handleMembersAddClick(area)}>
                                        <AddCircleIcon/> Agregar
                                    </button>
                                    </div>
                                </TableCell>
                                <TableCell className={`${inter.className}`}>
                                    <button className='bg-white p-1 text-red-700' aria-label='Eliminar área' onClick={() => handleDeleteArea(area)}>
                                        <DeleteIcon/> Eliminar área
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <ModalMembers isOpen={isModalDetalleOpen} onClose={handleCloseModalDetalle} membersByArea={membersByArea} selectedArea={selectedArea} />
                <ModalAddMembers isOpen={isModalAddOpen} onClose={handleCloseAdd} selectedArea={selectedArea} membersByArea={membersByArea} members={members} />
                <ModalAddArea isOpen={isModalAddAreaOpen} onClose={handleAddAreaClose} onAddSuccess={handleAddAreaSuccess}/>
                <ModalDeleteArea isOpen={isModalDeleteOpen} onClose={handleCloseDelete} selectedArea={selectedArea} onDeleteSuccess={handleDeleteAreaSuccess} />
            </FormProvider>
        </>
    )
}