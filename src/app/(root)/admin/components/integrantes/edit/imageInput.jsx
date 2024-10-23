'use client';
import { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useFormStoreMember } from '@/app/store';
import { Button } from '@nextui-org/react';

const ImageInput = ({ name, labelImage, defaultValue }) => {
    const { control, setValue } = useFormContext();
    const { setFileImage, setImage } = useFormStoreMember();
    const [imageName, setImageName] = useState('');
    const [previewImage, setPreviewImage] = useState(defaultValue);

    useEffect(() => {
        setPreviewImage(defaultValue);
    }, [defaultValue]);

    const imageHandler = (e, onChange) => {
        const file = e.target.files[0];
        if (file) {
            onChange(file);
            setFileImage(file);
            setImage(file); 
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setImageName(file.name);
        } else {
            onChange(defaultValue);
            setFileImage(null);
            setImage(defaultValue);
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, value, ...field } }) => (
                <>
                    <div className='w-[200px] h-[200px] overflow-hidden'>
                        {previewImage && (
                            <img src={previewImage} 
                            alt='Imagen' 
                            className='w-full h-full rounded-md object-cover'/>
                        )}
                    </div>
                    <div className='flex flex-col items-center'>
                        <input
                            type='file'
                            id={name}
                            accept='image/*'
                            className='hidden'
                            onChange={(e) => imageHandler(e, onChange)}
                            {...field}
                        />
                        <Button className='bg-gray-300 text-gray-700 mt-2'>
                            <label htmlFor={name} className='cursor-pointer'>
                                Elegir imagen
                            </label>
                        </Button>
                        <label className="text-sm text-slate-500 mt-2">
                            {imageName ? imageName : "Ningún archivo seleccionado"}
                        </label>
                    </div>
                </>
            )}
        />
    );
};

export default ImageInput;