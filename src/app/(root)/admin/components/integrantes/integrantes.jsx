"use client"
import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { editMemberAction } from '@/actions/member';
import { useForm, FormProvider } from "react-hook-form";
import { useFormStoreMember, useMemberEditStore } from "@/app/store";
import NameLabel from './inputFirstName';
import LastNameLabel from './inputLastName';
import EmailLabel from './inputEmail';
import RoleLabel from './inputRole';
import ImageInput from './inputImage';

const inter = Inter({ subsets: ['latin'] });

export const TableIntegrantes = ({ members }) => {
  const [editing, setEditing] = useState(false);
  const methods = useForm();
  const { member, setMemberStore } = useMemberEditStore();
  const { 
    setFirstName, 
    setLastName, 
    setEmail, 
    setRoleId, 
    setFileImage, 
    setImage,
    resetForm 
  } = useFormStoreMember();

  useEffect(() => {
    if (member) {
      methods.reset({
        [`firstName-${member.id}`]: member.firstName,
        [`lastName-${member.id}`]: member.lastName,
        [`email-${member.id}`]: member.email,
        [`role-${member.id}`]: member.role.name,
        [`role-${member.id}-id`]: member.role.id,
      });
      setFirstName(member.firstName);
      setLastName(member.lastName);
      setEmail(member.email);
      setRoleId(member.role.id);
      setImage(member.s3Url);
    }
  }, [member, methods, setFirstName, setLastName, setEmail, setRoleId, setImage]);

  const onSubmit = async (data) => {
    setEditing(true);
    console.log("Form data:", data);

    if (!member) {
      console.error('No member selected for editing');
      setEditing(false);
      return;
    }

    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== '') {
        const [field, id] = key.split('-');
        
        if (field === 'role') {
          const roleId = data[`${key}-id`];
          formData.append('role', JSON.stringify({ id: roleId, name: data[key] }));
        } else if (!key.endsWith('-id')) {
          formData.append(field, data[key]);
        }
      }
    });

    if (data.image instanceof File) {
      formData.append('image', data.image);
    }

    try {
      const response = await editMemberAction(member.id, formData);
      console.log('Integrante editado', response);
      resetForm();
      setMemberStore(null);
    } catch (error) {
      console.error('Error editing member:', error);
    } finally {
      setEditing(false);
    }
  };

  const handleEditClick = (memberToEdit) => {
    setMemberStore(memberToEdit);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                <TableCell>
                  <NameLabel
                    name={`firstName-${memberItem.id}`}
                    labelFirstName="Nombre"
                    actualFirstName={memberItem.firstName}
                  />
                </TableCell>
                <TableCell>
                  <LastNameLabel
                    name={`lastName-${memberItem.id}`}
                    labelLastName="Apellido"
                    actualLastName={memberItem.lastName}
                  />
                </TableCell>
                <TableCell>
                  <EmailLabel
                    name={`email-${memberItem.id}`}
                    labelEmail="Email"
                    actualEmail={memberItem.email}
                  />
                </TableCell>
                <TableCell>
                  <RoleLabel 
                    name={`role-${memberItem.id}`}
                    labelRole="Rol"
                    actualRole={memberItem.role.name} 
                    actualRoleId={memberItem.role.id} 
                  />
                </TableCell>
                <TableCell>
                  <ImageInput 
                    name={`image-${memberItem.id}`}
                    labelImage="Imagen"
                    actualImage={memberItem.s3Url} 
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEditClick(memberItem)}
                    disabled={editing}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {member && (
          <Button
            type="submit"
            disabled={editing}
          >
            {editing ? <p>Guardando...</p> : 'Guardar Cambios'}
          </Button>
        )}
      </form>
    </FormProvider>
  );
};