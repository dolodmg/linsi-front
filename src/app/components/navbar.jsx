"use client"
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Hind } from 'next/font/google'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const hind = Hind({ 
    subsets: ['latin'],
    weight: ['400', '700']
})

const navigation = [
    { name: 'INICIO', href: '/', current: true },
    { name: 'NOVEDADES', href: '#', current: false },
    { name: 'PROYECTOS', href: '/proyectos', current: false },
    { name: 'INTEGRANTES', href: '/integrantes', current: false },
]

const Navbar = () => {
  return (
    <Disclosure as="nav" className={`${hind.className} bg-white drop-shadow-md`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2">
            <div className="relative flex h-16 items-center justify-between">
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
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='text-blue-700 font-bold px-6 text-md'
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
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

          <DisclosurePanel className="sm:hidden flex flex-col font-bold space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className='bg-white text-blue-700' 
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar