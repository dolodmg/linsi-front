import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@nextui-org/react';

const NameLabel = ({ name, labelFirstName, actualFirstName }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <>
      <label htmlFor={name}>{labelFirstName}</label>
      <Controller
        name={name} 
        control={control}
        defaultValue={actualFirstName}
        render={({ field }) => (
          <Input
            {...field}
            aria-label={labelFirstName}
            id={name}
            type="text"
            placeholder={actualFirstName}
          />
        )}
      />
    </>
  );
};

export default NameLabel;
