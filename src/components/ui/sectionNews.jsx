"use client";
import React, { useEffect, useState } from 'react';
import { NovedadList } from '@/components/news/novedadList';
import { getAllNewsAction } from '@/actions/news';

const SectionNews = () => {
  const [novedades, setNovedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const data = await getAllNewsAction();
        setNovedades(data);
      } catch (error) {
        setError('Hubo un error al cargar las novedades.');
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNovedades();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="bg-white text-white py-16 px-8">
      <NovedadList novedades={novedades} />
    </section>
  );
};

export default SectionNews;
