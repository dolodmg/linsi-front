import React from 'react';
import Link from "next/link";

export default function SectionC() {
  return (
    <section className="flex flex-col lg:flex-row items-center bg-section-blue text-white p-8">
      <div className="w-full lg:w-2/3 flex flex-col items-center text-white lg:ml-6">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4 text-center font-calistoga xs:mt-2 md:mt-12">
          ¿Querés ser parte del laboratorio?
        </h2>
        <Link href="/inscripcion">
          <button className="bg-white text-dark-blue px-6 py-3 rounded hover:bg-light-blue text-base sm:text-lg mt-4 lg:mt-16 mb-6 lg:mb-16">
            Inscripción
          </button>
        </Link>
      </div>
      <div className="w-full lg:w-1/4">
        <img
          src="/images/inscripcion.png"
          alt="Imagen representativa"
          className="w-3/4 mx-auto lg:w-full h-auto"
        />
      </div>
    </section>
  );
}
