'use server';

import { createNews, getNews, deleteNews, getAllNews, editNews } from "@/lib/api/news";

// Obtiene una noticia por ID
export async function getNewsAction(id) {
    try {
        const { data } = await getNews(id);
        return data;
    } catch (error) {
        console.error('Error in getNewsAction:', error);
        throw error;
    }
}

// Elimina una noticia por ID
export async function deleteNewsAction(id) {
    try {
        const { data } = await deleteNews(id);
        return data;
    } catch (error) {
        console.error('Error in deleteNewsAction:', error);
        throw error;
    }
}

// Crea una noticia
export async function createNewsAction(formData) {
    try {
        const { data } = await createNews(formData);
        return data;
    } catch (error) {
        console.error('Error in createNewsAction:', error);
        throw error;
    }
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
    try {
        const { data } = await editNews(id, formData);
        return data;
    } catch (error) {
        console.error('Error in editNewsAction:', error);
        throw error;
    }
}
