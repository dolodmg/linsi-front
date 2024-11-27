"use client"
import React from "react"
import { Textarea } from '@nextui-org/react'

const DescriptionInput = ({onChange}) => {
    return (
        <Textarea
            isRequired
            label="Descripción de la novedad"
            id="description"
            placeholder="Ingrese una descripción para la novedad"
            className='text-black'
            onChange={onChange}
        />
    )
}

export default DescriptionInput;