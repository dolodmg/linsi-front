export default function SectionB() {
    return (
        <section className="bg-white text-white p-8 text-center">

            <h2 className="text-6xl font-calistoga font-bold mb-4 mt-16 text-dark-blue">Áreas de conocimiento</h2>


            <div className="bg-dark-blue h-1 w-1/4 mx-auto mb-12"></div>

            <div className="flex justify-around items-center px-64 mt-32 mb-32">

                <div className="flex flex-col items-center space-y-6">
                    <img 
                        src="/images/dev2.png" 
                        alt="Desarrollo de software" 
                        className="w-48 h-48 rounded-lg"
                    />
                    <p className="text-lg text-dark-blue font-semibold">Desarrollo de software</p>
                </div>


                <div className="flex flex-col items-center space-y-6">
                    <img 
                        src="/images/infra2.png" 
                        alt="Infraestructura" 
                        className="w-48 h-48 rounded-lg"
                    />
                    <p className="text-lg text-dark-blue font-semibold">Infraestructura</p>
                </div>

                <div className="flex flex-col items-center space-y-6">
                    <img 
                        src="/images/security2.png" 
                        alt="Ciberseguridad" 
                        className="w-48 h-48 rounded-lg"
                    />
                    <p className="text-lg text-dark-blue font-semibold">Ciberseguridad</p>
                </div>
            </div>
        </section>
    );
}

