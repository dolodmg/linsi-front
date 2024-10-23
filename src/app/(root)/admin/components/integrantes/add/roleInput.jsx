"use client"
import React, { useState, useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { getRolesAction } from '@/actions/role';

const RoleInput = ({ onChange }) => {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
          try {
            const rolesData = await getRolesAction();
            setRoles(rolesData || []);
          } catch (error) {
            console.error("Error fetching roles:", error);
            setError('Error al cargar los roles');
          }
        };
        fetchRoles();
    }, []);

    const handleRoleChange = (selectedRoleId) => {
      const selectedRole = roles.find(role => role.id.toString() === selectedRoleId.toString());
      onChange(selectedRole);
  };

    return (
        <div className='w-full'>
          <Select
            placeholder="Seleccionar rol"
            label="Rol"
            className='w-1/2 text-black'
            aria-label="Seleccionar rol"
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0];
              handleRoleChange(selectedId);
            }}
          >
            {roles.map((rol) => (
              <SelectItem key={rol.id} value={rol.id} className='text-black'>
                {rol.name}
              </SelectItem>
            ))}
          </Select>
          {error && <p className='text-red-500 mt-2 text-xs'>{error}</p>}
        </div>
    );
};

export default RoleInput;