import { Inter } from 'next/font/google';
import { Select, SelectItem } from "@nextui-org/react";

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '700']
})

const options = [
    {key: "1", label: "1° año"},
    {key: "2", label: "2° año"},
    {key: "3", label: "3° año"},
    {key: "4", label: "4° año"},
    {key: "5", label: "5° año"}
];

export const SelectField = () => (
    <div className='flex flex-col'>
        <p className={`${inter.className} text-black font-medium text-md mb-1`}>Año de cursada</p>   
        <div className='flex w-full flex-wrap'>
            <Select 
                size='md'
                placeholder="Seleccioná una opción" 
                className="min-w-[194px]"
            >
                {options.map((option) => (
                    <SelectItem className='text-gray-700' key={option.key} value={option.key}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    </div>
);
