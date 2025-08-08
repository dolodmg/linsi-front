'use client'
import React from 'react';
import { Bree_Serif } from 'next/font/google';
import { MemberContainer } from './memberContainer';
import { Skeleton } from '@/components/ui/skeleton';

const bree = Bree_Serif({
    subsets: ['latin'],
    weight: ['400']
})

export const RoleName = ({ roles, members, areasByMember, loading }) => {
    if (loading) {
        return (
            <div className="flex flex-col items-center gap-6">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-4">
                        <Skeleton className="h-6 w-40 mt-4" />
                        <MemberContainer loading />
                    </div>
                ))}
            </div>
        );
    }
    return (
        <>
            {roles.length > 0 ? (
                roles.map((role) => {
                    const filteredMembers = members.filter(member => member.role.id === role.id);
                    return (
                        <div key={role.id} className='flex flex-col items-center justify-center'>
                            <h1 className={`${bree.className} text-xl text-bg-blue mt-4`}>
                                {role.name === 'Becario' ? 
                                'Becarios' : role.name} 
                            </h1>
                            <MemberContainer members={filteredMembers} areasByMember={areasByMember} loading={loading}/>
                        </div>
                    );
                })
            ) : (
                <p className='text-lg text-bg-blue'>No hay roles</p>
            )}
        </>
    );
}