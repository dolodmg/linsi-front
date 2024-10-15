import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '700']
})

export const CheckboxField = () => (
    <div className='flex flex-col'>
        <p className={`${inter.className} text-black font-medium text-md mb-1`}>Áreas de interés</p>
        <CheckboxGroup 
        color="primary" 
        classNames={{
        wrapper: "xs:gap-2 md:gap-4 xs:flex-col sm:flex-row",
        }}
        >
            <Checkbox value="infra" classNames={{label: "text-gray-700 font-medium"}}>Infraestructura</Checkbox>
            <Checkbox value="cs" classNames={{label: "text-gray-700 font-medium"}}>Ciberseguridad</Checkbox>
            <Checkbox value="desarrollo" classNames={{label: "text-gray-700 font-medium"}}>Desarrollo web</Checkbox>
            <Checkbox value="bc" classNames={{label: "text-gray-700 font-medium"}}>Blockchain</Checkbox>
            <Checkbox value="nn" classNames={{label: "text-gray-700 font-medium"}}>No estoy seguro/a</Checkbox>
        </CheckboxGroup>
    </div>
)
