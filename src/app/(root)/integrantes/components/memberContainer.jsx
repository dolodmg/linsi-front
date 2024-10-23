"use client"
import React from 'react';
import { Card, CardHeader, Divider } from '@nextui-org/react';
import { Inter } from 'next/font/google';

const inter = Inter(
    {subsets: ['latin']},
    {weight: '400'});

export const MemberContainer = ({ members, areasByMember }) => {
    if (!members || members.length === 0) {
        return (
            <div className='max-w-4xl flex flex-row items-center w-2/3 mt-16'>
                <img 
                    src="/images/globito2.png" 
                    alt="No hay publicaciones" 
                    className="w-48 h-48 object-cover ml-auto" 
                />
                <p className="text-gray-600 text-2xl">Aún no hay integrantes</p>
            </div>
        );
    }

    return (
        <div>
            {members.map((member) => (
                <div key={member.id} className="w-full mt-4">
                    <Card className="xs:max-w-[400px] md:w-[600px] lg:max-w-[600px]">
                        <CardHeader className="flex gap-3">
                            <div className='w-[80px] h-[80px] overflow-hidden'>
                                <img
                                    className='object-cover w-full h-full rounded-full'
                                    alt="Imagen del integrante"
                                    src={member.s3Url || '/default-avatar.png'}
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className={`${inter.className} text-md text-black font-medium`}>
                                    {member.firstName} {member.lastName}
                                </p>
                                {areasByMember && areasByMember[member.id] ? (
                                    <p className={`${inter.className} text-small text-default-500`}>
                                        Área de {areasByMember[member.id].map(area => area.name).join(', Área de ')}
                                    </p>
                                ) : (
                                    <p className={`${inter.className} text-small text-default-500`}>
                                        Áreas no disponibles
                                    </p>
                                )}
                                
                            </div>
                        </CardHeader>
                        <Divider/>
                    </Card>
                </div>
            ))}
        </div>
    );
}