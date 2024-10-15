'use server'
import { createMember, getMember, deleteMember, getMembers, editMember } from "@/lib/api/member";

export async function getMemberAction(id) { //Obtiene integrantes por id
    const {data, headers} = await getMember(id)
    return data
}

export async function deleteMemberAction(id) { //Elimina integrantes por id
    const {data, headers} = await deleteMember(id)
    return data
}

export async function createMemberAction(fromData) { //Crea integrantes
    const {data, headers} = await createMember(fromData)
    return data
}

export async function getMembersAction() { //Obtiene todos los integrantes y tiene paginación
    try {
      const { data } = await getMembers();
      return data;
    } catch (error) {
      console.error('Error in getMembersAction:', error);
      throw error;
    }
  }

export async function editMemberAction(id, formData) { //Edita integrantes por id
    const {data, headers} = await editMember(id, formData)
    return data
}
