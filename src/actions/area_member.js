'use server'
import { getAreasByMember, getMembersByArea, addMemberToArea, removeMemberFromArea } from "@/lib/api/area_member"

export async function getAreasByMemberAction(memberId) { // Obtiene las áreas en las está un miembro
    const { data, headers } = await getAreasByMember(memberId)
    return data
}

export async function getMembersByAreaAction(areaId) { // Obtiene los miembros de un área
    const { data, headers } = await getMembersByArea(areaId)
    return data
}

export async function addMemberToAreaAction(memberId, areaId) { // Añade un miembro a un área
    const { data, headers } = await addMemberToArea(memberId, areaId)
    return data
}

export async function removeMemberFromAreaAction(memberId, areaId) { // Elimina un miembro de un área
    const { data, headers } = await removeMemberFromArea(memberId, areaId)
    return data
}