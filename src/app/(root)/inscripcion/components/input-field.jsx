import { Inter } from 'next/font/google';
import { Input } from "@nextui-org/react";

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '700']
})

export const InputField = ({ label, type, placeholder }) => (
    <div className='flex flex-col'>
        <p className={`${inter.className} text-black font-medium text-md mb-1`}>{label}</p>   
        <Input size="md" type={type} placeholder={placeholder}/>
    </div>
);