import 'server-only'
import { apiRequest } from '../apiRequest'

export async function getProjects() { //Obtiene todos los proyectos
    return await apiRequest('/project', 'GET', null, 'application/json', false)
}

export async function getProject(id) { //Obtiene proyectos por id
    return await apiRequest(`/project/${id}`, 'GET', null, 'application/json', false)
}

export async function createProject(formData) { //Crea un proyecto
    return await apiRequest('/project', 'POST', formData, 'multipart/form-data', true)
}

export async function editProject(id, data) { //Edita un proyecto
    return await apiRequest(`/project/${id}`, 'PUT', data,'multipart/form-data', true)
}