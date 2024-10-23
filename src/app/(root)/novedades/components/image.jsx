import { Image, Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: '400' });

export const ImageComponent = ({ novedad }) => {
  return (
    <Card className="w-full h-[400px]">
      <CardHeader className="flex justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${novedad.imageId}`}
          alt={`Imagen de la novedad: ${novedad.title}`}
          className='w-full h-full object-cover'
        />
      </CardHeader>
      <CardBody className="text-center">
        <p className={`${inter.className} text-md font-bold`}>{novedad.title}</p>
        <Divider />
        <p className={`${inter.className} text-sm text-gray-600 mt-2`}>{novedad.description}</p>
        <p className="text-xs text-gray-400 mt-2">Publicado por: {novedad.user.name}</p>
        <p className="text-xs text-gray-400">Fecha: {new Date(novedad.publicationDate).toLocaleDateString()}</p>
      </CardBody>
    </Card>
  );
};
