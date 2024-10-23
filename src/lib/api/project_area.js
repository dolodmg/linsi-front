import 'server-only'
import { apiRequest } from '../apiRequest'

export async function getProjectsByArea(areaId) { // Obtiene los proyectos en los que está un área
    return await apiRequest(`/projectxarea/area/${areaId}/projects`, 'GET', null, 'application/json', false);
}

export async function getAreasByProject(projectId) { // Obtiene las las áreas involucradas en un proyecto
    return await apiRequest(`/projectxarea/project/${projectId}/areas`, 'GET', null, 'application/json', false);
}

export async function addAreaToProject(formData, areaId, projectId) { // Añade un área a un proyecto
    return await apiRequest(`/projectxarea/project/${projectId}/area/${areaId}`, 'POST', formData, 'multiform/form-area', true);
}

export async function removeAreaFromProject(areaId, projectId) { // Elimina un área de un proyecto
    return await apiRequest(`/projectxarea/project/${projectId}/area/${areaId}`, 'DELETE', null, 'application/json', true);
}