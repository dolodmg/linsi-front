import 'server-only'
import { apiRequest } from '../apiRequest';

export async function getAreas() { //Obtiene todas las áreas, tiene filtros
    return await apiRequest('/area', 'GET', null, 'application/json', false);
}

export async function getAreaById(id) { //Obtiene un área por id
    return await apiRequest(`/area/${id}`, 'GET', null, 'application/json', false);
}

export async function createArea(formData) { //Crea un área
    return await apiRequest('/area','POST', formData, 'multipart/form-data', true);
}

export async function editArea(formData, id) { //Edita un área
    return await apiRequest(`/area/${id}`, 'PUT', formData, 'multipart/form-data', true);
}

export async function deleteArea(id) { //Elimina un área
    return await apiRequest(`/area/${id}`, 'DELETE', null, 'application/json', true);
}
