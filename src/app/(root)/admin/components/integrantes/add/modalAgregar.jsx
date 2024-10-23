"use client"
import React, { useState } from 'react';
import { Modal, ModalContent } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { createMemberAction } from '@/actions/member';
import FirstNameInput from './firstNameInput';
import LastNameInput from './lastNameInput';
import EmailInput from './emailInput';
import RoleInput from './roleInput';
import ImageInput from './imageInput';
import ButtonsAction from '../../buttonsAction';

const ModalAgregar = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({}); 
    const [adding, setAdding] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [role, setRole] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const addMember = async (event) => {
        event.preventDefault();

        let newErrors = {};
        const fields = {
            firstName,
            lastName,
            email,
            role
        };

        Object.entries(fields).forEach(([key, value]) => {
            if (!value) {
                newErrors[key] = '* Este campo es obligatorio';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; 
        } else {
            setErrors({}); 
            setAdding(true);
        }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        if (role && role.id) {
            formData.append('role_id', role.id.toString());
        }

        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            await createMemberAction(formData);
            onClose();
            router.refresh();
            setErrors({});
        } catch (error) {
            console.error('Error al añadir el miembro:', error);
            setError(`Error al añadir el miembro: ${error.message}`);
        } finally {
            setAdding(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalContent>
                {(onClose) => (
                    <div className='bg-white p-6'>
                        <form onSubmit={addMember}>
                            <div className='flex flex-col md:flex-row gap-6'>
                                <div className='w-full md:w-1/3'>
                                    <ImageInput onImageSelect={(file) => setSelectedImage(file)} />
                                </div>
                                <div className='w-full md:w-2/3 flex flex-col gap-4'>
                                    <div className='flex flex-col sm:flex-row gap-4'>
                                        <div className='flex flex-col'>
                                            <FirstNameInput onChange={(e) => { setFirstName(e.target.value) }} />
                                            {errors.firstName && <p className="text-red-500 text-sm mt-2">{errors.firstName}</p>}
                                        </div>
                                        <div className='flex flex-col'>
                                            <LastNameInput onChange={(e) => { setLastName(e.target.value) }} />
                                            {errors.lastName && <p className="text-red-500 text-sm mt-2">{errors.lastName}</p>}
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <EmailInput onChange={(e) => { setEmail(e.target.value) }} />
                                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                                    </div>
                                    <div className='flex flex-col'>
                                        <RoleInput onChange={(selectedRole) => setRole(selectedRole)} />
                                        {errors.role && <p className="text-red-500 text-sm mt-2">{errors.role}</p>}
                                    </div>
                                </div>
                            </div>
                        </form>
                        <ButtonsAction
                            isLoading={adding}
                            onClose={onClose}
                            onSubmit={addMember}
                            submitLabel="Agregar integrante"
                        />
                    </div>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalAgregar;
