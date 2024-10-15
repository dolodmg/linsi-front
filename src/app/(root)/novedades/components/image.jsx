import { Image } from '@nextui-org/react';

export const ImageComponent = ({ source }) => {
  return (
    <Image
      src={source}
      alt='...'
      className='w-full h-full object-cover'
    />
  );
};