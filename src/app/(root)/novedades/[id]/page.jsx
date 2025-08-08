"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getNewsAction } from "@/actions/news";
import { IoArrowBack, IoTimeOutline, IoCalendarOutline } from "react-icons/io5";
import ImageModal from "@/app/components/imageModal";

const NovedadDetalle = ({ params }) => {
  const { id } = params;
  const [novedad, setNovedad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNovedad = async () => {
      try {
        const data = await getNewsAction(id);
        setNovedad(data);
      } catch (error) {
        setError("Hubo un error al cargar la novedad.");
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovedad();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {novedad ? (
        <article className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
            <div className="absolute top-0 left-8 w-1 h-16 bg-gradient-to-b from-blue-700 to-purple-600 rounded-full"></div>
            
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <IoCalendarOutline className="text-blue-700" />
                  <span>
                    {new Date(novedad.publicationDate).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <IoTimeOutline className="text-blue-700" />
                  <span>Lectura: 3 min</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
                {novedad.title}
              </h1>

              <div className="w-full h-1 bg-gradient-to-r from-blue-700 to-purple-600 rounded-full mb-6"></div>
            </header>

            <section className="prose prose-lg max-w-none">
              <div className="text-xl text-gray-700 leading-relaxed font-light">
                {novedad.s3Url && (
                  <div className="float-left mr-4 mb-4 w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[400px] max-w-[40%] sm:max-w-[45%] md:max-w-[50%]">
                    <ImageModal 
                      src={novedad.s3Url} 
                      alt={novedad.title || "Imagen de la novedad"}
                    />
                  </div>
                )}

                <span className="float-left text-6xl font-bold text-blue-700 leading-none mr-3 mt-1">
                  {novedad.description?.charAt(0) || 'N'}
                </span>
                
                <div className="text-justify">
                  {novedad.description?.substring(1) || 'Contenido no disponible.'}
                </div>
              </div>
            </section>

            <div className="clear-both"></div>

            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Artículo publicado el {new Date(novedad.publicationDate).toLocaleDateString('es-ES')}
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-blue-700 rounded-full"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                </div>
              </div>
            </footer>
          </div>

          {/* Back to top button */}
          <div className="text-center mt-8">
            <Link href="/novedades">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <IoArrowBack className="text-lg" />
                Ver más noticias
              </button>
            </Link>
          </div>
        </article>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Artículo no encontrado</h2>
            <p className="text-gray-600 mb-6">Lo sentimos, no pudimos encontrar el artículo que buscas.</p>
            <Link href="/novedades">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Volver a Noticias
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NovedadDetalle;