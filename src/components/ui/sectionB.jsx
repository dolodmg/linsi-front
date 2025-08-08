export default function SectionB() {
  return (
    <section className="bg-white text-white p-8 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-6xl font-calistoga font-bold mb-4 mt-4 sm:mt-16 text-dark-blue">
        Áreas de conocimiento
      </h2>

      <div className="bg-dark-blue h-1 w-1/2 sm:w-1/3 lg:w-1/4 mx-auto mb-12"></div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-12 mt-12 sm:mt-24 mb-12 sm:mb-32">
        <div className="flex flex-col items-center space-y-6">
          <img 
            src="/images/dev2.png" 
            alt="Desarrollo de software" 
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-lg"
          />
          <p className="text-lg text-dark-blue font-semibold">Desarrollo de software</p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <img 
            src="/images/infra2.png" 
            alt="Infraestructura" 
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-lg"
          />
          <p className="text-lg text-dark-blue font-semibold">Infraestructura</p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <img 
            src="/images/security2.png" 
            alt="Ciberseguridad" 
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-lg"
          />
          <p className="text-lg text-dark-blue font-semibold">Ciberseguridad</p>
        </div>
      </div>
    </section>
  );
}
