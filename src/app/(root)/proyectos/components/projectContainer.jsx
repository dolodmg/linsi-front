"use client"
import React from 'react';
import { Inter } from 'next/font/google';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';

const inter = Inter(
    {subsets: ['latin']},
    {weight: '400'});

export const ProjectContainer = ({ project }) => {
    return (
        <div>
            <Accordion key={project.id} className='border-none drop-shadow-md'>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="panel2-content" id="panel2-header" className='bg-card-grey border-none'>
                    <Typography className={`${inter.className} font-medium`}>{project.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={`${inter.className} text-sm`}>
                        {project.description}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}