"use client";
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Card } from '@nextui-org/react';
import ModalDetalle from './detailModal';
import ModalStatusChange from './statusModal';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const inter = Inter({ subsets: ['latin'] },
    { weights: ['400', '500', '600', '700'] }
   );

const TableInscripciones = ( { inscriptions } ) => {
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedInscription, setSelectedInscription] = useState(null);
    const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);

    const handleDetail = (inscriptItem) => {
        setIsModalDetailOpen(true);
        setSelectedInscription(inscriptItem);
    }

    const handleDetailClose = () => {
        setIsModalDetailOpen(false);
        setSelectedInscription(null);
    }

    const handleStatusChange = (inscriptItem) => {
        setIsModalStatusOpen(true);
        setSelectedInscription(inscriptItem);
    }

    const handleStatusClose = () => {
        setIsModalStatusOpen(false);
        setSelectedInscription(null);
    }

    return (
        <>
            {inscriptions.length > 0 ? (
                <>
                    <Table aria-label="Example table with custom cells" className='mt-2'>
                        <TableHeader>
                        <TableColumn>NOMBRE Y APELLIDO</TableColumn>
                        <TableColumn>EMAIL</TableColumn>
                        <TableColumn>LEGAJO</TableColumn>
                        <TableColumn>ÁREA</TableColumn>
                        <TableColumn>MÁS INFORMACIÓN</TableColumn>
                        <TableColumn>ESTADO INSCRIPCIÓN</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {inscriptions.map((inscriptItem) => (
                                <TableRow key={inscriptItem.id}>
                                    <TableCell className={`${inter.className} text-black`}>{inscriptItem.firstName} {inscriptItem.lastName}</TableCell>
                                    <TableCell className={`${inter.className} text-black`}>{inscriptItem.email}</TableCell>
                                    <TableCell className={`${inter.className} text-black`}>{inscriptItem.file}</TableCell>
                                    <TableCell className={`${inter.className} text-black`}>{inscriptItem.area.name}</TableCell>
                                    <TableCell className={`${inter.className} `}>
                                        <Button
                                            className="bg-bg-blue text-white text-sm"
                                            onClick={() => handleDetail(inscriptItem)}
                                        >
                                            Ver detalle
                                        </Button>
                                    </TableCell>
                                    <TableCell className={`${inter.className}`}>
                                        <Button
                                        onClick={() => handleStatusChange(inscriptItem)}
                                        className='bg-[#e36646] text-white'>
                                            <ChangeCircleIcon fontSize='small' />
                                            <p>Pendiente</p> 
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ModalDetalle isOpen={isModalDetailOpen} onClose={handleDetailClose} selectedInscription={selectedInscription}/>
                    <ModalStatusChange isOpen={isModalStatusOpen} onClose={handleStatusClose} selectedInscription={selectedInscription} />
                </>
            ) : ( 
                    <Card>
                        <p className={`${inter.className} text-gray-400 text-sm px-2 py-2`}>No hay inscripciones registradas</p>
                    </Card>
                )}
        </>
    )
}

export default TableInscripciones; 