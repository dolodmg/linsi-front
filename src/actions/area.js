'use server'
import { getAreas, getAreaById, createArea, editArea, deleteArea } from '@/lib/api/area';

export async function getAreasAction() { //Obtiene todas las áreas, tiene filtros
    const { data, headers } = await getAreas()
    return data
}

export async function getAreaByIdAction(id) { //Obtiene un área por id
    const { data, headers } = await getAreaById(id)
    return data
}

export async function createAreaAction(formData) { //Crea un área
    const { data, headers } = await createArea(formData)
    return data
}

export async function editAreaAction(formData, id) { //Edita un área
    const { data, headers } = await editArea(formData, id)
    return data
}

export async function deleteAreaAction(id) { //Elimina un área
    const { data, headers } = await deleteArea(id)
    return data
}