'use client'
import React from 'react';
import { Bree_Serif } from 'next/font/google';
import { MemberContainer } from './memberContainer';

const bree = Bree_Serif({
    subsets: ['latin'],
    weight: ['400']
})

export const RoleName = ({ roles, members }) => {
    return (
        <>
            {roles.length > 0 ? (
                roles.map((role) => {
                    const filteredMembers = members.filter(member => member.role.id === role.id);
                    return (
                        <div key={role.id} className='flex flex-col items-center justify-center'>
                            <h1 className={`${bree.className} text-xl text-bg-blue mt-4`}>{role.name}</h1>
                            <MemberContainer members={filteredMembers} />
                        </div>
                    );
                })
            ) : (
                <p className='text-lg text-bg-blue'>No hay roles</p>
            )}
        </>
    );
}
