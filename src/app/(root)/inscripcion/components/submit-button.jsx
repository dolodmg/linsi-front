import { Inter } from 'next/font/google';
import { Button } from "@nextui-org/react";

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '700']
})

export const SubmitButton = () => (
    <div className='flex justify-end mb-4 mr-4'>
        <Button className={`${inter.className} flex bg-bg-blue text-white rounded-xl`}>
            Enviar
        </Button>
    </div>
)