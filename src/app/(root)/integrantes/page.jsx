"use client"
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { RoleName } from './components/roleName';
import { getMembersAction } from '@/actions/member';
import { getRolesAction } from '@/actions/role';
import { Divider } from '@nextui-org/react';
import { LinkInicio } from '@/app/components/linkInicio';

const Integrantes = () => {
    const [roles, setRoles] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await getRolesAction();
                setRoles(rolesData);
            } catch (err) {
                console.log('Error al obtener roles', error);
            } finally {
                setLoading(false);
            }   
        };
        fetchRoles();
    }, []);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersData = await getMembersAction();
                console.log(membersData);
                setMembers(membersData);
            } catch (err) {
                console.log('Error al obtener integrantes', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    if (loading) return <p>Cargando...</p>;

    return (
        <div className='flex flex-col bg-bg-light-grey'>
            <Header headerName="INTEGRANTES" />
            <div className='mx-8 mb-4'>
                <LinkInicio/>
                <Divider/>
                <div className='flex flex-col justify-center items-center'>
                    <RoleName roles={roles} members={members}/>
                </div>
            </div>
        </div>
    )
}

export default Integrantes;