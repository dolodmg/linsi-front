"use client"
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader, Divider } from '@nextui-org/react';
import { useNewsEditStore, useFormStoreNews } from '@/app/store';
import { editNewsAction } from '@/actions/news';
import Title from './titleInput';
import Description from './descriptionInput';
import Image from './imageInput';
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import ButtonsAction from '../../buttonsAction';

const inter = Inter(
    { subsets: ['latin'] },
    { weights: ['400, 500, 600, 700'] }
);

const EditModal = ({ isOpen, onClose }) => {
    const { news } = useNewsEditStore();
    const { setTitle, setDescription, setImage, title, description, image } = useFormStoreNews();
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);

    const methods = useForm({
        defaultValues: {
            title: '',
            description: '',
            image: ''
        }
    });

    useEffect(() => {
        if (news) {
            setTitle(news.title);
            setDescription(news.description);
            setImage(news.s3Url);
            methods.reset({
                title: news.title,
                description: news.description,
                image: news.s3Url
            });
        }
    }, [news, methods, setTitle, setDescription, setImage]);

    const onEdit = async (data) => {
        let newErrors = {};
        const fields = {
            title: data.title,
            description: data.description,
            image: data.image
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
            setEditing(true);
        }

        const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            if (image) {
                if (image instanceof File) {
                    formData.append('image', image);
                } else if (typeof image === 'string' && image !== news.s3Url) {
                    formData.append('image', image);
                }
            }
            
            try {
                await editNewsAction(news.id, formData);
                onClose();
                router.refresh();
                setErrors({});
            } catch (error) {
                setError(`Error al editar el artículo: ${error.message}`);
                console.error('Error al editar el artículo:', error);
            } finally {
                setEditing(false);
            }
    }   ;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className={`${inter.className} text-bg-blue text-xl`}>
                        Artículo: {news.title}
                    </ModalHeader>
                    <Divider/>
                    <ModalBody>
                        <div className='bg-white p-6'>
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onEdit)}>
                                    <div className='flex flex-col md:flex-row gap-6'>
                                        <div className='w-full md:w-1/3'>
                                            <Image name="image" defaultValue={image} />
                                        </div>
                                        <div className='flex flex-col gap-4 w-full md:w-2/3'>
                                            <div className='w-full'>
                                                <Title name="title" labelTitle="Título" defaultValue={title} />
                                                {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
                                            </div>
                                            <div className='w-full'>
                                                <Description name="description" labelDescription="Descripción" defaultValue={description}/>
                                                {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
                                            </div>           
                                        </div>
                                    </div>
                                    {error && <p className="text-red-500 mt-2">{error}</p>}
                                    <div className="flex justify-end gap-2 mt-4">
                                        <ButtonsAction
                                        isLoading={editing}
                                        onClose={onClose}
                                        submitLabel="Editar artículo"
                                        className='flex justify-end gap-2 mt-4'
                                        />
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                    </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditModal;