"use client"
import React, { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Select, SelectItem } from '@nextui-org/react';
import { getRolesAction } from '@/actions/role';
import { useFormStoreMember } from '@/app/store';

const RoleLabel = ({ name, labelRole, placeholder, defaultValue }) => {
  const { formState: { errors }, control } = useFormContext();
  const { setRoleId } = useFormStoreMember();
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

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className='w-full'>
          <Select
            {...field}
            placeholder={placeholder}
            label={labelRole}
            className='w-1/2 text-black'
            aria-label="Seleccionar rol"
            isInvalid={!!errors[name]}
            errorMessage={errors[name]?.message}
            onChange={(e) => {
              field.onChange(e);
              setRoleId(e.target.value);
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
      )}
    />
  );
};

export default RoleLabel;