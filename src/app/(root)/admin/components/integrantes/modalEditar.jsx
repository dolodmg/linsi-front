"use client"
import React, { useState, useEffect, memo } from 'react';
import { Modal, ModalContent, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useMemberEditStore, useFormStoreMember } from '@/app/store';
import { editMemberAction } from '@/actions/member';
import NameLabel from './inputFirstName';
import LastNameLabel from './inputLastName';
import EmailLabel from './inputEmail';
import RoleLabel from './inputRole';
import ImageInput from './inputImage';
import { useForm, FormProvider } from "react-hook-form";
import ButtonsEditar from './buttonsEditar';

const ModalEditar = ({ isOpen, onClose }) => {
    const { member } = useMemberEditStore();
    const { 
        firstName, lastName, email, roleId, image,
        setFirstName, setLastName, setEmail, setRoleId, setImage
    } = useFormStoreMember();
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);
    const methods = useForm();
    const [fileImage, setFileImage] = useState(null);

    useEffect(() => {
        if (member) {
            setFirstName(member.firstName);
            setLastName(member.lastName);
            setEmail(member.email);
            setRoleId(member.role.id);
            setImage(member.s3Url);
            
            methods.reset({
                firstName: member.firstName,
                lastName: member.lastName,
                email: member.email,
                role: member.role.name,
                roleId: member.role.id,
                image: member.s3Url
            });
        }
    }, [member, methods, setFirstName, setLastName, setEmail, setRoleId, setImage]);

    const onEdit = async (data) => {
        setEditing(true);
        setError(null);
        const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('role_id', data.roleId);
    
        if (image) {
            if (image instanceof File) {
                formData.append('image', image);
            } else if (typeof image === 'string' && image !== member.s3Url) {
                formData.append('image', image);
            }
        }

        try {
            await editMemberAction(member.id, formData);
            onClose();
            router.refresh();
        } catch (error) {
            console.error('Error al editar el miembro:', error);
            setError(`Error al editar el miembro: ${error.message}`);
        } finally {
            setEditing(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalContent>
                {(onClose) => (
                    <div className='bg-white p-6'>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onEdit)}>
                                <div className='flex flex-col md:flex-row gap-6'>
                                <div className='w-full md:w-1/3'>
                                        <ImageInput name="image" defaultValue={image} />
                                    </div>
                                    <div className='w-full md:w-2/3 flex flex-col gap-4'>
                                        <div className='flex flex-col sm:flex-row gap-4'>
                                            <NameLabel name="firstName" labelFirstName="Nombre" defaultValue={firstName} />
                                            <LastNameLabel name="lastName" labelLastName="Apellido" defaultValue={lastName} />
                                        </div>
                                        <EmailLabel name="email" labelEmail="Email" defaultValue={email} />
                                        <RoleLabel name="role" labelRole="Rol" placeholder={member?.role?.name} defaultValue={member?.role?.name}/>
                                    </div>
                                    {error && <p className="text-red-500">{error}</p>}
                                </div>
                                <ButtonsEditar editing={editing} onClose={onClose} />
                            </form>
                        </FormProvider>
                    </div>    
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalEditar;