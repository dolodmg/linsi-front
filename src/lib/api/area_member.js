import 'server-only'
import { apiRequest } from '../apiRequest'

export async function getAreasByMember(memberId) { // Obtiene las áreas en las está un miembro
    return await apiRequest(`/areaxmember/member/${memberId}/areas`, 'GET', null, 'application/json', false);
}

export async function getMembersByArea(areaId) { // Obtiene los miembros de un área
    return await apiRequest(`/areaxmember/area/${areaId}/members`, 'GET', null, 'application/json', false);
}

export async function addMemberToArea(memberId, areaId) { // Añade un miembro a un área
    const data = {
        member_id: memberId,
        area_id: areaId}
    return await apiRequest(`/areaxmember`, 'POST', data, 'application/json', true);
}

export async function removeMemberFromArea(memberId, areaId) { // Elimina un miembro de un área
    return await apiRequest(`/areaxmember/area/${areaId}/member/${memberId}`, 'DELETE', null, 'application/json', true);
}