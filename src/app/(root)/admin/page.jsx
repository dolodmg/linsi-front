"use client"
import React, { useEffect, useState } from 'react';
import { TabsComponent } from './components/tabs';
import { User } from './components/user';
import { getMembersAction } from '@/actions/member';

const Admin = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersData = await getMembersAction();
                console.log(membersData);
                setMembers(membersData);
            } catch (error) {
                console.log('Error al obtener integrantes', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className='flex flex-col mx-8'>
            <User />
            <TabsComponent members={members} />
        </div>
    );
};

export default Admin;
