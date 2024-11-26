'use server'
import { getProjects, getProject, createProject, editProject, deleteProject } from "@/lib/api/project";

export async function getProjectsAction() {
    const {data, headers} = await getProjects()
    return data
}

export async function getProjectAction(id) {
    const {data, headers} = await getProject(id)
    return data
}

export async function createProjectAction(formData) {
    const {data, headers} = await createProject(formData)
    return data
}

export async function editProjectAction(id, formData) {
    const {data, headers} = await editProject(id, formData)
    return data
}

export async function deleteProjectAction(id) {
    const {data, headers} = await deleteProject(id)
    return data
}