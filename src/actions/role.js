'use server'
import { getRoles, createRole } from '@/lib/api/role';

export async function getRolesAction() {
    const {data, headers} = await getRoles();
    return data
}

export async function createRoleAction(formData) {
    const {data, headers} = await createRole(formData);
    return data
}