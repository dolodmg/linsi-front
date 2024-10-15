"use client"
import React from 'react';
import { Header } from '../../components/header';
import { Divider } from '@nextui-org/react';
import { Bree_Serif } from 'next/font/google';
import { ProjectContainer } from './components/projectContainer';
import { LinkInicio } from '@/app/components/linkInicio';


const bree = Bree_Serif({
    subsets: ['latin'],
    weight: ['400']
})

const Proyectos = () => {
    return (
        <div className='bg-bg-light-grey'>
            <Header headerName="PROYECTOS"/>
            <div className='mx-8 mb-4'>
                <LinkInicio/>
                <Divider/>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className={`${bree.className} text-bg-blue text-2xl`}>
                        Proyectos en desarrollo
                    </h1>
                    <div className='w-3/4 my-2'>
                    <ProjectContainer/>
                    </div>
                    <h1 className={`${bree.className} text-bg-blue text-2xl`}>
                        Proyectos finalizados
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Proyectos;