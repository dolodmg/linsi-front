"use client";
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Card } from '@nextui-org/react';
import { useForm, FormProvider } from "react-hook-form";
import { format, parseISO } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteButton from '../deleteButton';
import AddButton from '../addButton';
import { useNewsEditStore } from '@/app/store';
import ModalAddNew from './add/addModal';
import EditModal from './edit/editModal';
import ModalDeleteNew from './delete/deleteModal';
import DetailModal from './detailModal';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const TableNovedades = ({ news }) => {
    const methods = useForm();
    const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedNew, setSelectedNew] = useState(null);
    const [localNews, setLocalNews] = useState(news);
    
    const { setNewsStore } = useNewsEditStore();

    const handleEditClick = (newsToEdit) => {
        setNewsStore(newsToEdit);
        setIsModalEditarOpen(true);    
    };

    const handleCloseEdit = () => {
        setIsModalEditarOpen(false);   
    };

    const handleDetailClick = (newsItem) => {
        setIsModalDetailOpen(true);
        setSelectedNew(newsItem);
    }

    const handleCloseDetail = () => {
        setIsModalDetailOpen(false);
        setSelectedNew(null);
    }

    const handleDeleteModal = (newsItem) => {
        setIsModalDeleteOpen(true);
        setSelectedNew(newsItem);
    }

    const handleCloseDelete = () => {
        setIsModalDeleteOpen(false);
        setSelectedNew(null);
    }

    const handleAddNew = () => {
        setIsModalAddOpen(true);
    }

    const handleCloseAdd = () => {
        setIsModalAddOpen(false);
    }

    const handleAddNewSuccess = (newNew) => {
        setLocalNews((prevNews) => [newNew, ...prevNews]);
    }; 

    const handleDeleteNewSuccess = (deletedNewId) => {
        setLocalNews((prevNews) => prevNews.filter((newsItem) => newsItem.id !== deletedNewId));
    }
    
    return (
        <>
        <AddButton onClick={handleAddNew} component="novedad" />
        <FormProvider {...methods}>
            {news.length > 0 ? (
                <>
                    <Table aria-label="Lista de novedades" className='mt-2'>
                        <TableHeader>
                            <TableColumn>TÍTULO</TableColumn>
                            <TableColumn>FECHA DE PUBLICACIÓN</TableColumn>
                            <TableColumn>MÁS INFORMACIÓN</TableColumn>
                            <TableColumn>ACCIONES</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {localNews.map((newsItem) => (
                                <TableRow key={newsItem.id}>
                                    <TableCell className={`${inter.className} text-black`}>{newsItem.title}</TableCell>
                                    <TableCell className={`${inter.className} text-black`}>
                                    {newsItem.publicationDate 
                                    ? format(new Date(newsItem.publicationDate), 'dd/MM/yyyy HH:mm')
                                    : 'Fecha no disponible'}
                                    </TableCell>
                                    <TableCell className={`${inter.className} text-black`}>
                                    <Button className='bg-bg-blue text-white' size='md' onClick={() => handleDetailClick(newsItem)}>
                                        Ver detalle
                                    </Button>
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex gap-1'>
                                            <button
                                            onClick={() => handleEditClick(newsItem)}
                                            className='p-1 bg-white text-bg-blue'>
                                                <EditIcon />
                                            </button>
                                            <DeleteButton onClick={() => handleDeleteModal(newsItem)} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <EditModal isOpen={isModalEditarOpen} onClose={handleCloseEdit} />
                    <ModalDeleteNew isOpen={isModalDeleteOpen} onClose={handleCloseDelete} selectedNew={selectedNew} onDeleteSuccess={handleDeleteNewSuccess} />
                    <DetailModal isOpen={isModalDetailOpen} onClose={handleCloseDetail} selectedNew={selectedNew} />
                </>
            ) : (
                <Card className='mt-2'>
                    <p className={`${inter.className} text-gray-400 text-sm px-2 py-2`}>No hay novedades registradas</p>
              </Card>
            )}
        </FormProvider>
        <ModalAddNew isOpen={isModalAddOpen} onClose={handleCloseAdd} onAddSuccess={handleAddNewSuccess} />
    </>
    )
}

export default TableNovedades; 