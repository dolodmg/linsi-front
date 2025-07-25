"use client"
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Card } from '@nextui-org/react';
import { useForm, FormProvider } from "react-hook-form";
import ModalAddMembers from './add/modalAddMembers';
import ModalAddArea from './add/modalAddArea';
import ModalDeleteArea from './delete/modalDeleteArea';
import AddButton from '../addButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const TableAreas = ({ areas, membersByArea, members }) => {
    const methods = useForm();
    const [localAreas, setLocalAreas] = useState(areas);
    const [selectedArea, setSelectedArea] = useState(null);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalAddAreaOpen, setIsModalAddAreaOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

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
                {areas.length > 0 ? (
                    <>
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
                                            <div className='flex'>
                                                <button className='bg-white p-1 text-bg-blue' aria-label='Modificar' onClick={() => handleMembersAddClick(area)}>
                                                    <EditIcon fontSize='small'/> Modificar
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
                        <ModalAddMembers isOpen={isModalAddOpen} onClose={handleCloseAdd} selectedArea={selectedArea} membersByArea={membersByArea} members={members} />
                        <ModalDeleteArea isOpen={isModalDeleteOpen} onClose={handleCloseDelete} selectedArea={selectedArea} onDeleteSuccess={handleDeleteAreaSuccess} />
                    </>
                ) : (
                    <Card className='mt-2'>
                        <p className={`${inter.className} text-gray-400 text-sm px-2 py-2`}>No hay áreas registradas</p>
                    </Card>
                )}
            </FormProvider>
            <ModalAddArea isOpen={isModalAddAreaOpen} onClose={handleAddAreaClose} onAddSuccess={handleAddAreaSuccess}/>
        </>
    )
}

export default TableAreas; 