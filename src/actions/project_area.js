"use server"
import { getProjectsByArea, getAreasByProject, addAreaToProject, removeAreaFromProject } from "@/lib/api/project_area"

export async function getProjectsByAreaAction (areaId) { // Obtiene los proyectos en los que está un área
    const { data, headers } = await getProjectsByArea(areaId)
    return data
}

export async function getAreasByProjectAction(projectId) { // Obtiene las las áreas involucradas en un proyecto
    const { data, headers } = await getAreasByProject(projectId)
    return data
}

export async function addAreaToProjectAction(formData, areaId, projectId) { // Añade un área a un proyecto
    const { data, headers } = await addAreaToProject(formData, areaId, projectId)
    return data
}

export async function removeAreaFromProjectAction(areaId, projectId) { // Elimina un área de un proyecto
    const { data, headers } = await removeAreaFromProject(areaId, projectId)
    return data
}
