"use client"
import React, { useEffect, useState } from 'react';
import { TabsComponent } from '@/components/admin/ui/tabs';
import { User } from '@/components/admin/ui/user';
import { getMembersAction } from '@/actions/member';
import { getProjectsAction } from '@/actions/project';
import { getAreasAction } from '@/actions/area';
import { getMembersByProjectAction } from '@/actions/project_member';
import { getAreasByProjectAction } from '@/actions/project_area';
import { getMembersByAreaAction} from '@/actions/area_member';
import { getAllNewsAction } from '@/actions/news';
import { getInscriptionsAction } from '@/actions/inscription';

const Admin = () => {
    const [members, setMembers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [areas, setAreas] = useState([]);
    const [news, setNews] = useState([]);
    const [inscriptions, setInscriptions] = useState([]);
    const [membersByProject, setMembersByProject] = useState({});
    const [areasByProject, setAreasByProject] = useState({});
    const [membersByArea, setMembersByArea] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersData = await getMembersAction();
                setMembers(membersData);
            } catch (error) {
                console.log('Error al obtener integrantes', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsData = await getAllNewsAction();
                setNews(newsData);
            } catch (error) {
                console.log('Error al obtener novedades', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    useEffect(() => {
        const fetchInscriptions = async () => {
            try {
                const inscriptionsData = await getInscriptionsAction();
                setInscriptions(inscriptionsData);
            } catch (error) {
                console.log('Error al obtener inscripciones', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInscriptions();
    }, []);

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const areasData = await getAreasAction();
                setAreas(areasData)
            } catch (error) {
                console.log('Error al obtener areas', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAreas();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsData = await getProjectsAction();
                setProjects(projectsData); 
                const newMembers = {};
                const newAreas = {};
                for (const project of projectsData) {
                    try {
                        const projectMembers = await getMembersByProjectAction(project.id);
                        newMembers[project.id] = projectMembers || [];

                        const projectAreas = await getAreasByProjectAction(project.id);
                        newAreas[project.id] = projectAreas || [];
                        
                    } catch (memberError) {
                        console.error(`Error al obtener proyectos para miembro ${project.id}:`, memberError);
                        newMembers[project.id] = [];
                    }
                }
                setMembersByProject(newMembers);
                setAreasByProject(newAreas);
            } catch (error) {
                console.log('Error al obtener proyectos', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchMembersByArea = async () => {
            try {
                const areasData = await getAreasAction();
                setAreas(areasData);
                const newMembers = {};
                for (const area of areasData) {
                    try {
                        const areaMembers = await getMembersByAreaAction(area.id);
                        newMembers[area.id] = areaMembers || [];
                    } catch (memberError) {
                        console.error(`Error al obtener miembros para área ${area.id}:`, memberError);
                        newMembers[area.id] = [];
                    }
                }
                setMembersByArea(newMembers);
            } catch (error) {
                console.log('Error al obtener integrantes por área', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembersByArea();
    }, []);


    // Funciones para actualizar los estados después de cambios en áreas/miembros
    const updateProjectAreas = async (projectId) => {
        try {
            const projectAreas = await getAreasByProjectAction(projectId);
            setAreasByProject(prev => ({
                ...prev,
                [projectId]: projectAreas || []
            }));
        } catch (error) {
            console.error(`Error al actualizar áreas del proyecto ${projectId}:`, error);
        }
    };

    const updateProjectMembers = async (projectId) => {
        try {
            const projectMembers = await getMembersByProjectAction(projectId);
            setMembersByProject(prev => ({
                ...prev,
                [projectId]: projectMembers || []
            }));
        } catch (error) {
            console.error(`Error al actualizar miembros del proyecto ${projectId}:`, error);
        }
    };

    const updateAreasAndMembers = async () => {
        try {
            const [membersData, areasData] = await Promise.all([
                getMembersAction(),
                getAreasAction()
            ]);
            setMembers(membersData);
            setAreas(areasData);
        } catch (error) {
            console.error('Error al actualizar áreas y miembros:', error);
        }
    };

    const updateAreaMembers = async (areaId) => {
        try {
            const areaMembers = await getMembersByAreaAction(areaId);
            setMembersByArea(prev => ({
                ...prev,
                [areaId]: areaMembers || []
            }));
        } catch (error) {
            console.error(`Error al actualizar miembros del área ${areaId}:`, error);
        }
    };

    const updateMembers = async () => {
        try {
            const membersData = await getMembersAction();
            setMembers(membersData);
        } catch (error) {
            console.error('Error al actualizar miembros:', error);
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className='flex flex-col mx-8'>
            <User />
            <TabsComponent 
                members={members} 
                projects={projects} 
                areas={areas} 
                news={news} 
                inscriptions={inscriptions} 
                membersByProject={membersByProject} 
                areasByProject={areasByProject} 
                membersByArea={membersByArea}
                onUpdateProjectAreas={updateProjectAreas}
                onUpdateProjectMembers={updateProjectMembers}
                onUpdateAreasAndMembers={updateAreasAndMembers}
                onUpdateAreaMembers={updateAreaMembers}
                onUpdateMembers={updateMembers}
            />
        </div>
    );
};

export default Admin;
