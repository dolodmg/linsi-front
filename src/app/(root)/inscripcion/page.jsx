"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Header } from '../../components/header';
import { FormContainer } from './components/form-container';
import { SelectField } from './components/select-field';
import { SubmitButton } from './components/submit-button';
import { AreasDropdown } from './components/areasdropdown';
import { createInscriptionAction } from '@/actions/inscription'; 
import FirstNameInput from './components/firstName';
import LastNameInput from './components/lastName';
import DniInput from './components/dni';
import EmailInput from './components/email';
import FileInput from './components/file';

const Inscripcion = () => {
    const router = useRouter();
    const [adding, setAdding] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [file, setFile] = useState('');
    const [universityYear, setUniversityYear] = useState('');
    const [email, setEmail] = useState('');
    const [area_id, setAreaId] = useState('');


    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const addInscription = async (event) => {
        event.preventDefault();

        let newErrors = {};
        const fields = {
            firstName,
            lastName,
            dni,
            file,
            universityYear,
            email,
            area_id
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
        formData.append('dni', dni);
        formData.append('file', file);
        formData.append('universityYear', universityYear);
        formData.append('email', email);
        formData.append('area_id', area_id);

        try {
            const newInscription = await createInscriptionAction(formData);
            router.push('/'); 
            setErrors({});
        } catch (error) {
            console.error(error);
            setError(`Error al crear la inscripción: ${error.message}`);
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className='flex flex-col'>
            <Header headerName="INSCRIPCIÓN" />
            <FormContainer>
            <div className='flex flex-col xs:mx-4 sm:ml-8 xs:gap-4 sm:gap-8 mt-4 mb-4 items-center'>
                    {error && (
                        <div className="text-red-500 mb-4">
                            {error}
                        </div>
                    )}
                    <div className='flex xs:flex-col sm:flex-row xs:gap-4 sm:gap-8 mb-4'>
                        <div className="flex flex-col">
                            <FirstNameInput onChange={(e) => setFirstName(e.target.value)} />
                            {errors.firstName && <p className="text-red-500 text-sm mt-2">{errors.firstName}</p>}
                        </div>
                        <div className="flex flex-col">
                            <LastNameInput onChange={(e) => setLastName(e.target.value)} />
                            {errors.lastName && <p className="text-red-500 text-sm mt-2">{errors.lastName}</p>}
                        </div>
                        <div className="flex flex-col">
                            <DniInput onChange={(e) => setDni(e.target.value)} />
                            {errors.dni && <p className="text-red-500 text-sm mt-2">{errors.dni}</p>}
                        </div>
                    </div>
                    <div className='flex xs:flex-col sm:flex-row xs:gap-4 sm:gap-8 mb-4'>
                        <div className="flex flex-col">
                            <SelectField 
                                value={universityYear}
                                onChange={(e) => setUniversityYear(e.target.value)}
                            />
                            {errors.universityYear && <p className="text-red-500 text-sm mt-2">{errors.universityYear}</p>}
                        </div>
                        <div className="flex flex-col">
                            <EmailInput onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                        </div>
                        <div className="flex flex-col">
                            <FileInput onChange={(e) => setFile(e.target.value)} />
                            {errors.file && <p className="text-red-500 text-sm mt-2">{errors.file}</p>}
                        </div>
                    </div>
                    <div className='flex xs:flex-col sm:flex-row xs:gap-4 sm:gap-8 mb-4'>
                        <div className="flex flex-col">
                            <AreasDropdown 
                                value={area_id}
                                onChange={(e) => setAreaId(e.target.value)}
                            />
                            {errors.area_id && <p className="text-red-500 text-sm mt-2">{errors.area_id}</p>}
                        </div>
                    </div>
                </div>

                <SubmitButton 
                    onClick={addInscription} 
                    loading={adding}
                />
            </FormContainer>
        </div>
    );
};

export default Inscripcion;