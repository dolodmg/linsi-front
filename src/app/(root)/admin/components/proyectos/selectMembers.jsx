"use client"
import React, { useEffect, useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';

const SelectMembers = ({ selectedMembers, availableMembers, handleSelectionChange  }) => {
    return (
        <Select
            label='Integrantes'
            placeholder='Seleccioná los integrantes'
            selectionMode='multiple'
            selectedKeys={selectedMembers}
            onSelectionChange={handleSelectionChange}
            value={selectedMembers}
            aria-label='Seleccionar integrantes'
            className='text-black'>
            {availableMembers.map((member) => (
                <SelectItem 
                    key={member.id} 
                    value={member.id.toString()}
                    textValue={`${member.firstName} ${member.lastName}`} 
                    className='text-black'
                    aria-label='Integrante(s) seleccionado(s)'
                >
                    {member.firstName} {member.lastName}
                </SelectItem>
            ))}
        </Select>
    )
}

export default SelectMembers;