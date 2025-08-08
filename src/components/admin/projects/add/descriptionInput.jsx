"use client"
import React from "react"
import { Textarea } from '@nextui-org/react'

const DescriptionInput = ({onChange}) => {
    return (
        <Textarea
            isRequired
            label="Descripción del proyecto"
            id="description"
            placeholder="Ingrese una descripción del proyecto"
            className='text-black'
            onChange={onChange}
        />
    )
}

export default DescriptionInput;