"use client"
import React from 'react';
import { Header } from '../../components/header';
import { FormContainer } from './components/form-container';
import { InputField } from './components/input-field';
import { SelectField } from './components/select-field';
import { SubmitButton } from './components/submit-button';
import { CheckboxField } from './components/checkbox-field';

const Inscripcion = () => {
    return (
        <div className='flex flex-col'>
            <Header headerName="INSCRIPCIÓN" />
            <FormContainer>
                <div className='flex flex-col xs:mx-4 sm:ml-8 xs:gap-4 sm:gap-8 mt-4 mb-4'>
                    <div className='flex xs:flex-col sm:flex-row xs:gap-4 sm:gap-8'>
                        <InputField label="Nombre" type="name" placeholder="Juan" />
                        <InputField label="Apellido" type="name" placeholder="Perez" />
                    </div>
                    <div className='flex xs:flex-col sm:flex-row xs:gap-4 sm:gap-8'>
                        <InputField label="DNI" type="number" placeholder="22111000" />
                        <InputField label="Legajo" type="number" placeholder="31000" />
                    </div>
                    <div className='flex xs:flex-col sm:flex-row xs:gap-4 sm:gap-8'>
                        <SelectField />
                        <InputField label="Email" type="email" placeholder="juanperez@gmail.com" />
                    </div>
                    <CheckboxField />
                </div>
                <SubmitButton label="Enviar" />
            </FormContainer>
        </div>
    )
}

export default Inscripcion;