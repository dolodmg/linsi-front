import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10 mt-10 min-h-[150px]">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <p>&copy; {new Date().getFullYear()} Linsi. Todos los derechos reservados.</p>
                </div>

                <div className="flex space-x-6 mt-2 md:mt-0">
                    <Link href="/terminos-condiciones" className="hover:text-gray-400 transition-colors duration-300">
                        Términos y Condiciones
                    </Link>
                    <Link href="/politicas-privacidad" className="hover:text-gray-400 transition-colors duration-300">
                        Políticas de Privacidad
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
