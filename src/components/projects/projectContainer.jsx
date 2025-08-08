"use client";
import React from "react";
import { Inter } from "next/font/google";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";
import { ProjectSkeleton } from "./projectSkeleton";

const inter = Inter(
  { subsets: ["latin"] },
  { weight: "400" }
);

export const ProjectContainer = ({ project, loading }) => {
  if (loading) {
    return <ProjectSkeleton count={3} />;
  }
  return (
    <div className="w-full">
      <Accordion
        key={project.id}
        className="border-none shadow-md bg-white rounded-lg"
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls={`panel-${project.id}-content`}
          id={`panel-${project.id}-header`}
          className="bg-gray-200 px-6 py-2"
        >
          <Typography
            className={`${inter.className} font-medium text-md`}
          >
            {project.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-gray-100 px-6 py-4">
          <Typography
            className={`${inter.className} text-sm`}
          >
            {project.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
