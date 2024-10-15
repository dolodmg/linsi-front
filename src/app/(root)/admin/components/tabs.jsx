"use client"
import React from 'react'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import { Inter } from 'next/font/google'
import { TableIntegrantes } from './integrantes/integrantes'

const inter = Inter(
    {subsets: ['latin']},
    {weight: '400'}
)


export const TabsComponent = ({ members }) => {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" color='primary'>
                <Tab key="integrantes" title="Integrantes">
                    <TableIntegrantes members={members}/>
                </Tab>
                <Tab key="proyectos" title="Proyectos">
                <Card>
                    <CardBody>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </CardBody>
                </Card>  
                </Tab>
                <Tab key="novedades" title="Novedades">
                <Card>
                    <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </CardBody>
                </Card>  
                </Tab>
                <Tab key="areas" title="Áreas">
                <Card>
                    <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </CardBody>
                </Card>  
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