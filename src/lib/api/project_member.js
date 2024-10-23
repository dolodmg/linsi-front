import 'server-only'
import { apiRequest } from '../apiRequest'

export async function getProjectsByMember(memberId) { // Obtiene los proyectos en los que está un miembro
    return await apiRequest(`/projectxmember/member/${memberId}/projects`, 'GET', null, 'application/json', false);
}

export async function getMembersByProject(projectId) { // Obtiene los miembros de un proyecto
    return await apiRequest(`/projectxmember/project/${projectId}/members`, 'GET', null, 'application/json', false);
}

export async function addMemberToProject(formData, memberId, projectId) { // Añade un miembro a un proyecto
    return await apiRequest(`/projectxmember/project/${projectId}/member/${memberId}`, 'POST', formData, 'multiform/form-area', true);
}

export async function removeMemberFromProject(memberId, projectId) { // Elimina un miembro de un proyecto
    return await apiRequest(`/projectxmember/project/${projectId}/member/${memberId}`, 'DELETE', null, 'application/json', true);
}