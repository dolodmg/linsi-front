"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'; // Icono de usuario
import { Hind } from 'next/font/google';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';

const hind = Hind({
  subsets: ['latin'],
  weight: ['400', '700']
});

const navigation = [
  { name: 'INICIO', href: '/', current: true },
  { name: 'NOVEDADES', href: '/news', current: false },
  { name: 'PROYECTOS', href: '/projects', current: false },
  { name: 'INTEGRANTES', href: '/members', current: false },
  { name: 'INSCRIPCION', href: '/inscriptions', current: false },
];

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, checkSession } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/session', { method: 'DELETE' });
      setIsLoggedIn(false);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    checkSession(); // Verifica la sesión al cargar la página
  }, []);

  return (
    <Disclosure as="nav" className={`${hind.className} bg-white drop-shadow-md`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <img
                      className="h-10 w-auto"
                      src="/images/logo_linsi.png"
                      alt="Logo LINSI"
                    />
                  </Link>
                </div>
              </div>

              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <div className="flex items-center space-x-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-blue-700 font-bold px-4 text-md"
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                  {!isLoggedIn && (
                    <Link href="/login">
                      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-all">
                        Iniciar Sesión
                      </button>
                    </Link>
                  )}
                  {isLoggedIn && (
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => router.push('/admin')}
                        className="flex items-center space-x-2 text-green-700 font-bold"
                      >
                        <UserCircleIcon className="h-6 w-6 text-green-700" />
                        <span>Administrador</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition-all"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Abrir menú</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Panel */}
          <DisclosurePanel className="sm:hidden flex flex-col font-bold space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="bg-white text-blue-700"
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </DisclosureButton>
            ))}
            {!isLoggedIn && (
              <Link href="/login">
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-all">
                  Iniciar Sesión
                </button>
              </Link>
            )}
            {isLoggedIn && (
              <div>
                <button
                  onClick={() => router.push('/admin')}
                  className="flex items-center space-x-2 text-green-700 font-bold"
                >
                  <UserCircleIcon className="h-6 w-6 text-green-700" />
                  <span>Administrador</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition-all"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;