import 'server-only';

import { apiRequest } from '../apiRequest';
import { getQueryParams } from '@/util/queryparams';

export async function getMember(id) {  //Obtiene integrantes por id
    return await apiRequest(`/member/${id}`, 'GET', null, 'application/json', false)
  }

  export async function deleteMember(id){ //Elimina integrantes por id
    return await apiRequest(`/member/${id}`, 'DELETE', null, 'application/json', true)
  }

  export async function createMember(formData) { //Crea integrantes
    return await apiRequest(`/member`, 'POST', formData, 'multipart/form-data', true)
  }

  export async function getMembers() { //Obtiene todos los integrantes y tiene paginación
    return await apiRequest(`/member`, 'GET', null, 'application/json', false)
    
  }
  
  export async function editMember(id, data) { //Edita integrantes por id
    return await apiRequest(`/member/${id}`, 'PUT', data, 'multipart/form-data', false)
  }
