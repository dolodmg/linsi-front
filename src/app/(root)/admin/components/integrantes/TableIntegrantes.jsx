"use client";
import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Card } from '@nextui-org/react';
import { useForm, FormProvider } from "react-hook-form";
import { useMemberEditStore } from "@/app/store";
import EditIcon from '@mui/icons-material/Edit';
import ModalEditar from './edit/modalEditar'; 
import AddButton from '../addButton';
import DeleteButton from '../deleteButton';
import ModalAgregar from './add/modalAgregar';
import ModalDeleteMember from './delete/modalDeleteMember';

const inter = Inter({ subsets: ['latin'] },
 { weights: ['400, 500, 600, 700'] }
);

const TableIntegrantes = ({ members, onUpdateMembers }) => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [localMembers, setLocalMembers] = useState(members);
  const { setMemberStore } = useMemberEditStore();
  const methods = useForm();

  // Sincronizar localMembers cuando cambien los members desde el padre
  useEffect(() => {
    setLocalMembers(members);
  }, [members]);

  const handleEditClick = (memberToEdit) => {
    setMemberStore(memberToEdit);
    setIsModalEditOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalEditOpen(false);
    setMemberStore(null);
  };

  const handleAddClick = () => {
    setIsModalAddOpen(true);
  }

  const handleAddClose = () => {
    setIsModalAddOpen(false);
  }

  const handleDeleteModal = (memberItem) => {
    setIsModalDeleteOpen(true);
    setSelectedMember(memberItem);
}

const handleCloseDelete = () => {
    setIsModalDeleteOpen(false);
    setSelectedMember(null);
}

const handleAddMemberSuccess = (newMember) => {
  setLocalMembers((prevMembers) => [newMember, ...prevMembers]);
};

const handleEditMemberSuccess = async (updatedMember) => {
  // Actualizar el estado local inmediatamente
  setLocalMembers((prevMembers) => 
    prevMembers.map((member) => 
      member.id === updatedMember.id ? updatedMember : member
    )
  );
  
  // Opcionalmente, también actualizar desde el servidor para asegurar consistencia
  if (onUpdateMembers) {
    await onUpdateMembers();
  }
};

const handleDeleteMemberSuccess = (deletedMemberId) => {
  setLocalMembers((prevMembers) => prevMembers.filter((member) => member.id !== deletedMemberId));
}
  
  return (
    <>
    <AddButton onClick={handleAddClick} component='integrante' />
    <FormProvider {...methods}>
      {members.length > 0 ? (
        <>
          <Table aria-label="Example table with custom cells" className='mt-2'>
            <TableHeader>
              <TableColumn>NOMBRE</TableColumn>
              <TableColumn>APELLIDO</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>ROL</TableColumn>
              <TableColumn>IMAGEN</TableColumn>
              <TableColumn>ACCIONES</TableColumn>
            </TableHeader>
            <TableBody>
              {localMembers.map((memberItem) => (
                <TableRow key={memberItem.id}>
                  <TableCell className={`${inter.className} text-black`}>{memberItem.firstName}</TableCell>
                  <TableCell className={`${inter.className} text-black`}>{memberItem.lastName}</TableCell>
                  <TableCell className={`${inter.className} text-black`}>{memberItem.email}</TableCell>
                  <TableCell className={`${inter.className} text-black`}>{memberItem.role?.name}</TableCell>
                  <TableCell>
                    <img src={memberItem.s3Url} 
                    alt={`${memberItem.firstName} ${memberItem.lastName}`} 
                    className='rounded-full overflow-hidden object-cover w-[100px] h-[100px]'/>
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-1'>
                      <button
                        onClick={() => handleEditClick(memberItem)}
                        className='p-1 bg-white text-bg-blue'
                      >
                        <EditIcon fontSize='medium' />
                      </button>
                      <DeleteButton onClick={() => handleDeleteModal(memberItem)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ModalEditar isOpen={isModalEditOpen} onClose={handleCloseModal} onEditSuccess={handleEditMemberSuccess} />
          <ModalDeleteMember isOpen={isModalDeleteOpen} onClose={handleCloseDelete} selectedMember={selectedMember} onDeleteSuccess={handleDeleteMemberSuccess} />
        </>
      ) : (
        <Card className='mt-2'>
          <p className={`${inter.className} text-gray-400 text-sm px-2 py-2`}>No hay integrantes registrados</p>
        </Card>
      )}
    </FormProvider>
    <ModalAgregar isOpen={isModalAddOpen} onClose={handleAddClose} onAddSuccess={handleAddMemberSuccess}/>
    </>
  );
};

export default TableIntegrantes; 