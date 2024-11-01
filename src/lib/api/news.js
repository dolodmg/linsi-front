import 'server-only';

import { apiRequest } from '../apiRequest';
import { getQueryParams } from '@/util/queryparams';

// Obtiene una noticia por ID
export async function getNews(id) {
    return await apiRequest(`/news/${id}`, 'GET', null, 'application/json', false);
}

// Elimina una noticia por ID
export async function deleteNews(id) {
    return await apiRequest(`/news/${id}`, 'DELETE', null, 'application/json', true);
}

// Crea una noticia
export async function createNews(formData) {
    return await apiRequest(`/news`, 'POST', formData, 'multipart/form-data', true);
}

// Obtiene todas las noticias
export async function getAllNews() {
    return await apiRequest(`/news`, 'GET', null, 'application/json', false)
    
}

// Edita una noticia por ID 
export async function editNews(id, formData) {
    return await apiRequest(`/news/${id}`, 'PUT', formData, 'multipart/form-data', false);
}
