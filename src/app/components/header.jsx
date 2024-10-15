import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({
    subsets: ['latin'],
    weight: ['400']
})

export const Header = ({headerName}) => (
    <div className='flex bg-bg-blue justify-center h-60 items-center'>
        <h1 className={`${bree.className} text-white text-4xl underline underline-offset-8`}>{headerName}</h1>
    </div>
);