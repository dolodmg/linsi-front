import 'server-only'
import { apiRequest } from '../apiRequest';

export async function getInscription(id) { //Obtiene inscripciones por id
    return await apiRequest(`/registration/${id}`, 'GET', null, 'application/json', false)
}

export async function createInscription(formData) { //Crea una inscripción
    return await apiRequest(`/registration`, 'POST', formData, 'multipart/form-data', false)
}

export async function getInscriptions() { //Obtiene todas las inscripciones
    return await apiRequest(`/registration`, 'GET', null, 'application/json', false)
}

export async function changeInscriptionStatus(data) { //Cambia el estado de una inscripción
    return await apiRequest(`/registration/change-status`, 'POST', data, 'application/json', true)
}
