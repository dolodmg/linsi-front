"use client"
import React from 'react'
import { Tabs, Tab } from '@nextui-org/react'
import { Inter } from 'next/font/google'
import TableIntegrantes from './integrantes/TableIntegrantes'
import TableProyectos from './proyectos/TableProyectos'
import TableAreas from './areas/TableAreas'
import TableNovedades from './novedades/TableNovedades'
import TableInscripciones from './inscripciones/TableInscripciones'

export const TabsComponent = ({ members, projects, areas, news, inscriptions, membersByProject, areasByProject, membersByArea, onUpdateProjectAreas, onUpdateProjectMembers, onUpdateAreasAndMembers, onUpdateAreaMembers, onUpdateMembers }) => {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" color='primary'>
                <Tab key="integrantes" title="Integrantes">
                    <TableIntegrantes members={members} onUpdateMembers={onUpdateMembers}/>
                </Tab>
                <Tab key="proyectos" title="Proyectos">
                    <TableProyectos 
                        projects={projects} 
                        membersByProject={membersByProject} 
                        areasByProject={areasByProject} 
                        members={members} 
                        areas={areas}
                        onUpdateProjectAreas={onUpdateProjectAreas}
                        onUpdateProjectMembers={onUpdateProjectMembers}
                        onUpdateAreasAndMembers={onUpdateAreasAndMembers}
                    />
                </Tab>
                <Tab key="novedades" title="Novedades">
                    <TableNovedades news={news}/> 
                </Tab>
                <Tab key="areas" title="Áreas">
                    <TableAreas 
                        areas={areas} 
                        membersByArea={membersByArea} 
                        members={members}
                        onUpdateAreaMembers={onUpdateAreaMembers}
                        onUpdateAreasAndMembers={onUpdateAreasAndMembers}
                    />
                </Tab>
                <Tab key="inscripciones" title="Inscripciones">
                    <TableInscripciones inscriptions={inscriptions}/>
            </Tab>
        </Tabs>
    </div>  
    )
}