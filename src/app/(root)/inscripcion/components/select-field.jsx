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

export const SelectField = ({ value, onChange }) => (
    <div className="flex flex-col">
      <p className="text-black font-medium text-md mb-2">Año de cursada</p>
      <Select
        aria-label="Selecciona el año de cursada"
        size="md"
        placeholder="Seleccioná una opción"
        value={value}
        onChange={(e) => onChange(e)}
        className="min-w-[194px]"
      >
        {options.map((option) => (
          <SelectItem key={option.key} value={option.key} className='text-gray-600'>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
  
