import Link from "next/link";

export default function SectionA() {
  return (
    <section className="bg-project-background text-white p-8 flex items-center">
      <div className="w-1/3 ml-48">
        <img 
          src="/images/ProjectSinRelleno.png" 
          alt="Descripción de la imagen" 
          className="rounded-lg"
        />
      </div>

      <div className="w-2/3 flex flex-col items-center text-dark-blue ml-6">
        <h2 className="text-6xl font-bold leading-tight mb-6 text-center font-calistoga">
          Conoce nuestros proyectos!
        </h2>
        <Link href="/proyectos">
          <button className="bg-dark-blue text-white px-6 py-3 rounded hover:bg-gray-200 text-lg mt-16">
            Ver más
          </button>
        </Link>
      </div>
    </section>
  );
}




