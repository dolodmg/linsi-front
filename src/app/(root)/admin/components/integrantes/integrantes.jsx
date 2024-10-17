"use client"
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { useForm, FormProvider } from "react-hook-form";
import { useMemberEditStore } from "@/app/store";
import EditIcon from '@mui/icons-material/Edit';
import ModalEditar from './modalEditar'; 

const inter = Inter({ subsets: ['latin'] },
 { weights: ['400, 500, 600, 700'] }
);

export const TableIntegrantes = ({ members }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setMemberStore } = useMemberEditStore();
  const methods = useForm();

  const handleEditClick = (memberToEdit) => {
    setMemberStore(memberToEdit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMemberStore(null);
  };
  
  return (
    <FormProvider {...methods}>
      <Table aria-label="Example table with custom cells">
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>APELLIDO</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROL</TableColumn>
          <TableColumn>IMAGEN</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody>
          {members.map((memberItem) => (
            <TableRow key={memberItem.id}>
              <TableCell className={`${inter.className} text-black`}>{memberItem.firstName}</TableCell>
              <TableCell className={`${inter.className} text-black`}>{memberItem.lastName}</TableCell>
              <TableCell className={`${inter.className} text-black`}>{memberItem.email}</TableCell>
              <TableCell className={`${inter.className} text-black`}>{memberItem.role.name}</TableCell>
              <TableCell>
                <img src={memberItem.s3Url} 
                alt={`${memberItem.firstName} ${memberItem.lastName}`} 
                className='rounded-full w-[100px] h-[100px]'/>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEditClick(memberItem)}
                  className='bg-bg-blue'
                  size='sm'
                >
                  <EditIcon className='text-white' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalEditar isOpen={isModalOpen} onClose={handleCloseModal} />
    </FormProvider>
  );
};