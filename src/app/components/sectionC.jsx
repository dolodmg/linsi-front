import React from 'react';
import Link from "next/link";

export default function SectionC() {
  return (
    <section className="flex items-center bg-section-blue text-white">
        <div className="w-2/3 flex flex-col items-center text-white ml-6">
        <h2 className="text-6xl font-bold leading-tight mb-6 text-center font-calistoga mt-16">
          ¿Querés ser parte del laboratorio?
        </h2>
        <Link href="/inscripcion">
          <button className="bg-white text-dark-blue px-6 py-3 rounded hover:bg-light-blue text-lg mt-16 mb-16">
            Inscripción
          </button>
        </Link>
      </div>
        <div className="hidden lg:block lg:w-1/4">
          <img
            src="/images/inscripcion.png"
            alt="Imagen representativa"
            className="w-full h-auto"
          />
        </div>
    </section>
  );
}




  