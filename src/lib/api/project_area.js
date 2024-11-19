import 'server-only'
import { apiRequest } from '../apiRequest'

export async function getProjectsByArea(areaId) { // Obtiene los proyectos en los que está un área
    return await apiRequest(`/projectxarea/area/${areaId}/projects`, 'GET', null, 'application/json', false);
}

export async function getAreasByProject(projectId) { // Obtiene las las áreas involucradas en un proyecto
    return await apiRequest(`/projectxarea/project/${projectId}/areas`, 'GET', null, 'application/json', false);
}

export async function addAreaToProject(areaId, projectId) { // Añade un área a un proyecto
    const data = {
        area_id: areaId,
        project_id: projectId
    }
    return await apiRequest(`/projectxarea`, 'POST', data, 'application/json', true);
}

export async function removeAreaFromProject(areaId, projectId) { // Elimina un área de un proyecto
    return await apiRequest(`/projectxarea/project/${projectId}/area/${areaId}`, 'DELETE', null, 'application/json', true);
}