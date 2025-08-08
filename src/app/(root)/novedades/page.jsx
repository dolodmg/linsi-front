"use client";
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { NovedadList } from './components/novedadList';
import { NewsSkeleton } from './components/newsSkeleton';
import { NovedadModal } from './components/NovedadModal';
import { Divider } from '@nextui-org/react';
import { LinkInicio } from '@/app/components/linkInicio';
import { getAllNewsAction } from '@/actions/news';


const Novedades = () => {
  const [novedades, setNovedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNovedad, setSelectedNovedad] = useState(null); // Estado para controlar la novedad seleccionada

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

  const handleNovedadClick = (novedad) => {
    console.log("Novedad seleccionada:", novedad);
    setSelectedNovedad(novedad); // Guardamos la novedad seleccionada para mostrarla en el modal
  };

  const handleCloseModal = () => {
    setSelectedNovedad(null); // Cerrar el modal al limpiar la novedad seleccionada
  };

  if (loading) return (
    <div className="flex flex-col bg-bg-light-grey">
      <Header headerName="NOVEDADES" />
      <div className="mx-8 mb-4">
        <LinkInicio />
        <Divider />
        <NewsSkeleton count={3} />
      </div>
    </div>
  );
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col bg-bg-light-grey">
      <Header headerName="NOVEDADES" />
      <div className="mx-8 mb-4">
        <LinkInicio />
        <Divider />
        <div className="flex flex-row justify-start items-center space-x-4 overflow-x-auto w-full py-4">
          <NovedadList novedades={novedades} onNovedadClick={handleNovedadClick} />
        </div>
      </div>

      {/* Modal para mostrar el detalle de la novedad seleccionada */}
      {selectedNovedad && (
        <NovedadModal novedad={selectedNovedad} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Novedades;
