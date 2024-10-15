"use client"
import React from 'react';
import { Card, CardHeader } from '@nextui-org/react';
import { Inter } from 'next/font/google';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';


const inter = Inter(
    {subsets: ['latin']},
    {weight: '400'});

export const ProjectContainer = () => {
    return (
        <div>
            <Accordion className='border-none drop-shadow-md'>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="panel2-content" id="panel2-header" className='bg-card-grey border-none'>
                    <Typography className={`${inter.className} font-medium`}>Sistema de registro de asistencia</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={`${inter.className} text-sm`}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.  Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.  Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}