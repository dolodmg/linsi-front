"use client"
import React from 'react'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import { Inter } from 'next/font/google'
import { TableIntegrantes } from './integrantes/page'
import { TableProyectos } from './proyectos/page'
import { TableAreas } from './areas/page'
import { TableNovedades } from './novedades/page'

const inter = Inter(
    {subsets: ['latin']},
    {weight: '400'}
)

export const TabsComponent = ({ members, projects, areas, news, membersByProject, areasByProject, membersByArea }) => {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" color='primary'>
                <Tab key="integrantes" title="Integrantes">
                    <TableIntegrantes members={members}/>
                </Tab>
                <Tab key="proyectos" title="Proyectos">
                    <TableProyectos projects={projects} membersByProject={membersByProject} areasByProject={areasByProject} members={members} areas={areas}/>
                </Tab>
                <Tab key="novedades" title="Novedades">
                    <TableNovedades news={news}/> 
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