'use server';

import { createNews, getNews, deleteNews, getAllNews, editNews } from "@/lib/api/news";

// Obtiene una noticia por ID
export async function getNewsAction(id) {
    const {data, headers} = await getNews(id)
    return data
}

// Elimina una noticia por ID
export async function deleteNewsAction(id) {
    const {data, headers} = await deleteNews(id)
    return data
}

// Crea una noticia
export async function createNewsAction(formData) {
    const {data, headers } = await createNews(formData);
    return data; 
}

// Obtiene todas las noticias
export async function getAllNewsAction() {
    try {
        const { data } = await getAllNews();
        return data;
    } catch (error) {
        console.error('Error in getAllNewsAction:', error);
        throw error;
    }
}

// Edita una noticia por ID
export async function editNewsAction(id, formData) {
    const { data, headers } = await editNews(id, formData);
    return data;
}
