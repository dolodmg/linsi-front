'use client';
import { CIcon } from '@coreui/icons-react';
import { cilImagePlus } from '@coreui/icons';
import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

const ImageInput = ({ actualImage }) => {
    const { control, setValue } = useFormContext();
    const [imageName, setImageName] = useState('');
    const [image, setImage] = useState(actualImage);

    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            setImageName(file.name);
        }
    };

    return (
        <>
            <label htmlFor='image'>Imagen</label>
            <div className='flex items-center'>
                <input
                    type='file'
                    id='image'
                    name='image'
                    accept='image/*'
                    className='hidden'
                    onChange={imageHandler}
                />
                <label htmlFor='image' className='cursor-pointer'>
                    <CIcon icon={cilImagePlus} />
                </label>
                <span className='ml-2'>{imageName}</span>
            </div>
            {image && (
                <img src={image} alt='Imagen' className='w-20 h-20 object-cover rounded-full' />
            )}
        </>
    );
};

export default ImageInput;
