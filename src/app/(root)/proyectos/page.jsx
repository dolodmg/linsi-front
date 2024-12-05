"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Divider } from "@nextui-org/react";
import { Bree_Serif } from "next/font/google";
import { ProjectContainer } from "./components/projectContainer";
import { LinkInicio } from "@/app/components/linkInicio";
import { getProjectsAction } from "@/actions/project";

const bree = Bree_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const Proyectos = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjectsAction();
        setProjects(projectsData);
        console.log(projectsData);
      } catch (err) {
        console.log("Error al obtener proyectos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p className="text-center mt-20">Cargando...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-bg-light-grey">
      <Header headerName="PROYECTOS" />
      <div className="flex-grow mx-8 mb-4">
        <LinkInicio />
        <Divider />
        <div className="flex flex-col items-center">
          {/* Proyectos en desarrollo */}
          <h1 className={`${bree.className} text-bg-blue text-2xl mt-6`}>
            Proyectos en desarrollo
          </h1>
          <div className="w-full max-w-4xl my-4">
            {projects.some((project) => project.endDate == null) ? (
              <div className="flex flex-col gap-4">
                {projects.map(
                  (project) =>
                    project.endDate == null && (
                      <ProjectContainer key={project.id} project={project} />
                    )
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-600 text-xl">
                  Aún no hay proyectos en desarrollo
                </p>
              </div>
            )}
          </div>

          {/* Proyectos finalizados */}
          <h1 className={`${bree.className} text-bg-blue text-2xl mt-6`}>
            Proyectos finalizados
          </h1>
          <div className="w-full max-w-4xl my-4">
            {projects.some((project) => project.endDate != null) ? (
              <div className="flex flex-col gap-4">
                {projects.map(
                  (project) =>
                    project.endDate != null && (
                      <ProjectContainer key={project.id} project={project} />
                    )
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-600 text-xl">
                  Aún no hay proyectos finalizados
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
