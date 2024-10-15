import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@nextui-org/react';

const LastNameLabel = ({ name, labelLastName, actualLastName }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <>
      <label htmlFor={name}>{labelLastName}</label>
      <Controller
        name={name}  
        control={control}
        defaultValue={actualLastName}
        render={({ field }) => (
          <Input
            {...field}
            aria-label={labelLastName}
            id={name}
            type="text"
            placeholder={actualLastName}
          />
        )}
      />
    </>
  );
};

export default LastNameLabel;
