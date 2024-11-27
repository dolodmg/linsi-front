"use client"
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent } from '@nextui-org/react';
import ButtonsAction from '../../buttonsAction';
import { createNewsAction } from '@/actions/news';
import { useRouter } from 'next/navigation';
import TitleInput from './titleInput'
import DescriptionInput from './descriptionInput';
import ImageInput from './imageInput';
import { Inter } from 'next/font/google';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
)

const ModalAddNew = ({ isOpen, onClose, onAddSuccess }) => {

    const router = useRouter();
    const [adding, setAdding] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const addNew = async (event) => {
        event.preventDefault();

        let newErrors = {};
        const fields = {
            title,
            description,
            selectedImage
        }

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
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', selectedImage);
        try {
            const newNew = await createNewsAction(formData);
            onAddSuccess(newNew);
            onClose();
            setErrors({});
        } catch (error) {
            console.log(error);
            setError(`Error al crear el artículo: ${error.message}`);
        } finally {
            setAdding(false);
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <div className='bg-white p-6'>
                            <form onSubmit={addNew}>
                            <div className='flex flex-col md:flex-row gap-6'>
                                <div className='w-full md:w-1/3'>
                                    <ImageInput onImageSelect={(file) => setSelectedImage(file)} />
                                </div>
                                <div className='flex flex-col gap-4 w-full md:w-2/3'>
                                    <div className='w-full'>
                                        <TitleInput onChange={(e) => { setTitle(e.target.value)}} />
                                        {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
                                    </div>
                                    <div className='w-full'>
                                        <DescriptionInput onChange={(e) => { setDescription(e.target.value) }} />
                                        {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
                                    </div>
                                </div>  
                            </div>                  
                                <ButtonsAction
                                isLoading={adding}
                                onClose={onClose}
                                onSubmit={addNew}
                                submitLabel="Agregar novedad"
                                className='flex justify-end gap-2 mt-4'
                                />
                            </form>   
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAddNew;