'use server'
import { getInscription, createInscription, getInscriptions, changeInscriptionStatus } from '@/lib/api/inscription';

export async function getInscriptionAction(id) {
    const {data, headers} = await getInscription(id)
    return data
}
export async function createInscriptionAction(formData) {
    try {
        return await createInscription(formData);
    } catch (error) {
        console.error('Error en la inscripción:', error);
        throw error; 
    }
}

export async function getInscriptionsAction() {
    const {data, headers} = await getInscriptions()
    return data
}

export async function changeInscriptionStatusAction(registrationId, nextStatus) {
    const data = {
        registrationId: registrationId,
        nextStatus: nextStatus  
    };
    return await changeInscriptionStatus(data)
}