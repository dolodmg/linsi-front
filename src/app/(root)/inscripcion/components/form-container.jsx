import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({
    subsets: ['latin'],
    weight: ['400']
})

export const FormContainer = ({ children }) => (
    <div className='flex bg-bg-light-grey w-full justify-center items-center'>
        <div className='flex bg-white flex-col rounded-lg mt-4 mb-4 drop-shadow-lg w-5/6'>
            <h2 className={`${bree.className} flex mt-4 text-bg-blue font-medium xs:text-2xl sm:text-3xl justify-center`}>Completá este formulario</h2>
            {children}
        </div>
    </div>
);