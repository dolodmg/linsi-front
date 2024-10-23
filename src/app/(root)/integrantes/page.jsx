"use client"
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { RoleName } from './components/roleName';
import { getMembersAction } from '@/actions/member';
import { getRolesAction } from '@/actions/role';
import { getAreasByMemberAction } from '@/actions/area_member';
import { Divider } from '@nextui-org/react';
import { LinkInicio } from '@/app/components/linkInicio';

const Integrantes = () => {
    const [roles, setRoles] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [areasByMember, setAreasByMember] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [rolesData, membersData] = await Promise.all([
                    getRolesAction(),
                    getMembersAction()
                ]);
                setRoles(rolesData);
                setMembers(membersData);

                const newAreas = {};
                for (const member of membersData) {
                    try {
                        const memberAreas = await getAreasByMemberAction(member.id);
                        newAreas[member.id] = memberAreas || [];
                    } catch (areaError) {
                        console.error(`Error al obtener áreas para miembro ${member.id}:`, areaError);
                        newAreas[member.id] = [];
                    }
                }
                setAreasByMember(newAreas);
            } catch (err) {
                console.error('Error al obtener datos', err);
                setError('Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='flex flex-col bg-bg-light-grey'>
            <Header headerName="INTEGRANTES" />
            <div className='mx-8 mb-4'>
                <LinkInicio/>
                <Divider/>
                <div className='flex flex-col justify-center items-center'>
                    <RoleName roles={roles} members={members} areasByMember={areasByMember}/>
                </div>
            </div>
        </div>
    )
}

export default Integrantes;