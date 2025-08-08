import Link from "next/link";

export default function SectionA() {
  return (
    <section className="bg-project-background text-white p-8 flex flex-col lg:flex-row items-center">
      <div className="w-full lg:w-1/3 lg:ml-48 mb-8 lg:mb-0">
        <img 
          src="/images/ProjectSinRelleno.png" 
          alt="Descripción de la imagen" 
          className="rounded-lg mx-auto w-3/4 lg:w-full"
        />
      </div>

      <div className="w-full lg:w-2/3 flex flex-col items-center text-dark-blue lg:ml-6">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4 text-center font-calistoga">
          Conocé nuestros proyectos!
        </h2>
        <Link href="/proyectos">
          <button className="bg-dark-blue text-white px-6 py-3 rounded hover:bg-gray-200 text-base sm:text-lg mt-2 lg:mt-16">
            Ver más
          </button>
        </Link>
      </div>
    </section>
  );
}
