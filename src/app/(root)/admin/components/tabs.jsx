"use client"
import React from 'react'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import { Inter } from 'next/font/google'
import { TableIntegrantes } from './integrantes/page'
import { TableProyectos } from './proyectos/page'
import { TableAreas } from './areas/page'

const inter = Inter(
    {subsets: ['latin']},
    {weight: '400'}
)

export const TabsComponent = ({ members, projects, areas, membersByProject, areasByProject, membersByArea }) => {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" color='primary'>
                <Tab key="integrantes" title="Integrantes">
                    <TableIntegrantes members={members}/>
                </Tab>
                <Tab key="proyectos" title="Proyectos">
                    <TableProyectos projects={projects} membersByProject={membersByProject} areasByProject={areasByProject}/>
                </Tab>
                <Tab key="novedades" title="Novedades">
                <Card>
                    <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </CardBody>
                </Card>  
                </Tab>
                <Tab key="areas" title="Áreas">
                    <TableAreas areas={areas} membersByArea={membersByArea} members={members}/>
                </Tab>
                <Tab key="inscripciones" title="Inscripciones">
                <Card>
                    <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </CardBody>
                </Card>  
            </Tab>
        </Tabs>
    </div>  
    )
}