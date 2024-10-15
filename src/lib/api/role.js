import 'server-only';

import { apiRequest } from '../apiRequest';

  export async function createRole(formData) { //Crea un rol
    return await apiRequest(`/role`, 'POST', formData, 'multipart/form-data', true)
  }

  export async function getRoles() { //Obtiene todos los roles y tiene paginación
    return await apiRequest(`/role`, 'GET', null, 'application/json', false)
    
  }
  