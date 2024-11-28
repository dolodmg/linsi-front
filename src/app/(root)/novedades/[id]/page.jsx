"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getNewsAction } from "@/actions/news";
import { IoArrowBack } from "react-icons/io5"; // Importamos un ícono de flecha

const NovedadDetalle = ({ params }) => {
  const { id } = params; // Obtiene el parámetro de la ruta dinámica
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

  if (loading) return <p className="text-center mt-8">Cargando...</p>;
  if (error) return <p className="text-center mt-8">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Flecha para volver atrás */}
        <Link href="/novedades">
          <button className="w-12 h-12 flex items-center justify-center bg-gray-150 hover:bg-gray-300 rounded-full text-gray-600 hover:text-gray-800 shadow-md mb-4 transition-all duration-200">
            <IoArrowBack className="text-2xl" />
          </button>
        </Link>

        {novedad ? (
          <article className="flex flex-col md:flex-row gap-8 bg-white shadow-md rounded-lg overflow-hidden">
            {/* Imagen de la noticia */}
            {novedad.s3Url && (
              <div className="md:w-1/3">
                <img
                  src={novedad.s3Url}
                  alt="Imagen de la novedad"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

          {/* Contenido del artículo */}
          <div className="p-6 md:w-2/3 flex flex-col justify-start">
            <header>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {novedad.title}
              </h1>
              <p className="text-sm text-gray-500">
                Fecha de publicación:{" "}
                {new Date(novedad.publicationDate).toLocaleDateString()}
              </p>
            </header>

            <section className="mt-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {novedad.description}
              </p>
            </section>
          </div>

          </article>
        ) : (
          <p className="text-center">No se encontró la novedad.</p>
        )}
      </div>
    </div>
  );
};

export default NovedadDetalle;
