"use server"
import { getProjectsByMember, getMembersByProject, addMemberToProject, removeMemberFromProject } from "@/lib/api/project_member"

export async function getProjectsByMemberAction (memberId) {
    const { data, headers } = await getProjectsByMember(memberId)
    return data
}

export async function getMembersByProjectAction(projectId) {
    const { data, headers } = await getMembersByProject(projectId)
    return data
}

export async function addMemberToProjectAction(formData, memberId, projectId) {
    const { data, headers } = await addMemberToProject(formData, memberId, projectId)
    return data
}

export async function removeMemberFromProjectAction(memberId, projectId) {
    const { data, headers } = await removeMemberFromProject(memberId, projectId)
    return data
}