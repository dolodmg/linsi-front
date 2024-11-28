"use client";
import React from 'react';
import Link from 'next/link'; // Importa el componente Link de Next.js
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import Slider from "react-slick";

export const NovedadList = ({ novedades }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // Función para truncar el texto
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Componente personalizado para la flecha derecha
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          right: "10px",
          width: "50px",
          height: "50px",
          background: "rgba(0, 0, 0, 0.2)",
          borderRadius: "50%",
          zIndex: 2,
        }}
        onClick={onClick}
      />
    );
  }

  // Componente personalizado para la flecha izquierda
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          left: "10px",
          width: "50px",
          height: "50px",
          background: "rgba(0, 0, 0, 0.2)",
          borderRadius: "50%",
          zIndex: 2,
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <div className="container mx-auto py-4">
      {novedades.length > 0 ? (
        <Slider {...settings}>
          {novedades.map((novedad) => (
            <div key={novedad.id} className="px-4">
              {/* Usamos Link para redirigir a la página de detalle */}
              <Link href={`/novedades/${novedad.id}`}>
                <div className="cursor-pointer">
                  <Card className="w-full h-[400px]">
                    <CardHeader className="flex justify-center">
                      {novedad.s3Url ? (
                        <img
                          className="object-cover w-full h-48"
                          alt="Imagen de la novedad"
                          src={novedad.s3Url}
                        />
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                          <p className="text-gray-500">Sin imagen</p>
                        </div>
                      )}
                    </CardHeader>
                    <CardBody className="text-center">
                      <p className="text-lg font-bold text-black">{novedad.title}</p>
                      <Divider />
                      {/* Mostrar descripción truncada */}
                      <p className="text-sm text-gray-600 mt-2">
                        {truncateText(novedad.description, 100)} {/* Cambia 100 por el número de caracteres deseado */}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Fecha: {new Date(novedad.publicationDate).toLocaleDateString()}
                      </p>
                    </CardBody>
                  </Card>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-gray-600 text-2xl">No hay novedades disponibles</p>
        </div>
      )}
    </div>
  );
};
