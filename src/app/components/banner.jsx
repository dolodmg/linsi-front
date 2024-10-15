import React from 'react';

const Banner = () => {
  return (
    <div 
      className="relative bg-cover bg-center h-96 flex justify-center items-center bg-animated"
      style={{ backgroundImage: `url('/images/banner.png')` }}
    >
      <div className="text-center relative z-10">
        <img 
          src="/images/V2Logo_textoBlanco.png" 
          alt="Logo linsi"
          className="w-128 h-64 object-contain mx-auto" 
        />
        <h2 className="text-2xl font-bold text-white"> 
          LABORATORIO DE INNOVACIÓN EN SISTEMAS DE INFORMACIÓN
        </h2>
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default Banner;
