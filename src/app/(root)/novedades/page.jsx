"use client";
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { NovedadList } from './components/novedadList';
import { Divider } from '@nextui-org/react';
import { LinkInicio } from '@/app/components/linkInicio';
import { getAllNewsAction } from '@/actions/news';
import { CarouselWithContent } from '../../components/carousel';


const Novedades = () => {
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
    <div className="flex flex-col bg-bg-light-grey">
      <Header headerName="NOVEDADES" />
      <div className="mx-8 mb-4">
        <LinkInicio />
        <Divider />
        <div className="flex flex-row justify-start items-center space-x-4 overflow-x-auto w-full py-4">
          <NovedadList novedades={novedades} />
        </div>
      </div>
    </div>
  )
};

export default Novedades;
