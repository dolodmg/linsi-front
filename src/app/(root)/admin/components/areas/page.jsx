"use client"
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { useForm, FormProvider } from "react-hook-form";
import ModalMembers from './modalMembers';
import ModalAddMembers from './add/modalAddMembers';
import AddButton from '../addButton';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

export const TableAreas = ({ areas, membersByArea, members }) => {
    const methods = useForm();
    const [isModalDetalleOpen, setIsModalDetalleOpen] = useState(false);
    const [selectedArea, setSelectedArea] = useState(null);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    
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

    return (
        <FormProvider {...methods}>
            <Table area-label="Lista de áreas">
                <TableHeader>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>INTEGRANTES</TableColumn>
                    <TableColumn>ACCIONES</TableColumn>
                </TableHeader>
                <TableBody>
                    {areas.map((area) => (
                        <TableRow key={area.id}>
                            <TableCell className={`${inter.className} text-black`}>{area.name}</TableCell>
                            <TableCell className={`${inter.className} text-black`}>
                                <Button className='bg-bg-blue text-white' size='md' aria-label='Ver integrantes' onClick={() => handleMembersClick(area)}>
                                    Ver integrantes
                                </Button>
                            </TableCell>
                            <TableCell className={`${inter.className} text-black`}>
                                <AddButton component='integrantes' onClick={() => handleMembersAddClick(area)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ModalMembers isOpen={isModalDetalleOpen} onClose={handleCloseModalDetalle} membersByArea={membersByArea} selectedArea={selectedArea} />
            <ModalAddMembers isOpen={isModalAddOpen} onClose={handleCloseAdd} selectedArea={selectedArea} membersByArea={membersByArea} members={members} />
        </FormProvider>
    )
}